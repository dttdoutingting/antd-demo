import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';
class Carousels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card title="文字背景轮播" className="card-wrap">
          <Carousel autoplay effect="fade">
            <div>
              <h3>Ant Motion Banner - React</h3>
            </div>
            <div>
              <h3>Ant Motion Banner - Vue</h3>
            </div>
            <div>
              <h3>Ant Motion Banner - Angular</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="slide-wrap">
          <Carousel autoplay>
            <div>
              <img
                src="/carousel-img/carousel1.jpg"
                alt=""
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <img
                src="/carousel-img/carousel2.jpg"
                alt=""
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <img
                src="/carousel-img/carousel3.jpg"
                alt=""
                style={{ width: '100%' }}
              />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}

export default Carousels;
