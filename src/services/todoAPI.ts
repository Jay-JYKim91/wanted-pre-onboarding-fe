// import { AuthData } from '../page/Auth'

import axios from 'axios';

class TodoAPI {
  baseURL: string
  testURL: string

  constructor() {
    this.testURL = 'http://localhost:8000'
    this.baseURL = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';
  }

  createTodo(todo: string, accessToken: string) {
    const response = axios.post(`${this.testURL}/todos`, { todo }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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

  getTodos(accessToken: string) {
    const response = axios.get(`${this.testURL}/todos`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
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

  updateTodo(data: {todo: string, isCompleted: boolean}, accessToken: string, id: number) {
    const response = axios.put(`${this.testURL}/todos/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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

  deleteTodo(id: number, accessToken: string) {
    const response = axios.delete(`${this.testURL}/todos/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(res => {
      console.log(res)
      return res.data
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    })
    
    return response
  }
}

export default TodoAPI