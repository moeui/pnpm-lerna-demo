/// <reference types="vite/client" />
/// <reference types="react" />

interface ImportMetaEnv {
  readonly REACT_APP_BASE_URL: string;
  readonly REACT_APP_XX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface IList<T> {
  total: number;
  data: T;
}

interface IResponse<T> {
  code: number;
  data: T;
  message: string;
  error?: string;
}

// type IPromise<T> = Promise<import('axios').AxiosResponse<T>>;