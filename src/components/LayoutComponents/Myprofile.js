import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Card, Col, Row } from 'antd';
import './Mypage.css';
import { Link } from 'react-router-dom';

const Myprofile = () => {
  return (
    <>
      <Form className="nicknamewrap">
        <div className="emailbottom">email</div>
        <Col span={22}>
          <span style={{ marginLeft: '4%' }}>닉네임</span>
        </Col>
      </Form>

      <div className="nicknamewrap">
        <div className="emailbottom">소개 글</div>
        <Col span={22}>
          <span className="emaildetail" />
        </Col>
      </div>

      <div className="cardwrap">
        <h2 className="subtitle">선호 컨텐츠</h2>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card
                className="carddetail"
                title="축구"
                style={{ width: 300, height: 200 }}
              >
                <img src="" alt="사진" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="carddetail"
                title="야구"
                style={{ width: 300, height: 200 }}
              >
                <img src="" alt="사진" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="carddetail"
                title="농구"
                style={{ width: 300, height: 200 }}
              >
                <img src="" alt="사진" />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <Button
        style={{ float: 'right' }}
        type="primary"
        shape="round"
        size="large"
        onClick={this.gotoMypage}
      >
        수정
      </Button>
    </>
  );
};

export default Myprofile;
