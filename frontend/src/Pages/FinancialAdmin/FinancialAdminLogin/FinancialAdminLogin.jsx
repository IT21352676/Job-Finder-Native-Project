import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const FinancialAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email } = values; 
      const response = await axios.post('http://localhost:8000/financial-admin-login', values);
      message.success('Login successful');
      sessionStorage.setItem('email', email); 
      navigate('/financialadmin/dashboard');
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 309) {
        const { email } = values; 
        message.warning('Your password should change');
        sessionStorage.setItem('email', email); 
        navigate('/changepassword');
      } else {
        message.error('Login failed. Please check your email and password.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={styles.container}>
      <div style={styles.embossedContainer}>
        <Title level={2} style={styles.title}>Financial Admin Login</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
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
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="link"
              style={styles.forgotPassword}
              onClick={() => navigate('/forgotpassword')}
            >
              Forgot Password?
            </Button>
          </Form.Item>
        </Form>
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
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  },
  embossedContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '350px',
    padding: '40px 30px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
  },
  title: {
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  input: {
    height: '45px',
    borderRadius: '8px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    height: '45px',
    backgroundColor: 'rgb(0, 87, 88)',
    borderColor: 'rgb(0, 87, 88)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  },
  forgotPassword: {
    padding: 0,
    height: '40px',
    color: 'rgb(0, 87, 88)',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  },
};

export default FinancialAdminLogin;