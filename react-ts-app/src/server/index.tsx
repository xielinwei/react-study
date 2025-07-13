import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 响应数据接口
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
  showError?: boolean;
}

// 错误信息接口
export interface ErrorInfo {
  code: number;
  message: string;
  details?: unknown;
}

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 显示loading
    if ((config as RequestConfig).showLoading !== false) {
      // 这里可以添加loading状态管理
      // console.log('Request started:', config.url);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data, config } = response;
    
    // 隐藏loading
    if ((config as RequestConfig).showLoading !== false) {
      // console.log('Request completed:', config.url);
    }

    // 处理业务错误
    if (data.code !== 200 && data.code !== 0) {
      const error: ErrorInfo = {
        code: data.code,
        message: data.message || '请求失败',
        details: data,
      };

      // 显示错误信息
      if ((config as RequestConfig).showError !== false) {
        console.error('Business error:', error);
        // 这里可以添加错误提示，比如使用antd的message
      }

      return Promise.reject(error);
    }

    return data;
  },
  (error: AxiosError) => {
    console.error('Response error:', error);

    // 隐藏loading
    if (error.config && (error.config as RequestConfig).showLoading !== false) {
      console.log('Request failed:', error.config.url);
    }

    let errorInfo: ErrorInfo = {
      code: 500,
      message: '网络错误',
    };

    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      errorInfo = {
        code: status,
        message: (data as { message?: string })?.message || `HTTP ${status} 错误`,
        details: data,
      };

      // 处理特定状态码
      switch (status) {
        case 401:
          errorInfo.message = '未授权，请重新登录';
          // 清除token并跳转到登录页
          localStorage.removeItem('token');
          // window.location.href = '/login';
          break;
        case 403:
          errorInfo.message = '拒绝访问';
          break;
        case 404:
          errorInfo.message = '请求的资源不存在';
          break;
        case 500:
          errorInfo.message = '服务器内部错误';
          break;
        default:
          errorInfo.message = `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorInfo.message = '网络连接失败，请检查网络设置';
    } else {
      // 请求配置出错
      errorInfo.message = error.message || '请求配置错误';
    }

    // 显示错误信息
    if (error.config && (error.config as RequestConfig).showError !== false) {
      console.error('Network error:', errorInfo);
      // 这里可以添加错误提示，比如使用antd的message
    }

    return Promise.reject(errorInfo);
  }
);

// HTTP方法封装
export class HttpClient {
  private instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  // GET请求
  async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get(url, config);
  }

  // POST请求
  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config);
  }

  // PUT请求
  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config);
  }

  // DELETE请求
  async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config);
  }

  // PATCH请求
  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.patch(url, data, config);
  }

  // 上传文件
  async upload<T = any>(url: string, file: File, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.instance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
  }

  // 下载文件
  async download(url: string, filename?: string, config?: RequestConfig): Promise<void> {
    const response = await this.instance.get(url, {
      ...config,
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

// 创建HTTP客户端实例
export const httpClient = new HttpClient(instance);

// 导出axios实例（如果需要直接使用）
export { instance as axios };

// 默认导出HTTP客户端
export default httpClient;
