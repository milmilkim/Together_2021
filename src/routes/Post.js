import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from 'components/Map';

const Post = ({ match, history }) => {
  const { idx } = match.params;
  //넘겨받은 idx를 기준으로 글을 조회하도록 함

  const [post, setPost] = useState('');

  const goBack = () => {
    history.goBack();
  }; //뒤로가기 버튼

  const getData = async () => {
    await axios.get('/dummy/dummyJson.json').then(res => {
      const filteredRes = res.data.filter(temp => temp.idx == idx);
      setPost(filteredRes[0]);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ paddingTop: '20px' }}>
      <Map lat={post.location_y} lng={post.location_x} />
      <li>아이디: {idx}</li>
      <li>제목: {post.title}</li>
      <li>내용: {post.content}</li>
      <li>위도: {post.location_y}</li>
      <li>경도: {post.location_x}</li>
      <br />
      <br />
      <button>참가신청</button> 내가 쓴 글이 아니고 모집중이면 표시 <br />
      내가 쓴 글이면
      <br />
      <button>모집마감</button>
      <button>수정</button>
      <button>삭제</button>
      <br /> <br />
      <button onClick={goBack}>뒤로가기</button>
    </div>
  );
};

export default Post;
