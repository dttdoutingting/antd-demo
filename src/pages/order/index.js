import React, { Component } from 'react';
import { Card, Form, Button, Modal, message } from 'antd';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import Utils from '../../utils/utils';
const FormItem = Form.Item;

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
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '上海' },
        { id: '2', name: '北京' },
        { id: '3', name: '南京' },
        { id: '4', name: '合肥' }
      ]
    },
    {
      type: '时间查询',
      width: 90
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '2', name: '结束行程' }
      ]
    },
    {
      type: 'INPUT',
      label: '模式',
      field: 'mode',
      placeholder: '请输入模式',
      width: 100
    }
  ];
  componentDidMount () {
    this.requestList();
  }
  handleFilter = params => {
    this.params = params;
    this.requestList();
  };
  requestList = () => {
    let _this = this;
    axios.requestList(_this, '/order/list', _this.params, true);
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
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单'
      });
      return;
    }
    window.open(`/common/order/detail/${item.id}`);
  };
  render () {
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
        render (distance) {
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
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
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
          <ETable
            updatedSelectedItem={Utils.updatedSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedIds={this.state.selectedIds}
            selectedItem={this.state.selectedItem}
            pagination={this.state.pagination}
            rowSelection="checkbox"
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
