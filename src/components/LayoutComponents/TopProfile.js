import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TopProfile = ({ email }) => {
  const [profile, setProfile] = useState('');

  const getProfileImg = async email => {
    await axios.get(`/api/user/userInfo/${email}`).then(res => {
      setProfile(res.data);
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/myprofile/${email}`}>내 프로필</Link>
      </Menu.Item>
      <Menu.Item key="1">설정</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <a href="http://localhost:8080/logout">로그아웃</a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getProfileImg(email);
  }, []);

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <span className="avatar-item">
          <Avatar
            shape="circle"
            icon={<UserOutlined />}
            src={profile.picture}
          />
        </span>
      </Dropdown>
    </>
  );
};

export default TopProfile;
