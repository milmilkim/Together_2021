import { Layout as AntLayout } from 'antd';
import LayoutHeader from 'components/LayoutComponents/LayoutHeader';
import MobileMenu from 'components/LayoutComponents/MobileMenu';
import AppRouter from 'components/Router';
import LayoutFooter from 'components/LayoutComponents/LayoutFooter';
import 'components/LayoutComponents/Layout.css';
import { useEffect } from 'react';
import { setToken } from 'components/Token';
import { withRouter } from 'react-router';
import ChatBot from 'components/ChatBot';

const Layout = ({ history }) => {
  const { Content } = AntLayout;

  useEffect(() => {
    setToken();
    history.push('/');
  }, []);

  return (
    <AntLayout className="layout">
      <LayoutHeader />

      <MobileMenu />
      <Content>
        <AppRouter />
      </Content>

      <LayoutFooter />

      <ChatBot />
    </AntLayout>
  );
};

export default withRouter(Layout);
