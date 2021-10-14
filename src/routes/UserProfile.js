import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { baseApiUrl } from 'components/Options';

const UserProfile = ({ email }) => {
  const [profile, setProfile] = useState('');

  const getData = async () => {
    await axios.get(`${baseApiUrl}/api/user/userInfo/${email}`).then(res => {
      setProfile(res.data);
      console.log(res.data);
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
      <div>
        <Avatar src={picture} icon={<UserOutlined />} size={64} />
      </div>
      <div>{nickname} 닉네임</div>
      <div>{selfIntroduction} 자기소개</div>
      <div>{livingPlace} 사는 곳</div>
      <div>{preference1} 선호1</div>
      <div>{preference2} 선호2</div>
      <div>{preference3} 선호</div>
    </div>
  );
};

export default UserProfile;
