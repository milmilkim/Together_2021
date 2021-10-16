import {
  HomeOutlined,
  SearchOutlined,
  PlusSquareOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'components/LayoutComponents/MobileMenu.css';

const MobileMenu = ({ email }) => {
  const activeStyle = {
    color: '#5cdbd3',
  }; //path가 일치 할 때 메뉴 스타일

  return (
    <div className="mobileMenu">
      <div className="mobileMenu__container">
        <NavLink exact to="/" activeStyle={activeStyle}>
          <HomeOutlined />
        </NavLink>
        <NavLink exact to="/searchpost" activeStyle={activeStyle}>
          <SearchOutlined />
        </NavLink>
        <NavLink exact to="/writepost" activeStyle={activeStyle}>
          <PlusSquareOutlined />
        </NavLink>
        <NavLink exact to="/messages" activeStyle={activeStyle}>
          <MessageOutlined />
        </NavLink>
        <NavLink exact to={`/myprofile/${email}`} activeStyle={activeStyle}>
          <UserOutlined />
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
