import ListCard from 'components/ListCard';
import { baseApiUrl } from 'components/Options';

const Category = ({ match }) => {
  //어쩌고

  const { category } = match.params;

  return (
    <>
      <ListCard getApi={`${baseApiUrl}/api/board/search/` + category} />
    </>
  );
};

export default Category;
