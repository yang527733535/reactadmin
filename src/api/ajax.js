//能够发送ajax的模块
//封装axios
//函数的返回值是promise对象
//1.优化：统一处理请求异常
//2.优化：异步的得到的respond 而是respond的data 在请求成功后resloce时

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){

    return new Promise((resolve,reject)=>{
        //1.执行异步ajax请求
        let promise
        if(type==='GET'){  //发送get请求
            promise= axios.get(url,{ //这是一个配置对象 用来传送get的参数
                params:data
            })
            }  else{
                promise= axios.post(url,data)
            }
        //2，如果成功了，调用resolve
        promise.then(response=>{
            resolve(response.data)
         //3，如果失败了，不调用reject，而是显示异常信息        
        }).catch(error=>{
            message.error('请求出错了'+error.message)
        })
    })

    
}


//请求登陆的接口 
// ajax('/login',{username:'tom',password:'123'},'POST').then()
// //添加用户
// ajax('/manage/user/add',{username:'tom',password:'123',phone:'123123123213'},'POST').then()