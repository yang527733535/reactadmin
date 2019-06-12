//包含应用中所有接口请求函数的模块
//每个函数的返回值都是promise对象
//要求：能根据接口文档定义接口请求函数
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
//login

// export function reqlogin(username,password){
//   return ajax('/login',{username,password},'POST')
// }
//上面那个函数可以写成箭头函数的方式
    //在外层包一个自己创建的promise对象
    //在请求出错是，不去reject 而是显示错误提示
//1.login

const BASE = ''


export const reqlogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')

//2.adduser
export const reqadduser=(user)=>ajax(BASE+'/manage/user/add',user,'POST')


//jsonp请求的接口请求函数
export const reqweathe = (city)=>{

    return new Promise((resolve,reject)=>{

        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        // 发送jsonp请求
       jsonp(url,{},(err,data)=>{
           console.log('jsonp()',err,data)
           //如果成功了
           if(!err&&data.status==='success'){
            const {dayPictureUrl,weather}= data.results[0].weather_data[0]
            resolve({dayPictureUrl,weather})
           } else{
               //如果失败了
               message.error('获取天气失败')
           }
       })
    })
}

// reqweathe('北京')



//category的接口
//1获取一级和二级分类的列表
export const reqcategorys = (parentId)=>ajax(BASE+'/manage/category/list',{parentId})
//这里补充一下 为什么这里不写post就默认了是get方式 因为底层给了一个形参默认值type='GET'
//2添加分类
export const reqaddcategorys = (parentId,categoryName)=>ajax(BASE+'/manage/category/add',{parentId,categoryName},'POST')

//3更新分类
export const requpdatecategorys = ({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')


//获取所有角色的列表
export const reqroles = () =>ajax(BASE+'/manage/role/list')
 
//添加角色
export const reqaddroles = (roleName) =>ajax(BASE+'/manage/role/add',{roleName},'POST')
 
//更新角色权限 这里的role是个对象
export const requpdaterole = (role) =>ajax(BASE+'/manage/role/update',role,'POST')