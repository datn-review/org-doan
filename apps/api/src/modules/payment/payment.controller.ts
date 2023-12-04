import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Payment } from './entities/payment.entity';

import { CreatePaymentDto } from './dto/create.dto';
import { UpdatePaymentDto } from './dto/update.dto';
import { PaymentService } from './payment.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import * as uniqid from 'uniqid';
import * as dayjs from 'dayjs';
import * as queryString from 'qs';
import * as crypto from 'crypto';
import { CollaborationService } from '../collaboration/collaboration.service';

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      // @ts-ignore
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    // @ts-ignore
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
@ApiBearerAuth()
@ApiTags('Payment')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'payment',
  version: '1',
})
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => CollaborationService))
    private collaborationService: CollaborationService,
  ) {}

  @Post('/VNPAY')
  @HttpCode(HttpStatus.CREATED)
  async createPaymentVN(@Body() createPaymentDto: any, @Request() req: any): Promise<any> {
    const paymentInfo = await this.paymentService.findOne({
      id: createPaymentDto?.id,
    });
    const date = new Date();
    // const payRef = `${dayjs(date, 'yyyymmddHHmmss')}` + `${Math.floor(Math.random() * 100000)}`;
    const payRef = uniqid();
    void this.paymentService.update(+createPaymentDto?.id, {
      payRef: payRef,
    });

    const ipAddr =
      req.ip ||
      req?.headers['x-forwarded-for'] ||
      req?.connection?.remoteAddress ||
      req?.socket?.remoteAddress ||
      req?.connection?.socket?.remoteAddress;

    const tmnCode = 'CU8QX2AE';
    const secretKey = 'KYSVPKUNTISAOIMNDWIUQUXTPIMJDEUP';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    const returnUrl = 'http://localhost:1111/returnPayVN';

    const createDate = dayjs(date).format('YYYYMMDDHHmmss');

    const orderInfo = createPaymentDto?.orderInfo || 'Pay';
    const orderType = 'billpayment';
    const locale = 'vn';

    const currCode = 'VND';
    let vnp_Params = {};
    console.log(createDate);
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = payRef;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = (paymentInfo?.amount || 0) * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = '14.185.51.44';
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = Number(createDate) + 60 * 10;

    // vnp_Params = sortObject(vnp_Params);
    vnp_Params = sortObject(vnp_Params);
    const signData = queryString.stringify(vnp_Params, { encode: false });

    const hmac = crypto.createHmac('sha512', secretKey);
    vnp_Params['vnp_SecureHash'] = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnpUrl += '?' + queryString.stringify(vnp_Params, { encode: false });

    return { vnpUrl };
  }

  @Get('/return')
  @HttpCode(HttpStatus.OK)
  async returnPaymentVN(@Body() createPaymentDto: any, @Request() req: any): Promise<any> {
    // eslint-disable-next-line prefer-const,@typescript-eslint/no-unused-vars
    let { vnp_SecureHash, vnp_SecureHashType, ...vnp_Params } = req.query;
    console.log(vnp_Params);

    const secretKey = 'KYSVPKUNTISAOIMNDWIUQUXTPIMJDEUP';

    vnp_Params = sortObject(vnp_Params);
    const signData = queryString.stringify(vnp_Params, { encode: false });

    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (vnp_SecureHash === signed) {
      const paymentInfo = await this.paymentService.findOne({
        payRef: vnp_Params['vnp_TxnRef'],
      });
      console.log(paymentInfo);
      if (paymentInfo) {
        await this.paymentService.update(paymentInfo.id, {
          status: 2,
        });
        if (paymentInfo.collaboration) {
          await this.collaborationService.update(+paymentInfo.collaboration, {
            status: 5,
          });
        }
      }

      return { status: 'success', data: { code: vnp_Params['vnp_ResponseCode'] } };
    } else {
      return { status: 'success', data: { code: 97 } };
    }
  }
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment[]> {
    return this.paymentService.create({
      ...createPaymentDto,
    });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'searchName', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'fieldSearch', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('paymentDate')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Payment>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.paymentService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: [
        { field: 'sender', entity: 'user' },
        { field: 'receiver', entity: 'user' },
        { field: 'collaboration', entity: 'collaboration' },
      ],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Payment[]> {
    return this.paymentService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Payment>> {
    return this.paymentService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment[]> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.paymentService.softDelete(id);
  }
}
