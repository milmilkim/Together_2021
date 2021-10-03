import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import Myprofile from './Myprofile';

const TopProfile = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/Myprofile" components={Myprofile}>
          내 프로필
        </Link>
      </Menu.Item>
      <Menu.Item key="1">설정</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">로그아웃</Menu.Item>
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
