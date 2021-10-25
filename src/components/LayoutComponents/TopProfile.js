import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getEmail, getToken } from 'components/Token';
import { baseApiUrl } from 'components/Options';

const TopProfile = ({ logOut }) => {
  const [profile, setProfile] = useState('');

  const tokenEmail = getEmail();

  const getProfilePicture = async () => {
    if (getToken()) {
      await axios
        .get(`${baseApiUrl}/api/user/userInfo/${tokenEmail}`)
        .then(res => {
          setProfile(res.data);
        });
    }
  };

  const { email, picture } = profile;

  useEffect(() => {
    getProfilePicture();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/myprofile/${email}`}>내 프로필</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <div onClick={logOut}>로그아웃</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <span className="avatar-item">
          <Avatar shape="circle" icon={<UserOutlined />} src={picture} />
        </span>
      </Dropdown>
    </>
  );
};

export default TopProfile;
