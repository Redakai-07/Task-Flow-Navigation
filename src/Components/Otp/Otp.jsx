import React from "react";
import { Flex, Input, Typography, Button } from "antd";
import { Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, clearOTP } from '../../slice';
import { toast } from 'react-toastify';
import "./Otp.css";

const { Title } = Typography;

const Otp = ({current, setCurrent, markStepCompleted}) => {
  const [form3] = Form.useForm();
  const dispatch = useDispatch();
  const { generatedOTP } = useSelector(state => state.users);
  
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  
  const sharedProps = {
    onChange,
    onInput,
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    
    if (generatedOTP === values.otp) {
      console.log("OTP is matching");
      dispatch(verifyOTP(values.otp));
      toast.success("OTP verified successfully!");
      markStepCompleted(current); // Mark step as completed
      setCurrent(current + 1);
    } else {
      console.log("OTP not matching");
      toast.error("Invalid OTP! Please try again.");
    }
  };

  const handleRegenerateOTP = () => {
    setCurrent(current - 1); // Go back to mobile step
    dispatch(clearOTP());
    toast.info("Please regenerate OTP from the previous step.");
  };

  return (
    <div className="Mobile-form">
      <Form
        name="mobile"
        initialValues={{
          remember: true,
        }}
        form={form3}
        maxWidth="300px"
        onFinish={onFinish}
      >
        {/* Otp */}
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your OTP!",
            },
            {
              pattern: /^[0-9]{6}$/,
              message: "Please enter a valid 6-digit OTP!",
            }
          ]}
        >
          <Flex gap="middle" align="flex-start" vertical>
            <Title level={5}>Enter the OTP sent to your Mobile No.</Title>
            <Input.OTP
              formatter={(str) => str.toUpperCase()}
              {...sharedProps}
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Flex>
        </Form.Item>

        {/* Button */}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Verify OTP
          </Button>
        </Form.Item>

        {/* Regenerate OTP Button */}
        <Form.Item>
          <Button 
            block 
            type="default" 
            onClick={handleRegenerateOTP}
            style={{ marginTop: '8px' }}
          >
            Regenerate OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Otp;
