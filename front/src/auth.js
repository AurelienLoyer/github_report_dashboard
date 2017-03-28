import router from './Router';
import env from 'env';

const auth = {

  authenticated: !!localStorage.getItem('token'),

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    this.authenticated = false
    router.go('/')
  },

  checkAuth() {
    var token = localStorage.getItem('token')
    if(token) {
      this.authenticated = true
    }
    else {
      this.authenticated = false
    }
    return !!token;
  },

  getToken() {
    return localStorage.getItem('token')
  },

  getMe() {
    return JSON.parse(localStorage.getItem('me'))
  },

  urlToken() {
    return '?token='+this.getToken()
  }

}

export default auth;
