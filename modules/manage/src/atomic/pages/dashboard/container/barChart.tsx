import { css, cx } from '@emotion/css';
import { Space } from '@org/ui';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const dataT = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 8,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 18,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle
        cx={x + width / 2}
        cy={y - radius}
        r={radius}
        fill='#8884d8'
      />
      <text
        x={x + width / 2}
        y={y - radius}
        fill='#fff'
        textAnchor='middle'
        dominantBaseline='middle'
      >
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

export const BarChartBase = ({ data }: any) => {
  console.log('🚀 ~ file: barChart.tsx:87 ~ BarChartBase ~ data:', data);
  return (
    // <ResponsiveContainer
    //   width='100%'
    //   height='100%'
    // >
    <Space
      className={cx(
        'scroll-customer',
        css`
          width: 100%;
          margin-top: 3rem;
          overflow-x: auto;
        `,
      )}
    >
      <BarChart
        width={1280}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          name='Tháng'
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='thu'
          fill='#8884d8'
          minPointSize={10}
          name='Thu'
        >
          {/* <LabelList
            dataKey='name'
            content={renderCustomizedLabel}
          /> */}
        </Bar>
        <Bar
          dataKey='chi'
          fill='#82ca9d'
          minPointSize={10}
          name={'Chi'}
        />
        <Bar
          dataKey='hoahong'
          fill='#ca82bd'
          minPointSize={10}
          name={'Hoa Hồng'}
        />
      </BarChart>
    </Space>
    // </ResponsiveContainer>
  );
};
