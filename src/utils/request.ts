import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class Request {
  // axios实例
  private instance: AxiosInstance;
  // 配置baseURL环境变量
  private baseConfig: AxiosRequestConfig = {
    timeout: 5000,
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  // 设置请求拦截器
  private setRequestInterceptors() {
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );
  }

  // 设置响应拦截器
  private setResponseInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    );
  }

  // 请求方法
  // public request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  //   return this.instance.request<T>(config);
  // }
  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>(config);
  }

  // GET请求
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<any, T>(url, config);
  }

  // POST请求
  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post<any, T>(url, data, config);
  }

  // PUT请求
  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put<any, T>(url, data, config);
  }

  // DELETE请求
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<any, T>(url, config);
  }
}

export default new Request();
