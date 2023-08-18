import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.191.67:3333',
})
