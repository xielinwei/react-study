import React, { useState, useEffect } from 'react';
import { message, Button, Input, Form, Upload, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { userApi, articleApi, fileApi } from './api';
import type { User, Article } from './api';

// 登录组件示例
export const LoginExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      const response = await userApi.login(values);
      
      // 保存token
      localStorage.setItem('token', response.data.token);
      
      message.success('登录成功！');
      console.log('用户信息:', response.data.user);
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

// 用户信息组件示例
export const UserInfoExample: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await userApi.getUserInfo();
      setUser(response.data);
    } catch (error) {
      console.error('获取用户信息失败:', error);
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateUser = async (values: Partial<User>) => {
    try {
      setLoading(true);
      const response = await userApi.updateUser(values);
      setUser(response.data);
      message.success('更新成功！');
    } catch (error) {
      console.error('更新用户信息失败:', error);
      message.error('更新失败');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      const response = await userApi.uploadAvatar(file);
      setUser(prev => prev ? { ...prev, avatar: response.data.avatar } : null);
      message.success('头像上传成功！');
    } catch (error) {
      console.error('头像上传失败:', error);
      message.error('头像上传失败');
    }
  };

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h2>用户信息</h2>
      <p>ID: {user.id}</p>
      <p>姓名: {user.name}</p>
      <p>邮箱: {user.email}</p>
      {user.avatar && <img src={user.avatar} alt="头像" style={{ width: 100, height: 100 }} />}
      
      <Upload
        beforeUpload={(file) => {
          handleUploadAvatar(file);
          return false; // 阻止自动上传
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>上传头像</Button>
      </Upload>
    </div>
  );
};

// 文章列表组件示例
export const ArticleListExample: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchArticles = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await articleApi.getList({ page, pageSize });
      setArticles(response.data.list);
      setPagination({
        current: response.data.page,
        pageSize: response.data.pageSize,
        total: response.data.total,
      });
    } catch (error) {
      console.error('获取文章列表失败:', error);
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchArticles(pagination.current, pagination.pageSize);
  };

  const handleDelete = async (id: number) => {
    try {
      await articleApi.delete(id);
      message.success('删除成功！');
      fetchArticles(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: ['author', 'name'],
      key: 'author',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Article) => (
        <Button 
          type="link" 
          danger 
          onClick={() => handleDelete(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>文章列表</h2>
      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

// 文件上传下载示例
export const FileExample: React.FC = () => {
  const handleUpload = async (file: File) => {
    try {
      const response = await fileApi.upload(file);
      message.success('文件上传成功！');
      console.log('文件URL:', response.data.url);
    } catch (error) {
      console.error('文件上传失败:', error);
      message.error('文件上传失败');
    }
  };

  const handleDownload = async () => {
    try {
      await fileApi.download('/api/files/example.pdf', 'example.pdf');
      message.success('文件下载成功！');
    } catch (error) {
      console.error('文件下载失败:', error);
      message.error('文件下载失败');
    }
  };

  return (
    <div>
      <h2>文件操作</h2>
      
      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
      
      <Button onClick={handleDownload} style={{ marginLeft: 16 }}>
        下载示例文件
      </Button>
    </div>
  );
};

// 完整示例组件
export const ApiExample: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>Axios 封装使用示例</h1>
      
      <div style={{ marginBottom: 32 }}>
        <h3>登录示例</h3>
        <LoginExample />
      </div>
      
      <div style={{ marginBottom: 32 }}>
        <h3>用户信息示例</h3>
        <UserInfoExample />
      </div>
      
      <div style={{ marginBottom: 32 }}>
        <h3>文章列表示例</h3>
        <ArticleListExample />
      </div>
      
      <div style={{ marginBottom: 32 }}>
        <h3>文件操作示例</h3>
        <FileExample />
      </div>
    </div>
  );
};

export default ApiExample; 