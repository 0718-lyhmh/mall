import axios from 'axios'

export function request(config){
  const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/w6',
      timeout: 5000
    })

  //拦截器的使用
  instance.interceptors.request.use(config => {
    return config
  },err =>{
    console.log(err)
  })
  instance.interceptors.response.use(res =>{
    return res.data
  }, err =>{
    console.log(err)
  })

  return instance(config)  //返回的就是一个promise，所以没必要new一个promise
}
