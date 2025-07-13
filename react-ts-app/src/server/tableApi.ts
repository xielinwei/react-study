import httpClient from './index';
import type { ApiResponse } from './index';

// 表格数据接口
export interface TableItem {
  name: string;
  age: number;
}

export interface TableListParams {
  page: number;
  pageSize: number;
}

export interface TableListResult {
  list: TableItem[];
  total: number;
  page: number;
  pageSize: number;
}

// 表格API
export const tableApi = {
  // GET 请求 - 通过查询参数传递
  getTableList: (params: TableListParams): Promise<ApiResponse<TableListResult>> => {
    return httpClient.get<TableListResult>('/table', { 
      params: {
        page: params.page,
        pageSize: params.pageSize
      }
    });
  },

  // POST 请求 - 通过请求体传递
  getTableListPost: (params: TableListParams): Promise<ApiResponse<TableListResult>> => {
    return httpClient.post<TableListResult>('/table', params);
  },

  // 带搜索条件的表格数据
  getTableListWithSearch: (params: TableListParams & { keyword?: string; status?: string }): Promise<ApiResponse<TableListResult>> => {
    return httpClient.post<TableListResult>('/table/search', params);
  },

  // 创建表格项
  createTableItem: (data: Omit<TableItem, 'id'>): Promise<ApiResponse<TableItem>> => {
    return httpClient.post<TableItem>('/table', data);
  },

  // 更新表格项
  updateTableItem: (id: number, data: Partial<TableItem>): Promise<ApiResponse<TableItem>> => {
    return httpClient.put<TableItem>(`/table/${id}`, data);
  },

  // 删除表格项
  deleteTableItem: (id: number): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(`/table/${id}`);
  },
};

export default tableApi; 