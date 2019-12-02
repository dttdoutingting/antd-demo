import React, { Component } from 'react';
import { Card, Table } from 'antd';
// import axios from 'axios';
import axios from './../../axios/index';

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const data = [
      {
        key: 1,
        id: 0,
        userName: 'Jack',
        sex: 1,
        state: 3,
        interest: 1,
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      },
      {
        key: 2,
        id: 1,
        userName: 'Jack',
        sex: 1,
        state: 1,
        interest: 1,
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      },
      {
        key: 3,
        id: 2,
        userName: 'Jack',
        sex: 2,
        state: 2,
        interest: 4,
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      }
    ];
    this.setState({
      data
    });
    this.request();
  }

  request = () => {
    // let baseUrl = 'https://easy-mock.com/mock/5de4f6555ca3f8525a4d3b2a/mockapi';
    // axios.get(baseUrl + '/table/list').then(res => {
    //   // console.log(JSON.stringify(res));
    //   if (res.status === 200 && res.data.code === 0) {
    //     this.setState({
    //       data2: res.data.result.list
    //     });
    //   }
    // });

    axios
      .ajax({
        url: '/table/list',
        data: {
          params: {
            page: 1
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            data2: res.result.list
          });
        }
      });
  };
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
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
        dataIndex: 'birthday'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ];
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.data}
            // pagination={false}
          ></Table>
        </Card>
        <Card title="动态数据渲染表格" style={{ marginTop: 10 }}>
          <Table columns={columns} dataSource={this.state.data2}></Table>
        </Card>
      </div>
    );
  }
}

export default BasicTable;
