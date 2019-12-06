import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/action';
import { NavLink } from 'react-router-dom';
import './index.less';
import MenuConfig from './../../config/menuConfig';

const SubMenu = Menu.SubMenu;
class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: ''
    };
  }
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
    this.setState({
      menuTreeNode,
      currentKey
    });
  }
  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  handleClick = ({ item, key }) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
    });
  };
  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Wendy MS</h1>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}
          theme="dark"
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
