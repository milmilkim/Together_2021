import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Card, Col, Row } from 'antd';
import './Mypage.css';
import { Link } from 'react-router-dom';
import Mypage from './Mypage';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoginPage from 'routes/LoginPage';

const Myprofile = ({ match }) => {
  const { email } = match.params;
  const [profile, setProfile] = useState('');

  const getData = async () => {
    await axios.get(`/api/user/userInfo/${email}`).then(res => {
      setProfile(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {email !== '' ? (
        <>
          <Form className="nicknamewrap">
            <div className="emailbottom">{profile.email}</div>
            <Col span={22}>
              <span style={{ marginLeft: '4%' }}>{profile.nickname} </span>
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
          </Form>

          <div className="nicknamewrap">
            <div className="emailbottom">자기 소개</div>
            <Col span={22}>
              <span className="emaildetail">{profile.selfIntroduction}</span>
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
          <Button
            style={{ float: 'right', marginBottom: '30px' }}
            type="primary"
            shape="round"
            size="large"
          >
            <Link to="/Mypage" components={Mypage}>
              수정
            </Link>
          </Button>
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
};

export default Myprofile;
