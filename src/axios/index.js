import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: 'callback'
        },
        function(err, response) {
          if (response.status === 'success') {
            resolve(response);
          } else {
            reject(response.message);
          }
        }
      );
    });
  }

  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi = 'https://easy-mock.com/mock/5de4f6555ca3f8525a4d3b2a/mockapi';
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status === 200) {
          let res = response.data;
          if (res.code === 0) {
            resolve(res);
          } else {
            Modal.info({
              title: '提示',
              content: res.message
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}
