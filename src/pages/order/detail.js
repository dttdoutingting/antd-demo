import React, { Component } from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import './detail.less';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailInfo();
    }
  }
  getDetailInfo = orderId => {
    axios
      .ajax({
        url: '/order/detail',
        data: {
          params: {
            orderId: orderId
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            orderInfo: res.result
          });
          this.renderMap(res.result);
        }
      });
  };
  renderMap = result => {
    this.map = new window.BMap.Map('orderDetailMap');
    // this.map.centerAndZoom('北京', 11);
    this.map.addMapControl();

    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list);

    // 调用服务区绘制方法
    this.drawServiceArea(result.area);
  };

  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(
      new window.BMap.ScaleControl({ auchor: window.BMAP_ANCHOR_TOP_RIGHT })
    );
    map.addControl(
      new window.BMap.NavigationControl({
        auchor: window.BMAP_ANCHOR_TOP_RIGHT
      })
    );
  };

  // 绘制用户的行驶路线
  drawBikeRoute = positionList => {
    // let map = this.map;
    let startPoint = '';
    // let endPoint = '';
    if (positionList.lenghth > 0) {
      let arr = positionList[0];
      startPoint = new window.BMap.Point(arr.lon, arr.lat);
      let startIcon = new window.BMap.Icon(
        '/assets/start_point.png',
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          auchor: new window.BMap.Size(36, 42)
        }
      );
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
    }
  };

  // 绘制服务区
  drawServiceArea = positionList => {
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }

    // 绘制服务区
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4
    });
    this.map.addOverlay(polygon);
  };
  render () {
    const info = this.state.orderInfo || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {info.mode === 1 ? '服务区' : '停车点'}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {info.instance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

export default Detail;
