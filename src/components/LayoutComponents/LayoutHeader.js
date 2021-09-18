import { Layout as AntLayout, Space, BackTop } from 'antd';
import { PlusSquareOutlined, MessageOutlined } from '@ant-design/icons';

import Navigation from 'components/Navigation';
import 'components/Layout.css';
import { Badge } from 'antd';
import SearchBox from 'components/SearchBox';
import TopProfile from 'components/TopProfile';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { layoutState } from 'state';

const LayoutHeader = () => {
  const { Header } = AntLayout;
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);

  return (
    <>
      {layoutVisible && (
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
                  <Link to="/messages">
                    <MessageOutlined style={{ fontSize: '30px' }} />
                  </Link>
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
      )}
    </>
  );
};

export default LayoutHeader;
