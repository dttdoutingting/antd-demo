import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../customed'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount () {
    echarts.registerTheme('myTheme', echartTheme);
  }

  getOptions = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七',]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '订单量',
        type: 'line',
        data: [1000, 2000, 2500, 4000, 6000, 8000, 10000]
      }]
    }
    return option
  }
  getOptions1 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['OFO', '摩拜', '小蓝']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七',]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'OFO',
        type: 'line',
        data: [2000, 3000, 4000, 6000, 8000, 10000, 12000]
      },
      {
        name: '摩拜',
        type: 'line',
        data: [2000, 2500, 3500, 4000, 6000, 8000, 10000]
      },
      {
        name: '小蓝',
        type: 'line',
        data: [1000, 1500, 2000, 3000, 4000, 5000, 6000]
      }]
    }
    return option
  }
  getOptions2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七',]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '订单量',
        type: 'line',
        areaStyle: {},
        data: [1000, 2000, 2500, 4000, 6000, 8000, 10000]
      }]
    }
    return option
  }
  render () {
    return (<div>
      <Card title="折线图表之一">
        <ReactEcharts option={this.getOptions()} theme="myTheme" style={{ height: 500 }} />
      </Card>
      <Card title="折线图表之二" style={{ marginTop: 10 }}>
        <ReactEcharts option={this.getOptions1()} theme="myTheme" style={{ height: 500 }} />
      </Card>
      <Card title="折线图表之三" style={{ marginTop: 10 }}>
        <ReactEcharts option={this.getOptions2()} theme="myTheme" style={{ height: 500 }} />
      </Card>
    </div>);
  }
}

export default Line;