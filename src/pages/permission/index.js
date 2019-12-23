import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Select, Tree } from 'antd';
import ETable from '../../components/ETable';
import Utils from '../../utils/utils'
import axios from '../../axios'
import menuConfig from '../../config/menuConfig'
var Mock = require('mockjs')
var Random = Mock.Random
const FormItem = Form.Item
const Option = Select.Option
const { TreeNode } = Tree
class PermissionUser extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componentWillMount () {
    // axios.requestList(this, 'role/list', {}, true)
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        key: i,
        id: i + 1,
        role_name: '总经理' + i,
        create_time: Random.date(),
        status: i % 2 === 0 ? 1 : 0,
        authorized_time: Random.date(),
        authorized_user_name: Random.cname()
      });
    }
    this.setState({
      list
    });
  }
  // 打开创建角色弹框
  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }
  // 角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    // axios.ajax({
    //   url: 'role/create',
    //   data: {
    //     params: data
    //   }
    // }).then((res) => {
    //   if (res.code === 0) {
    //     this.setState({
    //       isRoleVisible: false
    //     })
    //     this.roleForm.props.form.resetFields()
    //     axios.requestList(this, 'role/list', {}, true)
    //   }
    // })
    this.setState({
      isRoleVisible: false
    })
    this.roleForm.props.form.resetFields()
  }

  // 权限设置
  handlePermission = () => {
    // let item = this.state.selectedItem;
    // if (!item) {
    //   Modal.info({
    //     title: '信息',
    //     content: '请选择一个角色'
    //   })
    //   return;
    // }
    // this.setState({
    //   isPermVisible: true,
    //   detailInfo: item,
    //   menuInfo: item.menus
    // })

    this.setState({
      isPermVisible: true
    })
  }

  // 提交权限设置
  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.id
    data.menus = this.state.menuInfo
    // axios.ajax({
    //   url: '/permission/edit',
    //   data: {
    //     params: {
    //       ...data
    //     }
    //   }
    // }).then((res) => {
    //   if (res) {
    //     this.setState({
    //       isPermVisible: false
    //     })
    //     axios.requestList(this, 'role/list', {}, true)
    //   }
    // })
  }
  render () {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      }, {
        title: '角色名称',
        dataIndex: 'role_name'
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateDate
      }, {
        title: '使用状态',
        dataIndex: 'status',
        render (status) {
          return status === 1 ? '启用' : '停用'
        }
      }, {
        title: '授权时间',
        dataIndex: 'authorized_time',
        render: Utils.formateDate
      }, {
        title: '授权人',
        dataIndex: 'authorized_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.handleRole}
          >创建角色</Button>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.handlePermission}
          >设置权限</Button>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
          >用户授权</Button>
        </Card>
        <div className="content_wrap">
          <ETable
            updatedSelectedItem={Utils.updatedSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedIds={this.state.selectedIds}
            selectedItem={this.state.selectedItem}
            pagination={false}
          />
        </div>
        <Modal title='创建角色'
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields()
            this.setState({
              isRoleVisible: false
            })
          }}
          width={400}>
          <RoleForm wrappedComponentRef={(inst) => { this.roleForm = inst; }} />
        </Modal>

        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <PerEditForm
            wrappedComponentRef={(inst) => { this.permForm = inst; }}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys
              })
            }
            }
          />
        </Modal>
      </div>
    );
  }
}

export default PermissionUser;

class RoleForm extends Component {
  getState = () => {
    return {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者'
    }
  }
  render () {
    let type = this.props.type;
    let userInfo = this.props.userInfo;
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="角色名称">
          {
            type === 'detail' ? userInfo.role_name :
              getFieldDecorator('role_name')(
                <Input type="text" placeholder="请输入角色名称" />
              )
          }
        </FormItem>
        <FormItem label="状态">
          {
            type === 'detail' ? this.getState(userInfo.state) :
              getFieldDecorator('state')(
                <Select>
                  <Option value={1}>开启</Option>
                  <Option value={0}>关闭</Option>
                </Select>
              )
          }
        </FormItem>
      </Form>
    )
  }
}

RoleForm = Form.create()(RoleForm)

class PerEditForm extends Component {
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode {...item} />
      }
    })
  }
  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const { getFieldDecorator } = this.props.form
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (<Form layout="horizontal"  {...formItemLayout}>
      {/* <FormItem label="角色名称">
        <Input disabled placeholder={detail_info.role_name} />
      </FormItem>
      <FormItem label="状态">
        {
          getFieldDecorator('status', {
            initialValue: '1'
          })(
            <Select>
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          )
        }
        }
      </FormItem> */}
      <Tree checkable
        defaultExpandAll
        onCheck={(checkedKeys) => {
          this.onCheck(checkedKeys)
        }}
        checkedKeys={menuInfo}
      >
        <TreeNode title="平台权限" key="platfrom_all">
          {this.renderTreeNodes(menuConfig)}
        </TreeNode>
      </Tree>
    </Form>);
  }
}
PerEditForm = Form.create()(PerEditForm)
