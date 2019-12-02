import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './form.less';
const FormItem = Form.Item;

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = () => {
    //提交函数，在此函数中你可以通过getFieldsValue方法拿到表单数据
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(
          `${userInfo.userName}欢迎您 ，当前密码为：${userInfo.userPwd}`
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请输入用户名"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="登录水平表单" style={{ marginTop: 10 }}>
          <Form
            layout="horizontal"
            className="login-form"
            onSubmit={this.handleSubmit}
          >
            <FormItem>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [
                  { required: true, message: '用户名不能为空' },
                  { min: 5, max: 10, message: '长度不在范围内' },
                  {
                    pattern: new RegExp('^\\w+$', 'g'),
                    message: '用户名必须为字母或者数字'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot" href="/#">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              Or <a href="/#">注册</a>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(FormLogin);
