import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const onSubmitEmail = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/sendMailOtp', values);
      message.success('OTP sent to your email');
      setEmail(values.email);
      setStep(2);
    } catch (error) {
      message.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/verifyOtp', { email, otp: values.otp });
      message.success('OTP verified');
      setStep(3);
    } catch (error) {
      message.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/reset-password', { email, ...values });
      message.success('Password changed successfully');
      navigate('/');
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.embossedContainer}>
        <Title level={2} style={styles.title}>Forgot Password</Title>
        {step === 1 && (
          <Form
            name="email"
            onFinish={onSubmitEmail}
            style={styles.form}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                placeholder="Email"
                style={styles.input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={styles.button}
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        )}
        {step === 2 && (
          <Form
            name="otp"
            onFinish={onSubmitOtp}
            style={styles.form}
          >
            <Form.Item
              name="otp"
              rules={[{ required: true, message: 'Please input the OTP!' }]}
            >
              <Input
                placeholder="OTP"
                style={styles.input}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={styles.button}
              >
                Verify OTP
              </Button>
            </Form.Item>
          </Form>
        )}
        {step === 3 && (
          <Form
            name="change-password"
            onFinish={onChangePassword}
            style={styles.form}
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password
                placeholder="New Password"
                style={styles.input}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Please confirm your new password!' }]}
            >
              <Input.Password
                placeholder="Confirm New Password"
                style={styles.input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={styles.button}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  embossedContainer: {
    backgroundColor: '#ffffff',
    width: '25%',
    padding: '40px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    textAlign: 'center',
  },
  title: {
    marginBottom: '24px',
  },
  form: {
    maxWidth: '300px',
    margin: '0 auto',
  },
  input: {
    height: '40px',
  },
  button: {
    width: '100%',
    height: '40px',
    backgroundColor: 'rgb(0, 87, 88)',
    borderColor: 'rgb(0, 87, 88)',
  },
};

export default ForgotPassword;
