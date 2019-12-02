import React, { Component } from 'react';
import { Card, Table } from 'antd';

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const data = [
      {
        key: '1',
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      },
      {
        key: '2',
        id: '1',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      },
      {
        key: '3',
        id: '2',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-03-02',
        address: '上海市浦东新区',
        time: '08:30'
      }
    ];
    this.setState({
      data
    });
  }

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
        dataIndex: 'sex'
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
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
      </div>
    );
  }
}

export default BasicTable;
