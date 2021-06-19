/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint @typescript-eslint/explicit-module-boundary-types: off */
// #region [Import]
import axios, { AxiosRequestConfig, Method } from 'axios';

// #region [Response]
export interface BaseResponse {
  body: unknown;
}
// #endregion

// #region [BaseRequest]
interface BaseRequestProps {
  url: string;
  method: Method;
  params?: unknown;
  data?: unknown;
  contentType?: string;
}

// const catchError = (err: Error, isMe: boolean) => {
//   const isLogin = window.location.pathname.startsWith('/auth/login');
//   if (isMe) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refresh');
//     // message.warn({ content: 'Танд хандах эрх байхгүй байна. Дахин нэвтэрнэ үү' })
//     if (!isLogin) window.location.replace('/auth/login');
//   } else {
//     // message.error({ content: err.message })
//   }
// };

export const BaseRequest = async (props: BaseRequestProps) => {
  // const isMe = props.url === 'person/me';
  // const token = localStorage.getItem('token');
  // const locale = localStorage.getItem('locale') || 'mn'
  const locale = 'en';

  // console.log('BaseRequest', { isMe, token, locale })

  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common['Accept-Language'] = locale || 'mn';
  axios.defaults.headers.common['Content-Type'] = props.contentType
    ? props.contentType
    : 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  // if (token) {
  //   // console.log('token', token)
  //   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  // }
  const config: AxiosRequestConfig = {
    baseURL:
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      'https://jsonplaceholder.typicode.com/posts',
    ...props,
  };
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log('config', config)
    const { data, status, statusText } = await axios(config);
    // console.log('responseInstance', responseInstance)
    // const response = responseInstance.data

    // console.log('response', data, status !== 200, status)
    if (status !== 200) {
      const error = new Error(statusText);
      // catchError(error, isMe)
      throw error;
    }

    return data || false;
  } catch (err) {
    // catchError(err, isMe)
    throw err;
  }
};
// #endregion
