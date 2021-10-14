import { Layout as AntLayout, Space } from 'antd';
import {
  PlusSquareOutlined,
  MessageOutlined,
  LoginOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import Navigation from 'components/Navigation';
import { Badge } from 'antd';
import TopProfile from 'components/LayoutComponents/TopProfile';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { layoutState } from 'state';
import { getToken, deleteToken } from 'components/Token';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';

import 'components/LayoutComponents/Layout.css';

const LayoutHeader = ({ history }) => {
  const { Header } = AntLayout;
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);
  //layoutVisible이 true일 때만 출력

  const [islogOut, setIsLogOut] = useState(false);

  const logOut = () => {
    deleteToken();
    setIsLogOut(!islogOut);
    Swal.fire('로그아웃', '로그아웃되었습니다.', 'success');
  };

  useEffect(() => {}, [islogOut]);

  return (
    <>
      {layoutVisible && (
        <Header>
          <div className="header_wrap">
            <div className="logo">
              <Link to="/">
                <img src="logo.png" alt="함께, 운동" />
              </Link>
            </div>
            <div className="topMenu">
              <Space size="middle">
                <Link to="/searchpost">
                  <SearchOutlined style={{ fontSize: '30px' }} />
                </Link>

                {getToken() ? (
                  <>
                    <Link to="/writepost">
                      <PlusSquareOutlined style={{ fontSize: '30px' }} />
                    </Link>
                    <Badge count={1}>
                      <Link to="/messages">
                        <MessageOutlined style={{ fontSize: '30px' }} />
                      </Link>
                    </Badge>
                    <TopProfile logOut={logOut} />
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
