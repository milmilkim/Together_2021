import React from 'react';
import { Menu, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { setCategory } from 'components/Options';

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
    {setCategory()}
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
