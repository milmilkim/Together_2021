import ListCard from 'components/ListCard';

const Category = ({ match }) => {
  //어쩌고

  const { category } = match.params;

  return (
    <>
      <ListCard getApi={'/api/board/search/' + category} />
    </>
  );
};

export default Category;
