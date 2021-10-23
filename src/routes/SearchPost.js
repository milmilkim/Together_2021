import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseApiUrl } from 'components/Options';
import './SearchPost.css';

const SearchPost = () => {
  const { Search } = Input;
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState('');
  const [totalPage, setTotalPage] = useState(0);

  const highlightedText = (text, query) => {
    if (query !== '' && text !== null && text.includes(query)) {
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

      await axios
        .get(`${baseApiUrl}/api/board/search/${keyword}?page=${page}`)
        .then(res => {
          setData(res.data.content);
          setTotalPage(res.data.totalPages);
        });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
    setPage(0);
  }, [keyword]);

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div>
      <h1> 검색하기 </h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <div id="searchWrap">
        {data.map(list => (
          <div className="searchList">
            <Link to={`/post/${list.id}`}>
              <ul style={{ cursor: 'pointer', color: 'black' }}>
                <li className="Rtitle">
                  {highlightedText(list.title, keyword)}
                </li>
                <li className="Rregion1 ComPlace">
                  {highlightedText(list.region1Depth, keyword)}
                </li>
                <li className="Rregion2 ComPlace">
                  {highlightedText(list.region2Depth, keyword)}
                </li>
                <li className="Rplace ComPlace">
                  {highlightedText(list.placeName, keyword)}
                </li>
                <div id="bottomWrap">
                  <li className="Revent">
                    {highlightedText(list.event, keyword)}
                  </li>
                  <li className="Rwrite">
                    {highlightedText(list.writer, keyword)}
                  </li>
                </div>
              </ul>
            </Link>
          </div>
        ))}
      </div>

      {page > 0 && (
        <Button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
        >
          이전
        </Button>
      )}
      {page < totalPage - 1 && (
        <Button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
        >
          다음
        </Button>
      )}
    </div>
  );
};

export default SearchPost;
