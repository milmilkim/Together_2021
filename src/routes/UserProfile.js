import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { baseApiUrl } from 'components/Options';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { BsFillGeoAltFill, BsFillHeartFill } from 'react-icons/bs';

const UserProfile = ({ email, handleCancel, mine }) => {
  const [profile, setProfile] = useState('');

  const getData = async () => {
    await axios.get(`${baseApiUrl}/api/user/userInfo/${email}`).then(res => {
      setProfile(res.data);
    });
  };

  const {
    nickname,
    selfIntroduction,
    picture,
    livingPlace,
    preference1,
    preference2,
    preference3,
  } = profile;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="userProfile">
      <div className="userProfile__header">
        <span onClick={handleCancel}>
          <FaArrowLeft />
        </span>
      </div>
      <div className="userProfile__picture">
        <Avatar src={picture} icon={<UserOutlined />} size={132} />
      </div>

      <div className="userProfile__nickname">{nickname}</div>
      <div className="userProfile__livingPlace">
        <BsFillGeoAltFill /> {livingPlace}
      </div>
      <div className="userProfile__selfIntroduction">{selfIntroduction}</div>
      {!mine && (
        <div className="userProfile__button">
          <span>
            <FaEnvelope />
          </span>
          &nbsp;&nbsp;메세지 보내기
        </div>
      )}

      <div className="userProfile__preference">
        <span className="userProfile__preference--header">
          <BsFillHeartFill />
          　선호 컨텐츠
        </span>
        <div className="userProfile__preference--body">
          <span>{preference1}</span>
          <span>{preference2}</span>
          <span>{preference3}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
