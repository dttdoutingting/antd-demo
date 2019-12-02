import React, { Component } from 'react';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Icon,
  Button,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Modal
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error'
        }
      ]
    };
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  handleChange = ({ fileList }) => this.setState({ fileList });

  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 4 }
      }
    };
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Card title="注册表单">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [{ required: true, message: '用户名不能为空' }]
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [
                  { required: true, message: '密码不能为空' },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password placeholder="请输入密码" />)}
            </FormItem>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  onBlur={this.handleConfirmBlur}
                  placeholder="请再次输入密码"
                />
              )}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <FormItem label="性别">
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator('age', {
                initialValue: 18
              })(<InputNumber />)}
            </FormItem>
            <FormItem label="当前状态">
              {getFieldDecorator('state', {
                initialValue: '1'
              })(
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子一枚</Option>
                  <Option value="4">百度FE</Option>
                  <Option value="5">创业者</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="爱好">
              {getFieldDecorator('interest', {
                initialValue: ['2', '5']
              })(
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">羽毛球</Option>
                  <Option value="3">烹饪</Option>
                  <Option value="4">爬山</Option>
                  <Option value="5">跑步</Option>
                  <Option value="6">骑行</Option>
                  <Option value="7">桌球</Option>
                  <Option value="8">跳绳</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="是否已婚">
              {getFieldDecorator('isMarried', {
                valuePropName: 'checked',
                initialValue: true
              })(<Switch />)}
            </FormItem>
            <FormItem label="生日">
              {getFieldDecorator('birthday', {
                initialValue: moment('1992-08-08')
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem label="联系地址">
              {getFieldDecorator('address', {
                initialValue: '上海市浦东新区'
              })(<TextArea autoSize={{ minRow: 2, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="早起时间">
              {getFieldDecorator('time', {})(<TimePicker />)}
            </FormItem>

            <FormItem label="头像">
              {getFieldDecorator(
                'userImg',
                {}
              )(
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={this.state.fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {this.state.fileList.length >= 8 ? null : uploadButton}
                </Upload>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>
                  我已阅读过<a href="/#">轻舞飞扬协议</a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Register);
