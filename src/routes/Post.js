import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from 'components/Map';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import UserProfile from 'routes/UserProfile';

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
  } = post;

  const getEmail = async () => {
    await axios.get('/api/loginedUser').then(res => {
      if (res.data === '') {
        history.push('/LoginPage');
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
        axios.put(`/api/board/posts/${idx}/isDelete`);
        Swal.fire('삭제 완료!', '게시글을 삭제했습니다', 'success');
        history.push('/');
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
      if (result.isConfirmed) {
        axios.put(`/api/board/posts/${idx}/endRecruiting`);
        setIsRecruiting(false);
        Swal.fire('모집 완료!', '요청을 완료했습니다', 'success');
      }
    });
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      await axios.get(`/api/board/posts/${idx}`).then(res => {
        setPost(res.data);
      });
    } catch (e) {
      console.log(e);
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
        <div className="post">
          <div style={{ paddingTop: '20px' }}>
            {addressName !== '　' && <Map lat={locationY} lng={locationX} />}
            <li>주소 있을 때만 지도 출력!</li>
            <li>아이디: {idx}</li>
            <li
              style={{ cursor: 'pointer' }}
              onClick={() => setIsModalVisible(true)}
            >
              작성자: {writer}
            </li>
            {isModalVisible && (
              <Modal
                title={`${writer} 님의 프로필`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <UserProfile
                  email={email}
                  handleCancel={handleCancel}
                  handleOk={handleOk}
                  isModalVisible={isModalVisible}
                />
              </Modal>
            )}
            <li>제목: {title}</li>
            <li>
              내용:{' '}
              {content.split('\n').map(line => (
                <>
                  {line} <br />
                </>
              ))}{' '}
            </li>
            <li>위도: {locationY}</li>
            <li>경도: {locationX}</li>
            <li>사람수: {needPeopleNum}</li>
            <li>날짜: {eventTime}</li>
            <li>종목: {event}</li>
            <li>주소: {addressName}</li>
            <li>장소이름: {placeName} </li>
            {recruiting ? <li>모집중</li> : <li>모집완료</li>}
            {mine ? <li>내가 쓴 글임</li> : <li>남이 쓴 글임</li>}
            <br />
            <br />
            {!mine && recruiting && <button>참가신청</button>}
            👈 내가 쓴 글이 아니고 모집중이면 표시 <br />
            {mine && (
              <>
                {recruiting && <button onClick={postClose}>모집마감</button>}
                👈 내가 쓴 글인데 모집중이면 표시
                <br />
                <Link to={`/update/${idx}`}>
                  {' '}
                  <button>수정</button>
                </Link>
                <button onClick={postDelete}>삭제</button>
                👈 내가 쓴 글이면 표시
              </>
            )}
            <br /> <br />
            <button onClick={() => history.push('/')}>뒤로가기</button>
            👈 항상 표시
            <br />
          </div>
        </div>
      ) : (
        <div>loading....</div>
      )}
    </>
  );
};

export default Post;
