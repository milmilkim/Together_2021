import React from 'react';
import 'antd/dist/antd.css';
import './WritePost';
import { Form, Input, Button, Select, DatePicker, InputNumber, TimePicker } from 'antd';
import moment from 'moment';


//지도를 어떻게 넣어야 할지 모르겠음...
//


const WritePost = () => {
  const format = 'HH:mm';

    
      return (
        <><br></br><>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="제목">
              <Input />
            </Form.Item>
            <Form.Item
              label="종목"
            >
              <Select defaultValue="종목">
                <Select.Option value="soccer">축구</Select.Option>
                <Select.Option value="baseball">야구</Select.Option>
                <Select.Option value="basketball">농구</Select.Option>
                <Select.Option value="etc">기타</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="날짜">
              <DatePicker />
              <TimePicker defaultValue={moment('00:00', format)} format={format}/>
            </Form.Item>


            <Form.Item label="모집 인원">
              <InputNumber />
            </Form.Item>

            <Form.Item name={['user', 'introduction']} label="소개">
              <Input.TextArea />
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '25px' }}
              >
                등록
              </Button>
            </Form.Item>
          </Form>
        </></>
    );
};

export default WritePost;