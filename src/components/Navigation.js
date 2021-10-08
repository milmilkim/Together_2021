import React from 'react';
import { Menu, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.ItemGroup title="메뉴">
      <Menu.Item key="0">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/contents">지도에서 찾기</Link>
      </Menu.Item>
    </Menu.ItemGroup>
    <SubMenu title="종목별로 찾기" key="5">
      <Menu.Item key="3">축구</Menu.Item>
      <Menu.Item key="4">어쩌고저쩌고</Menu.Item>
    </SubMenu>
  </Menu>
);

function Navigation() {
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <MenuOutlined style={{ fontSize: '20px' }} />
      </a>
    </Dropdown>
  );
}

export default Navigation;
