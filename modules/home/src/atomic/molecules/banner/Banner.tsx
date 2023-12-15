import { css } from '@emotion/css/macro';
import { Carousel, SectionLayout, Space } from '@org/ui';
import React from 'react';
import Home_1 from '../../../assets/home-1.png';
import Home_2 from '../../../assets/home-2.png';
import Home_3 from '../../../assets/home-3.png';
import Home_4 from '../../../assets/home-4.png';
import { COLOR, COLOR_RGB } from '@org/utils';

const contentStyle: React.CSSProperties = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};
function Banner() {
  return (
    <SectionLayout>
      <Space
        className={css`
          //margin: -1.5rem -10rem 4rem;
          margin-bottom: 4rem;
          .slick-dots {
            button {
              background-color: rgba(${COLOR_RGB.Primary}, 0.9) !important;
            }
            .slick-active button {
              background-color: rgb(${COLOR_RGB.Primary}) !important;
            }
          }
        `}
      >
        <Carousel
          autoplay
          className={css`
            box-shadow: 0px 0px 10px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
            border-radius: 10px;
            overflow: hidden;
          `}
        >
          <BanerImg img={Home_1} />
          <BanerImg img={Home_2} />
          <BanerImg img={Home_3} />
          <BanerImg img={Home_4} />
        </Carousel>
      </Space>
    </SectionLayout>
  );
}

const BanerImg = ({ img }: any) => {
  return (
    <Space
      className={css`
        width: 100%;
        height: 80vh;
      `}
    >
      <img
        src={img}
        alt={img}
        className={css`
          object-fit: cover;
          width: 100%;
          height: 100%;
          /* border: 2px solid ${COLOR.Primary}; */
        `}
      />
    </Space>
  );
};

export default Banner;
