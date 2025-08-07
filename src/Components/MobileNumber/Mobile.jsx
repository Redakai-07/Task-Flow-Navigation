import React, { useState } from 'react'
import { Button, Form, Input, Modal, message, Space } from "antd";
import { Flex } from 'antd';
import { MobileOutlined, CopyOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { generateOTP } from '../../slice';
import "./Mobile.css";

const Mobile = ({current, setCurrent, markStepCompleted}) => {
    const [form2] = Form.useForm();
    const [openResponsive, setOpenResponsive] = useState(false);
    const dispatch = useDispatch();
    const { generatedOTP } = useSelector(state => state.users);

    const onFinish = (values) => {
        // Generate OTP and store in Redux
        dispatch(generateOTP(values.mobile));
        setOpenResponsive(true);
        console.log("Received values of form: ", values);
    };

    const handleModalOk = () => {
        setOpenResponsive(false);
        markStepCompleted(current); // Mark step as completed
        setCurrent(current+1);
    };

    const copyToClipboard = () => {
        if (generatedOTP) {
            // Create a temporary textarea element
            const textArea = document.createElement('textarea');
            textArea.value = generatedOTP;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    message.success('OTP copied to clipboard!');
                } else {
                    message.error('Failed to copy OTP');
                }
            } catch (err) {
                message.error('Failed to copy OTP');
            }
            
            document.body.removeChild(textArea);
        } else {
            message.error('No OTP available to copy');
        }
    };
      
    return (
        <div className="Mobile-form">
            <Form 
                name="mobile"
                initialValues={{
                    remember: true,
                }}
                form={form2}
                maxWidth="300px"
                onFinish={onFinish}
            >
                {/* Mobile Number */}
                <Form.Item
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Mobile Number!",
                        },
                        {
                            pattern: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit mobile number!",
                        }
                    ]}
                >
                    <Input 
                        prefix={<MobileOutlined />} 
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                </Form.Item>

                {/* Button */}
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Send OTP
                    </Button>
                    <Flex vertical gap="middle" align="flex-start">
                        <Modal
                            className="modal"
                            title="OTP has been sent to your mobile number."
                            centered
                            open={openResponsive}
                            onOk={handleModalOk}
                            onCancel={() => setOpenResponsive(false)}
                            width={{
                                xs: '90%',
                                sm: '80%',
                                md: '70%',
                                lg: '60%',
                                xl: '50%',
                                xxl: '40%',
                            }}
                            bodyStyle={{
                                height: "180px",  
                            }}
                        >
                            <div className='ptag'>
                                <br />
                                <p style={{fontSize:'20px', fontWeight: 'bold', color: '#1890ff'}}>
                                    Your OTP is: {generatedOTP}
                                </p>
                                <Space style={{ marginTop: '10px' }}>
                                    <Button 
                                        type="default" 
                                        icon={<CopyOutlined />}
                                        onClick={copyToClipboard}
                                        size="small"
                                    >
                                        Copy OTP
                                    </Button>
                                </Space>
                                <p style={{fontSize:'14px', color: '#666', marginTop: '10px'}}>
                                    Please use this OTP in the next step.
                                </p>
                                <p style={{fontSize:'12px', color: '#999'}}>Valid for 10 mins.</p>
                            </div>
                        </Modal>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Mobile