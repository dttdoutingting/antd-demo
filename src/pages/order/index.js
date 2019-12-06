import React, { Component } from 'react';
import {
  Card,
  Form,
  Table,
  Button,
  Select,
  Modal,
  message,
  DatePicker
} from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: [],
      orderConfirmVisable: false
    };
  }
  params = {
    page: 1
  };
  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    let _this = this;
    axios
      .ajax({
        url: '/order/list',
        data: {
          params: {
            page: this.params.page
          }
          // isShowLoading: false
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            list: res.result.list.map((item, index) => {
              item.key = index;
              return item;
            }),
            pagination: Utils.pagination(res, current => {
              _this.params.page = current;
              this.requestList();
            })
          });
        }
      });
  };
  // 结束订单确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      });
      return;
    }
    axios
      .ajax({
        url: '/order/ebike_info',
        data: {
          params: item.id
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            orderInfo: res.result.list,
            orderConfirmVisable: true
          });
        }
      });
  };
  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios
      .ajax({
        url: '/order/finish_order',
        data: {
          params: {
            orderId: item.id
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          message.success('订单结束成功');
          this.setState({
            orderConfirmVisable: false
          });
        }
      });
  };
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单'
      });
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`);
  };
  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + 'Km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'tital_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    return (
      <div>
        <Card>
          <FiletrForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.openOrderDetail}
          >
            订单详情
          </Button>
          <Button type="primary" onClick={this.handleConfirm}>
            结束订单
          </Button>
        </Card>
        <div className="content_wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisable}
          onCancel={() => {
            this.setState({
              orderConfirmVisable: false
            });
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form {...formItemLayout}>
            <FormItem label="车辆编号">{this.state.orderInfo.bike_sn}</FormItem>
            <FormItem label="剩余电量">
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间">
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置">
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Order;

class FiletrForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator('city_id')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">上海市</Option>
              <Option value="2">北京市</Option>
              <Option value="3">南京市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator('start_time')(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem label="~" colon={false}>
          {getFieldDecorator('end_time')(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator('status')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">行程结束</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: '0 20px' }}>
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

FiletrForm = Form.create({})(FiletrForm);
