import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Input, Card, Col, Row } from 'antd';
import './Mypage.css';
import { Link } from 'react-router-dom';

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
          <Input
            className="intro-input"
            type="text"
            placeholder="간단한 자기소개를 적어주세요."
            maxLength={200}
          />
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
      <Link to="./Myprofile">
        <Button
          style={{ float: 'right' }}
          type="primary"
          shape="round"
          size="large"
        >
          확인
        </Button>
      </Link>
    </>
  );
};

export default Mypage;

/* 
1. TopProfile에서 버튼 누르면 Myprofile로 넘어가게하기
2. Myprofile에서 수정버튼 누르면 Mypage로 넘어가게하기
3. Mypage에서 수정할 내용 입력 후 확인 버튼 누르면 내용 저장후 Myprofile로 넘어가게하기
4. Mypage에서 소개글 입력창 개선
5. 로그인 하지 않을시에 TopProfile에서 내 프로필 버튼 누르면 Login창으로 넘어가기

제가 많이 부족해서 죄송합니다...
*/
