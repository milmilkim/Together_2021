import { DatePicker, Space } from 'antd';

const DateForm = () => {
  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    console.log(value.toString());
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
      />
    </Space>
  );
};

export default DateForm;
