import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { setCategory } from 'components/Options';

function Navigation() {
  const { SubMenu } = Menu;

  const [key, setKey] = useState('home');

  const handleClick = e => {
    setKey(e.key);
  };

  return (
    // <Dropdown overlay={menu} trigger={['click']}>
    //   <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    //     <MenuOutlined style={{ fontSize: '20px' }} />
    //   </a>
    // </Dropdown>
    <Menu
      onClick={handleClick}
      selectable={false}
      mode="horizontal"
      triggerSubMenuAction="click"
    >
      <Menu.Item key="home">
        <Link to="/">홈</Link>
      </Menu.Item>
      <Menu.Item key="map">
        <Link to="/contents">지도에서 찾기</Link>
      </Menu.Item>
      <SubMenu key="SubMenu" title="종목으로 찾기">
        {setCategory()}
      </SubMenu>
    </Menu>
  );
}

export default Navigation;
