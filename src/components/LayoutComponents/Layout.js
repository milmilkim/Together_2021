import { Layout as AntLayout, BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import LayoutHeader from 'components/LayoutComponents/LayoutHeader';
import MobileMenu from 'components/LayoutComponents/MobileMenu';
import AppRouter from 'components/Router';
import LayoutFooter from 'components/LayoutComponents/LayoutFooter';
import 'components/LayoutComponents/Layout.css';
import { useEffect } from 'react';
import { setToken } from 'components/Token';
import { withRouter } from 'react-router';

const Layout = ({ history }) => {
  const { Content } = AntLayout;

  useEffect(() => {
    setToken();
    history.push('/');
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
      <LayoutHeader />

      <MobileMenu />
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

export default withRouter(Layout);
