import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import Myprofile from './Myprofile';

const TopProfile = ({ email }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/myprofile/${email}`} components={Myprofile}>
          내 프로필
        </Link>
      </Menu.Item>
      <Menu.Item key="1">설정</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <a href="http://localhost:8080/logout">로그아웃</a>
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
          <Avatar shape="circle" icon={<UserOutlined />} />
        </span>
      </Dropdown>
    </>
  );
};

export default TopProfile;
