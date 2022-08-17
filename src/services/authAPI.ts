import axios from 'axios';
import { AuthData } from '../page/Auth'

class AuthAPI {
  testURL: string
  baseURL: string

  constructor() {
    this.testURL = 'http://localhost:8000'
    this.baseURL = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';
  }

  logIn(data: AuthData) {
    const response = axios.post(`${this.testURL}/auth/signin`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.data
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    })
    
    return response
  }

  signUp(data: AuthData) {
    const response = axios.post(`${this.testURL}/auth/signup`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.data
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    })
    
    return response;
  }
}

export default AuthAPI