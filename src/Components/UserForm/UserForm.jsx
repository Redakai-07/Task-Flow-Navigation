import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../slice';
import "./UserForm.css";

const UserForm = ({current, setCurrent, markStepCompleted}) => {

  const dispatch = useDispatch();
  const registeredUsers = useSelector(state => state.users.registeredUsers);
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    // Check if username already exists
    const existingUser = registeredUsers.find(user => user.username === values.username);
    if (existingUser) {
      message.error('Username already exists. Please choose a different username.');
      return;
    }
    
    // Store the registered user data using Redux
    const userData = {
      username: values.username,
      password: values.password
    };
    
    dispatch(addUser(userData));
    message.success('✅ Registration successful! You can now login.');
    markStepCompleted(current); // Mark step as completed
    setCurrent(current+1);
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Please fill in all required fields correctly.');
  };
  
  return (
  
      <div className="register-form">
      <Form 
            name="login"
            initialValues={{
            remember: true,
            }}
            form={form}
            maxWidth="300px"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
      >


        {/* User Name */}
<Form.Item
  name="username"
  rules={[
    {
      required: true,
      message: "Please input your Username!",
    },
  ]}
>
  <Input prefix={<UserOutlined />} placeholder="Username" />
</Form.Item>


{/* Password */}
<Form.Item
  name="password"
  rules={[
    {
      required: true,
      message: "Please input your Password!",
    },
  ]}
>
  <Input
    prefix={<LockOutlined />}
    type="password"
    placeholder="Password"
    hasFeedback
  />
</Form.Item>


{/* Confirm Password */}
<Form.Item
  name="confirmPassword"
  dependencies={['password']}
  hasFeedback
  rules={[
    {
      required: true,
      message: "Please input your Password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The new password that you entered do not match!'));
      },
    }),
  ]}
  
>
  <Input
    prefix={<LockOutlined />}
    type="password"
    placeholder="Confirm Password"
  />
</Form.Item>
  
{/* Button */}
<Form.Item>
  <Button block type="primary" htmlType="submit">
    Register
  </Button>
</Form.Item>
</Form> 
       
      </div>
 
  );
};

export default UserForm;

































  