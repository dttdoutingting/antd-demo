import React, { Component } from 'react';
import { Card, Form, Table, Button, Select, Modal, message } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false
    };
  }
  params = {
    page: 1
  };
  componentWillMount() {
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        key: i.toString(),
        id: i,
        name: `wendy${i}`,
        mode: (i % 2) + 1,
        op_mode: (i % 2) + 1,
        franchisee_name: `松果自营${i}`,
        franchisee_id: 20 + i,
        city_admin: [
          {
            user_name: `笛文${i}`,
            user_id: 1000 + i
          }
        ],
        open_time: '2019-01-01',
        sys_user_name: `笛文${i}`,
        update_time: '2019-12-01'
      });
    }
    this.setState({
      list
    });
  }
  componentDidMount() {
    this.requestList();
  }

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    axios
      .ajax({
        url: '/open_city',
        data: {
          params: {
            page: this.params.page
          },
          isShowLoading: false
        }
      })
      .then(res => {
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
      });
  };
  // 开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  };

  // 城市开通-提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    // console.log(cityInfo);
    axios
      .ajax({
        url: '/city/open',
        data: {
          params: cityInfo
        }
      })
      .then(res => {
        if (res.code === 0) {
          message.success('开通成功');
          this.setState({
            isShowOpenCity: false
          });
          this.requestList();
        }
      });
  };
  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode === 1 ? '停车点' : '禁停区';
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(mode) {
          return mode === 1 ? '自营' : '加盟';
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admin',
        render(arr) {
          return arr
            .map(item => {
              return item.user_name;
            })
            .join(',');
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time',
        render: Utils.formateDate
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ];
    return (
      <div>
        <Card>
          <FiletrForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <div className="content_wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            });
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm
            wrappedComponentRef={inst => {
              this.cityForm = inst;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default City;

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
        <FormItem label="用车模式">
          {getFieldDecorator('mode')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="运营模式">
          {getFieldDecorator('op_mode')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="加盟商授权状态">
          {getFieldDecorator('auth_status')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
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

class OpenCityForm extends Component {
  render() {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout}>
        <FormItem label="选择城市">
          {getFieldDecorator('city_id', {
            initialValue: '1'
          })(
            <Select style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">上海市</Option>
              <Option value="2">北京市</Option>
              <Option value="3">南京市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式">
          {getFieldDecorator('op_mode', {
            initialValue: '1'
          })(
            <Select style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式">
          {getFieldDecorator('use_mode', {
            initialValue: '1'
          })(
            <Select style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

OpenCityForm = Form.create({})(OpenCityForm);
