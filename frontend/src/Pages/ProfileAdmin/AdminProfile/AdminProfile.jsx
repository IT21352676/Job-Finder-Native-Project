import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordForm] = Form.useForm();
  const navigate = useNavigate();
  const sessionEmail = sessionStorage.getItem('email');

  useEffect(() => {
    const fetchProfile = async () => {
      if (sessionEmail) {
        try {
          const response = await axios.get('http://localhost:8000/get-admin-data', { params: { email: sessionEmail } });
          const { FirstName, LastName, Email } = response.data;
          setFirstName(FirstName);
          setLastName(LastName);
          setEmail(Email);
        } catch (error) {
          message.error('Failed to load profile data');
        }
      }
    };

    fetchProfile();
  }, [sessionEmail]);

  const onUpdateProfile = async () => {
    setLoading(true);
    try {
      await axios.put('http://localhost:8000/update-admin', { email: sessionEmail, firstName, lastName });
      message.success('Profile updated successfully');
      setEditingField(null);
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (values) => {
    setLoading(true);
    try {
      await axios.put('http://localhost:8000/update-admin-password', { email: sessionEmail, ...values });
      message.success('Password changed successfully');
      passwordForm.resetFields();
      setShowPasswordFields(false);
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  return (
    <div style={styles.container}>
      <div style={styles.embossedContainer}>
        <Title level={2} style={styles.title}>Profile</Title>
        <Form
          onFinish={onUpdateProfile}
          style={styles.form}
          initialValues={{ firstName, lastName, email }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input
              placeholder={firstName}
              style={styles.input}
              disabled={editingField !== 'firstName'}
              suffix={
                editingField !== 'firstName' && (
                  <EditOutlined onClick={() => handleEdit('firstName')} style={styles.editIcon} />
                )
              }
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
          >
            <Input
              placeholder={lastName}
              style={styles.input}
              disabled={editingField !== 'lastName'}
              suffix={
                editingField !== 'lastName' && (
                  <EditOutlined onClick={() => handleEdit('lastName')} style={styles.editIcon} />
                )
              }
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          
          >
            <Input
              placeholder={email}
              style={styles.input}
              disabled={true}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={styles.button}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>

        <Title level={4} style={styles.subtitle}>Change Password</Title>
        {!showPasswordFields ? (
          <Button type="default" onClick={() => setShowPasswordFields(true)} style={styles.button}>
            Change Password
          </Button>
        ) : (
          <Form
            form={passwordForm}
            onFinish={onChangePassword}
            style={styles.form}
          >
            <Form.Item
              name="oldPassword"
              rules={[{ required: true, message: 'Please input your current password!' }]}
            >
              <Input.Password placeholder="Current Password" style={styles.input} />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password placeholder="New Password" style={styles.input} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading} style={styles.button}>
                  Change Password
                </Button>
                <Button type="default" onClick={() => setShowPasswordFields(false)} style={styles.button}>
                  Cancel
                </Button>
              </Space>
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
    width: '40%',
    padding: '40px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    textAlign: 'center',
  },
  title: {
    marginBottom: '24px',
  },
  subtitle: {
    marginTop: '24px',
  },
  form: {
    maxWidth: '500px',
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
  editIcon: {
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.45)',
  },
};

export default Profile;
