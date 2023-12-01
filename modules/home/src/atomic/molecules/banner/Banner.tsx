import { css } from '@emotion/css/macro';
import { Carousel, Space } from '@org/ui';
import React from 'react';
const contentStyle: React.CSSProperties = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};

function Banner() {
  return (
    <Space
      className={css`
        //margin: -1.5rem -10rem 4rem;
        margin-bottom: 4rem;
      `}
    >
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </Space>
  );
}

export default Banner;
