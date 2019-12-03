import React, { Component } from 'react';
import { Card, Table, Button, Modal, message } from 'antd';
// import axios from 'axios';
import axios from './../../axios/index';
import Utils from './../../utils/utils';

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    };
  }

  params = {
    page: 1
  };
  componentWillMount() {
    const data = [];
    for (let i = 0; i < 10; i++) {
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
    }
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

    let _this = this;
    axios
      .ajax({
        url: '/table/list',
        data: {
          params: {
            page: this.params.page
          },
          isShowLoading: false
        }
      })
      .then(res => {
        if (res.code === 0) {
          res.result.list.map((item, index) => {
            item.key = index;
            return item;
          });
          console.log(res.result);
          this.setState({
            data2: res.result.list,
            data3: res.result.list,
            selectedRowKeys: [],
            selectedRows: null,
            pagination: Utils.pagination(res, current => {
              _this.params.page = current;
              this.request();
            })
          });
        }
      });
  };

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys1: selectKey,
      selectedItem: record
    });
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName}, 用户id：${record.id}`
    });
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    let ids = [];
    selectedRows.map(item => {
      ids.push(item);
      return item;
    });
    // selectedRowKeys是必须的
    this.setState({
      selectedRowKeys,
      selectedRows: ids
    });
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  handleDelete = () => {
    let rows = this.state.selectedRows;
    console.log(rows);
    let ids = [];
    rows.map(item => {
      ids.push(item.id);
      return item;
    });
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request();
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
    const { loading, selectedRowKeys1, selectedRowKeys } = this.state;
    const rowSelection1 = {
      type: 'radio',
      selectedRowKeys1
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
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
        <Card title="动态数据渲染表格-Mock" style={{ marginTop: 10 }}>
          <Table columns={columns} dataSource={this.state.data2}></Table>
        </Card>
        <Card title="表格-单选" style={{ marginTop: 10 }}>
          <Table
            rowSelection={rowSelection1}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.data}
          ></Table>
        </Card>
        <Card title="表格-复选" style={{ marginTop: 10 }}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
            <Button style={{ marginLeft: 10 }} onClick={this.handleDelete}>
              删除
            </Button>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.data2}
          ></Table>
        </Card>

        <Card title="表格分页" style={{ marginTop: 10 }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.data3}
            pagination={this.state.pagination}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default BasicTable;
