import React, { Component } from 'react'
import './index.less'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils.js'
import storeUtils from '../../utils/storeUtils.js'
import  {reqweathe} from  '../../api'
import menuList from  '../../config/menuConfig.js'
import { Modal } from 'antd';
import LinkButton from '../link-button/index'

class header extends Component {

    state = {
        currentTime : formateDate( Date.now()), //当前时间的字符串格式
        dayPictureUrl : '',
        weather:'',
    }

    gettime = ()=>{
            //每隔一秒获取当前时间，并且更新状态数据currentTime
         this.intervalid =  setInterval(()=>{
            const currentTime = formateDate( Date.now())
            this.setState({
                currentTime
            })
          },1000)
    }   
    getweather=async ()=>{
        //调用接口请求函数
       const {dayPictureUrl,weather} =  await reqweathe('深圳')
       this.setState({dayPictureUrl,weather})
    }

    gettitle = ()=>{
        const path = this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if(item.key===path){ //如果当前item对象的key与path一样，
                title=item.title
            } else if(item.children){
                //在所有的子item中查找匹配的
              const citem=item.children.find(citem=>citem.key===path)
              if(citem){
                  title =citem.title
              }
            }
        })
        return title
    }

        //退出登陆
    logout = ()=>{
        //显示确认框
        Modal.confirm({
            content: '确定退出登陆？',
            onOk:()=>{
            //   console.log('OK');
            //清除保存的user数据
            storeUtils.removeuser()
            memoryUtils.user= {}
            //跳转到login
            this.props.history.replace('/login')
            }
          })
    }


    //在第一次render()之后执行一次
    //一般在此执行异步操作 发请求 启动定时器
    componentDidMount(){
        this.gettime()
        this.getweather()
        
    }
    //当前组件卸载之前调用
    componentWillUnmount(){
    //清除清时期
        clearInterval(this.intervalid)    
    }

    render() {
        const {currentTime,dayPictureUrl,weather} =this.state
        const username = memoryUtils.user.username
        //得到当前需要显示的titlte
        const title = this.gettitle()
        return (
            <div className='header'>
                <div className='header-top'>
                <span>欢迎,{username}</span>
                 <LinkButton onClick={this.logout} >
                     退出
                     </LinkButton>
                </div>
                <div className='header-buttom'>
                 <div className='header-buttom-left'>
                   {title}
                  </div> 
                 <div className='header-buttom-right'>
                <span>{currentTime}</span>
                <img src={dayPictureUrl} alt="weather"/>
                <span>{weather}</span>
                </div>     
                </div>
            </div>
        )
    }
}

export default withRouter(header)