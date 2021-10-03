import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Input, Card, Col, Row } from 'antd';
import './Mypage.css';
import { Link } from 'react-router-dom';
import Myprofile from './Myprofile';

const Mypage = () => {
  return (
    <>
      <Form className="nicknamewrap">
        <div className="emailbottom">email</div>
        <Col span={22}>
          <Input
            className="nickname"
            type="text"
            placeholder="수정할 닉네임"
            maxLength={20}
          />
        </Col>
      </Form>

      <div className="nicknamewrap">
        <div className="emailbottom">자기소개</div>
        <Col span={22}>
          <textarea
            className="intro-input"
            type="text"
            placeholder="간단한 자기소개를 적어주세요."
            maxLength={200}
          />
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
                className="carddetail"
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
        <Link to="/Myprofile" components={Myprofile}>
          확인
        </Link>
      </Button>
    </>
  );
};

export default Mypage;

/* TODO

1. Mypage.js에서 수정한내용 Myprofile.js에서 반영되게하기

제가 많이 부족해서 죄송합니다...
*/
