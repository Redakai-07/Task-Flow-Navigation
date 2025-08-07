import React from 'react'
import { Button, Form, Input, message, Alert } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = ({current, setCurrent, markStepCompleted}) => {
 
    const dispatch = useDispatch();
    const registeredUsers = useSelector(state => state.users.registeredUsers);
    const [form1] = Form.useForm();
    
    const onFinish = (values) => {
        // Check if user exists and credentials match
        const user = registeredUsers.find(user => user.username === values.username && user.password === values.password);
        
        if (user) {
          // Dispatch login action to Redux
          dispatch(loginUser({
            username: values.username,
            password: values.password
          }));
          message.success('Login successful!');
          markStepCompleted(current); // Mark step as completed
          setCurrent(current+1);
        } else {
          // Show toast error for wrong credentials
          toast.error('Invalid username or password. Please check your credentials and try again.');
          // Don't proceed to next step
          return;
        }
      };

    const onFinishFailed = (errorInfo) => {
      toast.error('Please fill in all required fields correctly.');
    };

  return (

      <div className="login-form">
        {registeredUsers.length === 0 && (
          <Alert
            message="No registered users"
            description="Please go back to the Registration step and create an account first."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
      <Form 
            name="login"
            initialValues={{
            remember: true,
            }}
            form={form1}
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

{/* Button */}
<Form.Item>
  <Button block type="primary" htmlType="submit">
    Login
  </Button>
</Form.Item>
</Form>
      </div>
  )
}

export default Login