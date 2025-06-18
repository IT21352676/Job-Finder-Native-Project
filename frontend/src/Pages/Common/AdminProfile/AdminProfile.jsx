import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, Space } from 'antd';
import { EditOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AdminProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordForm] = Form.useForm();
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email');

  useEffect(() => {
    const fetchProfile = async () => {
      if (email) {
        try {
          const response = await axios.get('http://localhost:8000/get-admin-data', { params: { email } });
          const { FirstName, LastName, AdminRole } = response.data;
          setFirstName(FirstName);
          setLastName(LastName);
          setAdminRole(AdminRole);
        } catch (error) {
          message.error('Failed to load profile data');
        }
      }
    };

    fetchProfile();
  }, [email]);

  const onUpdateProfile = async () => {
    setLoading(true);
    try {
      await axios.put('http://localhost:8000/update-admin', { email, firstName, lastName});
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
      await axios.put('http://localhost:8000/update-admin-password', { email, ...values });
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '107.5vh',
      background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '110%',
        maxWidth: '550px',
        padding: '50px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
      }}>
        <Title level={2} style={{
          marginBottom: '30px',
          color: '#2c3e50',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '32px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }}>Admin Profile</Title>
        <Form
          onFinish={onUpdateProfile}
          style={{ width: '100%' }}
          initialValues={{ firstName, lastName, adminRole }}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#3498db' }} />}
              placeholder={firstName}
              style={{
                height: '45px',
                borderRadius: '10px',
                fontSize: '16px',
              }}
              disabled={editingField !== 'firstName'}
              suffix={
                editingField !== 'firstName' && (
                  <EditOutlined onClick={() => handleEdit('firstName')} style={{ cursor: 'pointer', color: '#3498db' }} />
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
              prefix={<UserOutlined style={{ color: '#3498db' }} />}
              placeholder={lastName}
              style={{
                height: '45px',
                borderRadius: '10px',
                fontSize: '16px',
              }}
              disabled={editingField !== 'lastName'}
              suffix={
                editingField !== 'lastName' && (
                  <EditOutlined onClick={() => handleEdit('lastName')} style={{ cursor: 'pointer', color: '#3498db' }} />
                )
              }
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Admin Role"
            name="adminRole"
          >
            <Input
              prefix={<MailOutlined style={{ color: '#3498db' }} />}
              placeholder={adminRole}
              style={{
                height: '45px',
                borderRadius: '10px',
                fontSize: '16px',
              }}
              disabled={true}
              onChange={(e) => setAdminRole(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              style={{
                width: '100%',
                height: '45px',
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s',
              }}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>

        <Title level={4} style={{
          marginTop: '40px',
          marginBottom: '20px',
          color: '#2c3e50',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>Change Password</Title>
        {!showPasswordFields ? (
          <Button 
            onClick={() => setShowPasswordFields(true)} 
            style={{
              width: '100%',
              height: '45px',
              borderRadius: '10px',
              borderColor: '#3498db',
              color: '#3498db',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s',
            }}
          >
            Change Password
          </Button>
        ) : (
          <Form
            form={passwordForm}
            onFinish={onChangePassword}
            style={{ width: '100%' }}
            layout="vertical"
          >
            <Form.Item
              name="oldPassword"
              rules={[{ required: true, message: 'Please input your current password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#3498db' }} />}
                placeholder="Current Password" 
                style={{
                  height: '45px',
                  borderRadius: '10px',
                  fontSize: '16px',
                }}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#3498db' }} />}
                placeholder="New Password" 
                style={{
                  height: '45px',
                  borderRadius: '10px',
                  fontSize: '16px',
                }}
              />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading} 
                  style={{
                    height: '45px',
                    backgroundColor: '#3498db',
                    borderColor: '#3498db',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s',
                  }}
                >
                  Change Password
                </Button>
                <Button 
                  onClick={() => setShowPasswordFields(false)} 
                  style={{
                    height: '45px',
                    borderRadius: '10px',
                    borderColor: '#3498db',
                    color: '#3498db',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s',
                  }}
                >
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

export default AdminProfile;