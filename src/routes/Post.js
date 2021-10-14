import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from 'components/Map';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Modal, Button, Avatar } from 'antd';
import UserProfile from 'routes/UserProfile';
import 'routes/Post.css';
import moment from 'moment';
import { baseApiUrl } from 'components/Options';
import { BsFillGeoAltFill } from 'react-icons/bs';

const Post = ({ match, history }) => {
  const { idx } = match.params;
  //넘겨받은 idx를 기준으로 글을 조회하도록 함

  const [post, setPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRecruiting, setIsRecruiting] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false); //모달 표시

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //모달관련함수

  const {
    writer,
    title,
    content,
    locationX,
    locationY,
    needPeopleNum,
    eventTime,
    event,
    addressName,
    placeName,
    mine,
    recruiting,
    email,
    userPicture,
  } = post;

  const getEmail = async () => {
    await axios.get(`${baseApiUrl}/api/loginedUser`).then(res => {
      if (res.data === '') {
        // history.push('/LoginPage');
      }
    });
  };

  const postDelete = () => {
    Swal.fire({
      title: '삭제',
      text: '이 글을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
    }).then(result => {
      if (result.isConfirmed) {
        axios.put(`${baseApiUrl}/api/board/posts/${idx}/isDelete`).then(res => {
          Swal.fire('삭제 완료!', '게시글을 삭제했습니다', 'success');
          history.push('/');
        });
      }
    });
  };

  const postClose = () => {
    Swal.fire({
      title: '모집 완료',
      text: '모집을 마감하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
    }).then(result => {
      try {
        if (result.isConfirmed) {
          axios.put(
            `https://www.healthtogether.kro.kr/api/board/posts/${idx}/endRecruiting`,
          );
          setIsRecruiting(false);
          Swal.fire('모집 완료!', '요청을 완료했습니다', 'success');
        }
      } catch (error) {
        Swal.fire('Oops...', '요청에 실패했습니다', 'error');
      }
    });
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      // await axios.get(`/api/board/posts/${idx}`).then(res => {
      await axios
        // .get(`https://www.healthtogether.kro.kr/api/board/posts/${idx}`)
        // .get(`https://www.healthtogether.kro.kr/api/board/posts/${idx}`)
        .get(`${baseApiUrl}/api/board/posts/${idx}`)
        .then(res => {
          setPost(res.data);
          console.log(res);
        });
    } catch (e) {
      console.log('게시글을 불러오지 못했습니다.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    getEmail();
  }, [isRecruiting]);

  return (
    <>
      {!isLoading ? (
        <div className="post" style={{ paddingTop: '30px' }}>
          <div className="postHeader">
            <div className="postHeader__event">{event}</div>
            <div className="postHeader__title">{title}</div>
            <div
              onClick={() => setIsModalVisible(true)}
              className="postHeader__writer"
            >
              <Avatar src={userPicture} alt={writer} />
              <span>{writer}</span>
            </div>
          </div>
          <div className="contentWrap">
            <div className="mapArea">
              {!!addressName ? (
                <Map lat={locationY} lng={locationX} />
              ) : (
                <>🙄위치 정보가 없습니다</>
              )}
            </div>
            <div className="info">
              <div className="place">
                <BsFillGeoAltFill /> {placeName}
              </div>
              <div className="label">사람수</div>
              <div className="detail">{needPeopleNum}</div>
              <div className="label">날짜</div>
              <div className="detail">
                {moment(eventTime).format('YYYY년 MM월 DD일')}
              </div>
              <div className="label">시간</div>
              <div className="detail">{moment(eventTime).format('HH:mm')}</div>
              {!!addressName && <div className="label">주소</div>}
              <div className="detail">{addressName}</div>
              <div className="recruiting">
                {recruiting ? (
                  <div className="true">모집중</div>
                ) : (
                  <div className="false">모집완료</div>
                )}
              </div>
            </div>
          </div>
          {/* <li>아이디: {idx}</li> */}
          {isModalVisible && (
            <Modal
              title={`프로필`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <UserProfile email={email} />
            </Modal>
          )}
          <div className="description">
            <div className="text">{content}</div>
          </div>
          <br />
          <br />
          <div className="postButtonWraper">
            {!mine && recruiting && <Button>참가신청</Button>}
            {!mine && !recruiting && <Button disabled>참가신청</Button>}
            {!mine && (
              <>
                {!mine && recruiting && (
                  <Button onClick={postClose}>모집마감</Button>
                )}
                <Link to={`/update/${idx}`}>
                  <Button>수정</Button>
                </Link>
                <Button onClick={postDelete}>삭제</Button>
              </>
            )}
            <Button onClick={() => history.push('/')}>뒤로가기</Button>
          </div>
        </div>
      ) : (
        <div>loading....</div>
      )}
    </>
  );
};

export default Post;
