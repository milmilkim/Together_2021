import {
  HomeOutlined,
  SearchOutlined,
  PlusSquareOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'components/LayoutComponents/MobileMenu.css';

const MobileMenu = () => {
  const activeStyle = {
    color: '#5cdbd3',
  }; //path가 일치 할 때 메뉴 스타일

  return (
    <div className="mobileMenu">
      <div className="mobileMenu__container">
        <NavLink exact to="/" activeStyle={activeStyle}>
          <HomeOutlined />
        </NavLink>
        <NavLink to="/serach" activeStyle={activeStyle}>
          <SearchOutlined />
        </NavLink>
        <NavLink to="/writepost" activeStyle={activeStyle}>
          <PlusSquareOutlined />
        </NavLink>
        <NavLink to="/messages" activeStyle={activeStyle}>
          <MessageOutlined />
        </NavLink>
        <NavLink to="/profile" activeStyle={activeStyle}>
          <UserOutlined />
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
