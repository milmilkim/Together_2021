import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Card, Col, Row } from 'antd';
import 'routes/Myprofile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoginPage from 'routes/LoginPage';
import { Avatar, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { baseApiUrl } from 'components/Options';
import { getToken } from 'components/Token';
import { BsFillGeoAltFill, BsFillHeartFill } from 'react-icons/bs';

const Myprofile = ({ match, history }) => {
  const { email } = match.params;
  const [profile, setProfile] = useState(''); //프로필
  const [editing, setEditing] = useState(false); //수정 여부
  const [validatedNickname, setValidatedNickname] = useState(true); //중복확인 여부
  const [prevNickname, setPrevNickname] = useState('');

  const getData = async () => {
    if (email === undefined) {
      history.push('/loginpage');
    }
    await axios.get(`${baseApiUrl}/api/user/userInfo/${email}`).then(res => {
      setProfile(res.data);
      setPrevNickname(res.data.nickname);
    });
  }; //프로필 불러옴

  const {
    nickname,
    selfIntroduction,
    picture,
    livingPlace,
    preference1,
    preference2,
    preference3,
  } = profile;

  // for (let i = 10; i < 36; i++) {
  //   const value = i.toString(36) + i;
  //   options.push({
  //     label: `Long Label: ${value}`,
  //     value,
  //   });
  // }

  const profileUpdate = async () => {
    if (validatedNickname) {
      console.log(profile);
      await axios
        .put(`${baseApiUrl}/api/user/userInfo/${email}`, profile)
        .then(() => setEditing(false));
      Swal.fire({ title: '수정완료~_~!!!', icon: 'success' });
    } else {
      Swal.fire({ title: '닉네임 중복 확인을 해주세요', icon: 'warning' });
    }
  }; //프로필 업데이트함

  const nicknameChek = async () => {
    if (prevNickname === nickname) {
      Swal.fire('사용할 수 있는 닉네임입니다');
      setValidatedNickname(true);
    } else
      await axios
        .get(`${baseApiUrl}/api/user/userInfo/DuplicateCheck/${nickname}`)
        .then(res => {
          setValidatedNickname(res.data);
          if (res.data == true) {
            Swal.fire({ title: '사용할 수 있는 닉네임입니다', icon: 'info' });
          } else {
            Swal.fire({ title: '다른 닉네임을 설정해주세요', icon: 'error' });
          }
        });
  }; //중복확인함

  // 초기에는 중복확인 true
  // 닉네임 인풋에 키보드를 눌렀을 때 false로 바뀜
  // 중복체크를 했을 때, 기존 닉네임과 같은 거 입력해도 true
  // 중복일 때 false, 중복되지 않을 때 true

  const onChange = e => {
    const nextProfile = {
      ...profile,
      [e.target.name]: e.target.value,
    };
    setProfile(nextProfile);
  }; //수정값 적용

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!getToken()) {
      history.push('/loginpage');
    }
  }, []);

  return (
    <div className="myProfile">
      <div className="myProfile__wrap">
        <div className="myProfile__header">
          <div>{email}</div>
          <div className="myProfile__btn">
            {!editing ? (
              <Button onClick={() => setEditing(!editing)} type="primary">
                수정
              </Button>
            ) : (
              <>
                <Button onClick={profileUpdate} type="primary">
                  등록
                </Button>
                <Button onClick={() => setEditing(false)}>취소</Button>
              </>
            )}
          </div>
        </div>
        <div className="myProfile__body">
          <div className="myProfile__picture">
            <Avatar
              size={128}
              shape="circle"
              icon={<UserOutlined />}
              src={picture}
            />
          </div>

          <div className="myProfile__nickname">
            {editing ? (
              <>
                <Input
                  onChange={onChange}
                  placeholder="닉네임"
                  name="nickname"
                  value={nickname}
                  onKeyDown={() => setValidatedNickname(false)}
                  style={{
                    fontSize: '24px',
                    fontFamily: 'NanumBarunGothicBold',
                  }}
                />

                {!validatedNickname && (
                  <Button onClick={nicknameChek}>중복 확인</Button>
                )}
              </>
            ) : (
              <>{nickname}</>
            )}
          </div>
          <div className="myProfile__livingPlace">
            {editing ? (
              <Input
                prefix={<BsFillGeoAltFill />}
                placeholder="지역"
                onChange={onChange}
                name="livingPlace"
                value={livingPlace}
              />
            ) : (
              <>
                <BsFillGeoAltFill /> {livingPlace}
              </>
            )}
          </div>
          {editing ? (
            <Input
              placeholder="자기 소개"
              onChange={onChange}
              name="selfIntroduction"
              value={selfIntroduction}
            />
          ) : (
            <div className="myProfile__selfIntroduction">
              {selfIntroduction}
            </div>
          )}

          <div>
            <div className="myProfile__preference">
              <span className="userProfile__preference--header">
                <BsFillHeartFill />
                　선호 컨텐츠
              </span>
              <div className="userProfile__preference--body">
                {editing ? (
                  <>
                    <Input
                      onChange={onChange}
                      name="preference1"
                      value={preference1}
                    />
                    <Input
                      onChange={onChange}
                      name="preference2"
                      value={preference2}
                    />
                    <Input
                      onChange={onChange}
                      name="preference3"
                      value={preference3}
                    />
                  </>
                ) : (
                  <>
                    <span>{preference1}</span>
                    <span>{preference2}</span>
                    <span>{preference3}</span>
                  </>
                )}
              </div>
            </div>
            {/* <div className="site-card-wrapper"> */}
            {/* <Row gutter={16}>
                <Col span={8}>
                  <Card
                    className="carddetail"
                    title={'1:' + preference1}
                    style={{ width: '100%', height: 200 }}
                  >
                    <img src="" alt="픽토그램" />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className="carddetail"
                    title={'2:' + preference2}
                    style={{ width: '100%', height: 200 }}
                  >
                    <img src="" alt="픽토그램" />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className="carddetail last_card"
                    title={'3:' + preference3}
                    style={{ width: '100%', height: 200 }}
                  >
                    <img src="" alt="픽토그램" />
                  </Card>
                </Col>
              </Row> */}
            {/* </div> */}
          </div>
          {/*선호 콘텐츠 */}
        </div>{' '}
        {/* myprofile body */}
      </div>
    </div>
  );
};

export default Myprofile;
