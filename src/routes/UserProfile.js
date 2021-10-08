import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserProfile = ({ email }) => {
  const [profile, setProfile] = useState('');

  const getData = async () => {
    await axios.get(`/api/user/userInfo/${email}`).then(res => {
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
    <>
      <Avatar src={picture} icon={<UserOutlined />} size={64} />
      <li>{nickname}</li>
      <li>{selfIntroduction}</li>
      <li>{livingPlace}</li>
      <li>{preference1}</li>
      <li>{preference2}</li>
      <li>{preference3}</li>
    </>
  );
};

export default UserProfile;
