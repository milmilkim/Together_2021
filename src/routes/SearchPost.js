import { Input } from 'antd';
import ListCard from 'components/ListCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPost = () => {
  const { Search } = Input;
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState('');

  const highlightedText = (text, query) => {
    if (query !== '' && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <span style={{ fontWeight: 'bold' }} key={index}>
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </>
      );
    }
    return text;
  }; //검색어 강조

  const onSearch = value => {
    setKeyword(value);
  };

  const getData = async () => {
    try {
      setLoading(true);

      await axios.get(`/api/board/search/${keyword}?page=${page}`).then(res => {
        setData(res.data.content);
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [keyword]);

  return (
    <div>
      <h1> 검색하기 </h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />

      {data.map(list => (
        <div>
          <Link to={`/post/${list.id}`}>
            <ul style={{ cursor: 'pointer', color: 'black' }}>
              <li>{highlightedText(list.title, keyword)}</li>
              <li>{highlightedText(list.writer, keyword)}</li>
              <li>{highlightedText(list.event, keyword)}</li>
              <li>{highlightedText(list.region1Depth, keyword)}</li>
              <li>{highlightedText(list.region2Depth, keyword)}</li>
              <li>{highlightedText(list.placeName, keyword)}</li>
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchPost;
