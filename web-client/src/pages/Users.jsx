import React, { useEffect, useState } from 'react';
import { Button, Form, Input, List, Modal, message, Select, Spin } from 'antd';
import { getAllUsers, createUser, updateUser, deleteUser, associateUserWithCompany } from '../services/users.service';
import { getAllCompanies } from '../services/companies.service';
import { ReloadOutlined, SearchOutlined, PlayCircleOutlined, CopyOutlined } from '@ant-design/icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [startProcessLoading, setStartProcessLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      message.error('Failed to load users');
    }
    setLoading(false);
  };

  const fetchCompanies = async () => {
    try {
      const data = await getAllCompanies();
      setCompanies(data);
    } catch (error) {
      message.error('Failed to load companies');
    }
  };

  const handleAddUser = async (values) => {
    setStartProcessLoading(true);
    try {
      const { name, email, phone, companyId } = values;
      const userData = { name, email, phone, companies: companyId ? [companyId] : [] };

      if (currentUser) {
        await updateUser(currentUser._id, userData);
        message.success('User updated successfully');
      } else {
        await createUser(userData);
        message.success('User added successfully');
      }
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to save user');
    }
    setStartProcessLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(userId);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
    setLoading(false);
  };

  const handleAssociateCompany = async (userId, companyId) => {
    setLoading(true);
    try {
      await associateUserWithCompany(userId, companyId);
      message.success('User associated with company');
      fetchUsers();
    } catch (error) {
      message.error('Failed to associate user with company');
    }
    setLoading(false);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      companyId: user.companies?.[0]?._id || null,
    });
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentUser(null);
  };

  return (
    <div>
      <header>
        <div>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            loading={startProcessLoading}
          >
            Add User
          </Button>
          <Button
            onClick={() => fetchUsers()}
          >
            <ReloadOutlined />
          </Button>
        </div>
      </header>

      <div>
        {loading ? (
          <Spin size="large" className="mt-10" />
        ) : (
          <div>
            <List
              header={<h2>Users List</h2>}
              bordered
              dataSource={users}
              renderItem={(user) => (
                <List.Item
                  actions={[
                    <Button type="link" onClick={() => openEditModal(user)}>
                      Edit
                    </Button>,
                    <Button type="link" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>,
                    <Select
                      defaultValue="Associate"
                      onChange={(value) => handleAssociateCompany(user._id, value)}
                      style={{ width: 120 }}
                    >
                      {companies.map((company) => (
                        <Select.Option key={company._id} value={company._id}>
                          {company.name}
                        </Select.Option>
                      ))}
                    </Select>,
                  ]}
                >
                  <div>
                    <strong>{user.name}</strong> - {user.email} - {user.phone}
                  </div>
                  <div>
                    {user.companies && user.companies.length
                      ? user.companies.map((company) => <span key={company._id}>{company.name}</span>)
                      : 'No companies associated'}
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}
      </div>

      <Modal
        title={currentUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="companyId" label="Company">
            <Select
              placeholder="Select a company"
              allowClear
              options={companies.map((company) => ({
                value: company._id,
                label: company.name,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={startProcessLoading}
            >
              {currentUser ? 'Update' : 'Add'} User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
