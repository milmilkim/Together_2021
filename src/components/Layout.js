import { Layout as AntLayout, Space, BackTop } from 'antd';
import {
  PlusSquareOutlined,
  MessageOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

import Navigation from 'components/Navigation';
import 'components/Layout.css';
import { Badge } from 'antd';
import SearchBox from 'components/SearchBox';
import TopProfile from 'components/TopProfile';

import { Link } from 'react-router-dom';
import AppRouter from './Router';

const Layout = () => {
  const { Header, Content, Footer } = AntLayout;

  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 20,
    backgroundColor: '#5cdbd3',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    bottom: '80px',
    position: 'fixed',
  };

  return (
    <AntLayout className="layout">
      <Header>
        <div className="header_wrap">
          <div className="logo">
            <Link to="/">함께, 운동</Link>
          </div>
          <div className="topMenu">
            <Space size="middle">
              <SearchBox />
              <a>
                <PlusSquareOutlined style={{ fontSize: '30px' }} />
              </a>
              <Badge count={1}>
                <a>
                  <MessageOutlined style={{ fontSize: '30px' }} />
                </a>
              </Badge>
              <a>
                <TopProfile />
              </a>
              <Link to="/Login">Login</Link>
            </Space>
          </div>
        </div>
        <div className="headerNav">
          <Navigation />
        </div>
      </Header>
      <div className="mobileMenu">모바일 메뉴를 만들어야 합니다..</div>
      <Content>
        <AppRouter />
        <BackTop>
          <div style={style}>
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </Content>
      <Footer>
        <div className="footerText">
          &copy;403 Forbidden
          <div>
            Icons made by{' '}
            <a href="https://www.freepik.com" title="">
              freepik{' '}
            </a>
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
