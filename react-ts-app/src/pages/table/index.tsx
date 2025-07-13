import { useState, useEffect } from 'react';
import httpClient from '../../server';
import { Table } from 'antd';

const TableRoute = () => {
  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 1,
    total: 0,
  });

  const queryTable = (page = 1, pageSize = 10) => {
    console.log(page, pageSize, 'page, pageSize');
    if( pageSize !== pagination.pageSize ) {
      page = 1;
    }
    httpClient.post('/table', { page, pageSize }).then((res) => {
      console.log(res);
      setData(res.data.list);
      setPagination({
        ...res.data,
        current: res.data.page,
        pageSize: res.data.pageSize,
        list: []
      });
    });
  };

  useEffect(() => {
    queryTable(1, 10);
  }, []);

  const columns = [
    {
      title: 'Num',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return <div>
    <Table 
      rowKey="id"
      bordered
      dataSource={data} 
      columns={columns} 
      size='small'
      pagination={
        {
          pageSize: pagination.pageSize,
          current: pagination.page,
          total: pagination.total,
          showSizeChanger: true,
          onChange: queryTable,
          showTotal: (total: number) => `共${ total}条`,
          showLessItems: true,
        }
      }
    />
  </div>;
};

export default TableRoute;