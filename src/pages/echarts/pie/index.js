import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../customed'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class Pie extends Component {
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
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}: {c}({d}%)'
      },
      series: [{
        name: '订单量',
        type: 'pie',
        data: [{
          value: 1000,
          name: '周一'
        },
        {
          value: 2000,
          name: '周二'
        },
        {
          value: 3000,
          name: '周三'
        },
        {
          value: 5000,
          name: '周四'
        },
        {
          value: 8000,
          name: '周五'
        },
        {
          value: 5000,
          name: '周六'
        },
        {
          value: 2000,
          name: '周日'
        }
        ]
      }]
    }
    return option
  }
  getOptions1 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}: {c}({d}%)'
      },
      series: [{
        name: '订单量',
        type: 'pie',
        radius: ['50%', '80%'],
        data: [{
          value: 1000,
          name: '周一'
        },
        {
          value: 2000,
          name: '周二'
        },
        {
          value: 3000,
          name: '周三'
        },
        {
          value: 5000,
          name: '周四'
        },
        {
          value: 8000,
          name: '周五'
        },
        {
          value: 5000,
          name: '周六'
        },
        {
          value: 2000,
          name: '周日'
        }
        ]
      }]
    }
    return option
  }

  getOptions2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}: {c}({d}%)'
      },
      series: [{
        name: '订单量',
        type: 'pie',
        radius: '75%',
        center: ['50%', '50%'],
        roseType: 'radius',
        data: [{
          value: 1000,
          name: '周一'
        },
        {
          value: 2000,
          name: '周二'
        },
        {
          value: 3000,
          name: '周三'
        },
        {
          value: 5000,
          name: '周四'
        },
        {
          value: 8000,
          name: '周五'
        },
        {
          value: 5000,
          name: '周六'
        },
        {
          value: 2000,
          name: '周日'
        }
        ].sort(function (a, b) { return a.value - b.value; })
      }]
    }
    return option
  }
  render () {
    return (<div>
      <Card title="饼图表之一">
        <ReactEcharts option={this.getOptions()} theme="myTheme" style={{ height: 500 }} />
      </Card>
      <Card title="饼图表之二" style={{ marginTop: 10 }}>
        <ReactEcharts option={this.getOptions1()} theme="myTheme" style={{ height: 500 }} />
      </Card>
      <Card title="饼图表之三" style={{ marginTop: 10 }}>
        <ReactEcharts option={this.getOptions2()} theme="myTheme" style={{ height: 500 }} />
      </Card>
    </div>);
  }
}

export default Pie;