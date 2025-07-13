import httpClient from './index';
import type { ApiResponse } from './index';

// 用户相关接口
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

// 用户API
export const userApi = {
  // 登录
  login: (params: LoginParams): Promise<ApiResponse<LoginResult>> => {
    return httpClient.post<LoginResult>('/auth/login', params);
  },

  // 获取用户信息
  getUserInfo: (): Promise<ApiResponse<User>> => {
    return httpClient.get<User>('/user/info');
  },

  // 更新用户信息
  updateUser: (data: Partial<User>): Promise<ApiResponse<User>> => {
    return httpClient.put<User>('/user/profile', data);
  },

  // 上传头像
  uploadAvatar: (file: File): Promise<ApiResponse<{ avatar: string }>> => {
    return httpClient.upload<{ avatar: string }>('/user/avatar', file);
  },
};

// 文章相关接口
export interface Article {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface ArticleListResult {
  list: Article[];
  total: number;
  page: number;
  pageSize: number;
}

// 文章API
export const articleApi = {
  // 获取文章列表
  getList: (params: ArticleListParams = {}): Promise<ApiResponse<ArticleListResult>> => {
    return httpClient.get<ArticleListResult>('/articles', { params });
  },

  // 获取文章详情
  getDetail: (id: number): Promise<ApiResponse<Article>> => {
    return httpClient.get<Article>(`/articles/${id}`);
  },

  // 创建文章
  create: (data: Omit<Article, 'id' | 'author' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Article>> => {
    return httpClient.post<Article>('/articles', data);
  },

  // 更新文章
  update: (id: number, data: Partial<Article>): Promise<ApiResponse<Article>> => {
    return httpClient.put<Article>(`/articles/${id}`, data);
  },

  // 删除文章
  delete: (id: number): Promise<ApiResponse<void>> => {
    return httpClient.delete<void>(`/articles/${id}`);
  },
};

// 文件相关接口
export const fileApi = {
  // 下载文件
  download: (url: string, filename?: string): Promise<void> => {
    return httpClient.download(url, filename);
  },

  // 上传文件
  upload: (file: File): Promise<ApiResponse<{ url: string }>> => {
    return httpClient.upload<{ url: string }>('/upload', file);
  },
};

// 导出所有API
export default {
  user: userApi,
  article: articleApi,
  file: fileApi,
}; 