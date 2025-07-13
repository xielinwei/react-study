import React, { useRef } from 'react';
import { ProTable } from '@ant-design/pro-table';
import { Button, Tag, Form, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import httpClient from '../../server';

// 类型定义
type UserItem = {
  id: string;
  name: string;
  age: number;
  address: string;
  status: 'active' | 'banned';
};


const UserTable: React.FC = () => {
  // 列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: UserItem, b: UserItem) => a.age - b.age,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: ({text}: {text: string}) => {
        return (
        <Tag color={text === 'active' ? 'green' : 'red'}>
          {text === 'active' ? '活跃' : '禁用'}
        </Tag>
      )},
      filters: true,
      valueEnum: {
        active: { text: '活跃', status: 'Success' },
        banned: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserItem) => (
        <Button size="small" onClick={() => alert(`编辑 ${record.name}`)}>
          编辑
        </Button>
      ),
    },
  ];
  const formRef = useRef<any>(null)
  const actionRef = useRef<any>(null)
  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('changedValues', changedValues);
    console.log('allValues', allValues);
  }
  return (  
    <ProTable<UserItem>
      columns={columns}
      headerTitle="用户列表"
      params={{
        key: 'id',
        label: 'ID',
        value: '',
      }}
      request={ async (params: any) => {
        console.log('请求参数:', params);
        const res = await httpClient.post("/table", {
          page: params.current,
          pageSize: params.pageSize,
        })
        return {
          data: res.data.list,
          total: res.data.total,
        };
      }}
      rowKey="id"
      pagination={{
        defaultPageSize: 10
      }}
      actionRef={actionRef}
      formRef={formRef as any}
      toolBarRender={() => [
        <Form
          key="searchForm"
          layout="inline"
          onFinish={(values) => {
            // 处理提交
          }}
        >
          <Form.Item name="customField">
            <Input placeholder="自定义字段" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>,
      ]}
      form={{
        omitNil: false,
        onValuesChange: handleValuesChange
      }}
      search={false}
      
      dateFormatter="string"
    >
      <div>123dsakdsadjsakdsa</div>
    </ProTable>
  );
};

export default UserTable;