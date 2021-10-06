import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoginPage from 'routes/LoginPage';

const UserProfile = ({ match }) => {
  const { email } = match.params;
  const [profile, setProfile] = useState('');

  const getData = async () => {
    await axios.get(`/api/user/userInfo/${email}`).then(res => {
      setProfile(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Form className="nicknamewrap">
        <div className="emailbottom" />
        <Col span={22}>
          <span style={{ marginLeft: '4%' }}> </span>
        </Col>
      </Form>

      <div className="nicknamewrap">
        <div className="emailbottom">자기 소개</div>
        <Col span={22}>
          <span className="emaildetail">
            {profile.email} {profile.nickname}{' '}
          </span>
        </Col>
      </div>

      <div className="nicknamewrap">
        <h2 className="emailbottom">선호 컨텐츠</h2>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card
                className="carddetail"
                title="축구"
                style={{ width: '100%', height: 200 }}
              >
                <img src="" alt="픽토그램" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="carddetail"
                title="야구"
                style={{ width: '100%', height: 200 }}
              >
                <img src="" alt="픽토그램" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="carddetail last_card"
                title="농구"
                style={{ width: '100%', height: 200 }}
              >
                <img src="" alt="픽토그램" />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
