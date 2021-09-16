import React from 'react';
import { Menu, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.ItemGroup title="Group title">
      <Menu.Item key="0">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/contents">Contents</Link>
      </Menu.Item>
    </Menu.ItemGroup>
    <SubMenu title="sub menu" key="5">
      <Menu.Item key="3">3rd menu item</Menu.Item>
      <Menu.Item key="4">4th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

function Navigation() {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <MenuOutlined style={{ fontSize: '20px' }} />
      </a>
    </Dropdown>
  );
}

export default Navigation;
