import { Layout as AntLayout, Space } from 'antd';
import {
  PlusSquareOutlined,
  MessageOutlined,
  LoginOutlined,
} from '@ant-design/icons';

import Navigation from 'components/Navigation';
import { Badge } from 'antd';
import SearchBox from 'components/LayoutComponents/SearchBox';
import TopProfile from 'components/LayoutComponents/TopProfile';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { layoutState } from 'state';

import 'components/LayoutComponents/Layout.css';

const LayoutHeader = ({ email }) => {
  const { Header } = AntLayout;
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);
  //layoutVisible이 true일 때만 출력

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

                {email !== '' ? (
                  <>
                    <Link to="/writepost">
                      <PlusSquareOutlined style={{ fontSize: '30px' }} />
                    </Link>
                    <Badge count={1}>
                      <Link to="/messages">
                        <MessageOutlined style={{ fontSize: '30px' }} />
                      </Link>
                    </Badge>
                    <TopProfile email={email} />
                  </>
                ) : (
                  <>
                    <Link to="/loginpage">
                      <LoginOutlined style={{ fontSize: '24px' }} />
                    </Link>
                  </>
                )}
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
