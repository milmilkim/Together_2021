import ListCardPagination from 'components/ListCardPagination';
import { baseApiUrl } from 'components/Options';
import { useEffect } from 'react';

const Category = ({ match }) => {
  //어쩌고

  const { category } = match.params;

  useEffect(() => {}, [match.params]);

  return (
    <>
      <h1 style={{ paddingTop: '20px' }}> {category} </h1>
      <ListCardPagination
        getApi={`${baseApiUrl}/api/board/search/` + category}
        category={category}
      />
    </>
  );
};

export default Category;
