import React, { useEffect } from 'react'
import { Button, Card, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, clearAllSteps, clearOTP, clearUsers } from '../../slice';

const { Title, Text } = Typography;

const Success = ({current, setCurrent, markStepCompleted}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);

  // Mark success step as completed when component mounts
  useEffect(() => {
    markStepCompleted(current);
  }, [current, markStepCompleted]);

  const handleLogout = () => {
    // Clear all data and reset to initial state
    dispatch(logoutUser());
    dispatch(clearAllSteps());
    dispatch(clearOTP());
    dispatch(clearUsers());
    
    // Reset to first step
    setCurrent(0);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Card style={{ maxWidth: 400, margin: '0 auto' }}>
        <Title level={2}>🎉 Success!</Title>
        {isLoggedIn && currentUser && (
          <div>
            <Text strong>Congratulation {currentUser.username}!</Text>
            <br />
            <Text type="secondary">You have successfully completed the Task Flow.</Text>
          </div>
        )}
        <br />
        <Button type="primary" onClick={handleLogout} style={{ marginTop: 16 }}>
          Start Over
        </Button>
      </Card>
    </div>
  )
}

export default Success