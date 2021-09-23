import { Input, Space } from 'antd';

const { Search } = Input;

const SearchBox = () => {
  const onSearch = (value) => console.log(value);

  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </Space>
  );
};

export default SearchBox;
