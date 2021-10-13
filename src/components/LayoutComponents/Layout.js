import { Layout as AntLayout, BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import LayoutHeader from 'components/LayoutComponents/LayoutHeader';
import MobileMenu from 'components/LayoutComponents/MobileMenu';
import AppRouter from 'components/Router';
import LayoutFooter from 'components/LayoutComponents/LayoutFooter';
import 'components/LayoutComponents/Layout.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { layoutState, loginState } from 'state';

const Layout = ({}) => {
  const { Content } = AntLayout;

  const [email, setEmail] = useState('');

  const getEmail = async () => {
    await axios.get('/api/loginedUser').then(res => {
      setEmail(res.data);
    });
  };

  useEffect(() => {
    getEmail();
  }, []);

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
      <LayoutHeader email={email} />

      <MobileMenu email={email} />
      <Content>
        <AppRouter />
        <BackTop>
          <div style={style}>
            <ArrowUpOutlined />
          </div>
        </BackTop>{' '}
        {/*앵커*/}
      </Content>

      <LayoutFooter />
    </AntLayout>
  );
};

export default Layout;
