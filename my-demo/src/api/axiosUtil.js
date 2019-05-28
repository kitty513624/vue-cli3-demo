import axios from 'axios';
import app from '../main';
import envObject from '../common/js/env';
// import CONSTANT from '../common/js/constant';

const RESPONSE_CODE_OK = 1;
const RESPONSE_CODE_INVALID_TOKEN = 1001;
const RESPONSE_CODE_LOGIN_ELSEWHERE = 1010;
let loadingToast;

// 请求拦截器
axios.interceptors.request.use((config) => {
  loadingToast = app.$createToast(
    {
      txt: 'Loading...',
      time: 0,
      mask: true,
    },
  ).show();

  if (config.method === 'post') {
    // config.data = qs.stringify({ ...config.data });
  } else {
    config.params = {
      ...config.params,
    };
  }
  // const loginToken = localStorage.getItem(CONSTANT.STORAGE_NAME_LOGIN_TOKEN);
  const loginToken = app.$store.getters.getLoginToken;
  console.log(`axios request loginToken:${loginToken}`);
  if (loginToken) {
    config.headers.token = loginToken;
  }
  config.headers.tokenC = envObject.headers.tokenC;
  config.headers.appId = envObject.headers.appId;
  config.headers.unionId = 'oXmxz0deX6bzzTUGelQqtJrSIHfg';
  // config.headers.unionId = app.$store.getters.getWxUnionId;

  return config;
}, (error) => {
  if (loadingToast) {
    loadingToast.hide();
  }
  app.$createToast({
    type: 'warn',
    txt: error,
  });
  Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use((response) => {
  if (loadingToast) {
    loadingToast.hide();
  }
  const reqData = response.data;
  if (reqData && (reqData.statusCode === RESPONSE_CODE_OK)) {
    return reqData;
  }
  if (reqData && (reqData.statusCode === RESPONSE_CODE_INVALID_TOKEN
    || reqData.statusCode === RESPONSE_CODE_LOGIN_ELSEWHERE)) {
    app.$store.commit('SAVE_LOGIN_TOKEN', '');
    // app.$store.commit('DELETE_LOGIN_TOKEN', '');
    // localStorage.setItem(CONSTANT.STORAGE_NAME_LOGIN_TOKEN, '');
    console.log(`axios响应拦截器:${JSON.stringify(reqData)}`);
    app.$router.push({ name: 'wxLogin', query: { autoRedirect: true } });
  }
  if (reqData.statusCode !== 5000) {
    app.$createToast({
      txt: reqData.message,
      type: 'txt',
      time: 2000,
    }).show();
  }
  return Promise.reject(reqData);
}, (error) => {
  if (loadingToast) {
    loadingToast.hide();
  }
  if (error && (error.response.data.statusCode === RESPONSE_CODE_INVALID_TOKEN
    || error.response.data.statusCode === RESPONSE_CODE_LOGIN_ELSEWHERE)) {
    app.$store.commit('SAVE_LOGIN_TOKEN', '');
    // app.$store.commit('DELETE_LOGIN_TOKEN', '');
    // localStorage.setItem(CONSTANT.STORAGE_NAME_LOGIN_TOKEN, '');
    console.log(`axios响应拦截器:${JSON.stringify(error)}`);
    app.$router.push({ name: 'wxLogin', query: { autoRedirect: true } });
  } else {
    const txt = JSON.parse(JSON.stringify(error)).response.status === 404
      ? '数据找不到了'
      : '服务器开小差了，请稍后再试';
    app.$createToast({
      type: 'warn',
      txt,
    }).show();
  }
  return Promise.reject(error);
});
// 实例化axios
const instance = axios.create();
// 请求拦截器
instance.interceptors.request.use((config) => {
  // loadingToast = app.$createToast(
  //   {
  //     txt: 'Loading...',
  //     time: 0,
  //     mask: true,
  //   },
  // ).show();

  if (config.method === 'post') {
    // config.data = qs.stringify({ ...config.data });
  } else {
    config.params = {
      ...config.params,
    };
  }
  // const loginToken = localStorage.getItem(CONSTANT.STORAGE_NAME_LOGIN_TOKEN);
  const loginToken = app.$store.getters.getLoginToken;
  console.log(`axios request loginToken:${loginToken}`);
  if (loginToken) {
    config.headers.token = loginToken;
  }
  config.headers.tokenC = envObject.headers.tokenC;
  config.headers.appId = envObject.headers.appId;
  config.headers.unionId = app.$store.getters.getWxUnionId;
  console.log(`unionid: ${app.$store.getters.getWxUnionId}`);

  return config;
}, (error) => {
  if (loadingToast) {
    loadingToast.hide();
  }
  app.$createToast({
    type: 'warn',
    txt: error,
  });
  Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use((response) => {
  if (loadingToast) {
    loadingToast.hide();
  }
  const reqData = response.data;
  if (reqData && (reqData.statusCode === RESPONSE_CODE_OK)) {
    return reqData;
  }
  if (reqData && (reqData.statusCode === RESPONSE_CODE_INVALID_TOKEN
    || reqData.statusCode === RESPONSE_CODE_LOGIN_ELSEWHERE)) {
    app.$store.commit('SAVE_LOGIN_TOKEN', '');
    // app.$store.commit('DELETE_LOGIN_TOKEN', '');
    // localStorage.setItem(CONSTANT.STORAGE_NAME_LOGIN_TOKEN, '');
    console.log(`axios响应拦截器:${JSON.stringify(reqData)}`);
    app.$router.push({ name: 'wxLogin', query: { main: 'main' } });
  }
  // if (reqData.statusCode !== 5000) {
  //   app.$createToast({
  //     txt: reqData.message,
  //     type: 'txt',
  //     time: 2000,
  //   }).show();
  // }
  return Promise.reject(reqData);
}, (error) => {
  if (loadingToast) {
    loadingToast.hide();
  }
  if (error && (error.response.data.statusCode === RESPONSE_CODE_INVALID_TOKEN
    || error.response.data.statusCode === RESPONSE_CODE_LOGIN_ELSEWHERE)) {
    app.$store.commit('SAVE_LOGIN_TOKEN', '');
    // app.$store.commit('DELETE_LOGIN_TOKEN', '');
    // localStorage.setItem(CONSTANT.STORAGE_NAME_LOGIN_TOKEN, '');
    console.log(`axios响应拦截器:${JSON.stringify(error)}`);
    app.$router.push({ name: 'wxLogin', query: { main: 'main' } });
  } else {
    const txt = JSON.parse(JSON.stringify(error)).response.status === 404
      ? '数据找不到了'
      : '服务器开小差了，请稍后再试';
    app.$createToast({
      type: 'warn',
      txt,
    }).show();
  }
  return Promise.reject(error);
});

// get方法
export function get(url) {
  return function getReturn(params = {}) {
    return axios.get(envObject.hostUrl + url, { params });
  };
}

// get instance方法
export function getInstance(url) {
  return function getReturn(params = {}) {
    return instance.get(envObject.hostUrl + url, { params });
  };
}

// post方法
export function post(url) {
  return function postReturn(params = {}) {
    return axios.post(envObject.hostUrl + url, params);
  };
}

// post instance方法
export function postInstance(url) {
  return function postReturn(params = {}) {
    return instance.post(envObject.hostUrl + url, params);
  };
}
