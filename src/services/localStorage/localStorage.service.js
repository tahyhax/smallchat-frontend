https://small-chat-3842e.firebaseio.com// const LocalStorageService = (function(){
//   var _service;
//   function _getService() {
//       if(!_service) {
//         _service = this;
//         return _service
//     }
//     return _service
//   }
//   function _setToken(tokenObj) {
//     localStorage.setItem(‘access_token’, tokenObj.access_token);
//     localStorage.setItem(‘refresh_token’, tokenObj.refresh_token);
//   }
//   function _getAccessToken() {
//     return localStorage.getItem(‘access_token’);
//   }
//   function _getRefreshToken() {
//     return localStorage.getItem(‘refresh_token’);
//   }
//   function _clearToken() {
//     localStorage.removeItem(‘access_token’);
//     localStorage.removeItem(‘refresh_token’);
//   }
//  return {
//     getService : _getService,
//     setToken : _setToken,
//     getAccessToken : _getAccessToken,
//     getRefreshToken : _getRefreshToken,
//     clearToken : _clearToken
//   }
//  })();
//  export default LocalStorageService;
// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da

class LocalStorageService {
  constructor(storage) {
    this.storage = storage;
  }
  setToken(storageKey, storageValue) {
    this.storage.setItem(storageKey, storageValue);
  }
  getToken(storageKey) {
    return this.storage.getItem(storageKey);
  }
  clearToken(storageKey) {
    this.storage.removeItem(storageKey);
  }
}

const localStorageService = new LocalStorageService(localStorage);
export default localStorageService;
