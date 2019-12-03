import React, { Component } from 'react';
import { Card, Table } from 'antd';
class HighTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    };
  }
  params = {
    page: 1
  };
  componentWillMount() {
    const data = [];
    const data2 = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        key: i,
        id: i + 1,
        userName: `Jack${i}`,
        sex: 1,
        state: 3,
        interest: 1,
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      });
      data2.push({
        key: i,
        id: i + 1,
        userName: `Jack${i}`,
        sex: 1,
        state: 3,
        interest: 1,
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30',
        title1: `titleA ${i}`,
        title2: `titleB ${i}`,
        title3: `titleC ${i}`,
        title4: `titleD ${i}`,
        title5: `titleE ${i}`
      });
    }
    this.setState({
      data,
      data2
    });
  }
  render() {
    const columns = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        key: 'state',
        width: 120,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          };
          return config[String(state)];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        width: 120,
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '练瑜伽'
          };
          return config[String(state)];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: '早起时间',
        key: 'time',
        width: 80,
        dataIndex: 'time'
      }
    ];
    const columns2 = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        dataIndex: 'id',
        fixed: 'left'
      },
      {
        title: '用户名',
        key: 'userName',
        width: 80,
        dataIndex: 'userName',
        fixed: 'left'
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        key: 'state',
        width: 120,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          };
          return config[String(state)];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        width: 120,
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '练瑜伽'
          };
          return config[String(state)];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        width: 120,
        dataIndex: 'birthday'
      },
      {
        title: 'title1',
        key: 'title1',
        width: 80,
        dataIndex: 'title1'
      },
      {
        title: 'title2',
        key: 'title2',
        width: 80,
        dataIndex: 'title2'
      },
      {
        title: 'title3',
        key: 'title3',
        width: 80,
        dataIndex: 'title3'
      },
      {
        title: 'title4',
        key: 'title4',
        width: 80,
        dataIndex: 'title4',
        fixed: 'right'
      },
      {
        title: 'title5',
        key: 'title5',
        width: 80,
        dataIndex: 'title5',
        fixed: 'right'
      }
    ];
    return (
      <div>
        <Card title="头部固定">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.data}
            scroll={{ y: 240 }}
          ></Table>
        </Card>
        <Card title="左侧固定" style={{ marginTop: 10 }}>
          <Table
            columns={columns2}
            dataSource={this.state.data2}
            scroll={{ x: 1000 }}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default HighTable;
