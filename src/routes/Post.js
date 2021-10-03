import { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ match, history }) => {
  const { idx } = match.params;
  //넘겨받은 idx를 기준으로 글을 조회하도록 함

  const [data, setData] = useState('');
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
      <li>아이디: {idx}</li>
      <li>제목: {post.title}</li>
      <li>내용: {post.content}</li>
      <br />
      <br />
      <button onClick={goBack}>뒤로가기</button>
    </div>
  );
};

export default Post;
