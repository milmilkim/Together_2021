import { Layout as AntLayout, BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import 'components/Layout.css';
import LayoutHeader from './LayoutComponents/LayoutHeader';
import MobileMenu from './LayoutComponents/MobileMenu';
import AppRouter from './Router';
import LayoutFooter from 'components/LayoutComponents/LayoutFooter';

const Layout = () => {
  const { Content, Footer } = AntLayout;

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
        </BackTop>
      </Content>

      <LayoutFooter />
    </AntLayout>
  );
};

export default Layout;
