import React, { Component } from 'react'
import './index.less'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
const { SubMenu }  = Menu;

 class leftnav extends Component {


  //根据menu的数据数组生成对应的标签数组
  //使用map（）加上递归调用
  getMenuNodes_map = (menuList)=> {
    return menuList.map(item=>{
     if(!item.children){
         return (
          <Menu.Item key={item.key}>
          <Link to={item.key}>  
          <Icon type={item.icon} />
         <span>{item.title}</span>
          </Link>      
         </Menu.Item>
         )
     } else {
       return(
        <SubMenu
        key={item.key}
        title={
          <span>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </span>
        }
      >
        { this.getMenuNodes(item.children)}    
      </SubMenu>
       )
     }
    })
  }

  //根据menu的数据数组生成对应的标签数组
  //使用reduce（）加上递归调用
  getMenuNodes =(menuList)=>{

    const path = this.props.location.pathname
      //第二个参数是初始值
    return menuList.reduce((pre,item)=>{

 //向pre中添加<Menu.Item>
 if(!item.children){
  pre.push((
    <Menu.Item key={item.key}>
    <Link to={item.key}>  
    <Icon type={item.icon} />
   <span>{item.title}</span>
    </Link>      
   </Menu.Item>
  ))
 } else{
  //向pre中添加<SubMenu>
  //查找一个与当前请求路径匹配的子item
  const cItem = item.children.find(cItem =>cItem.key===path)
  //如果存在，说明当前item所对应的子列表需要展开
  if(cItem) {
    this.openKey = item.key
  }
 
    pre.push((
      <SubMenu
      key={item.key}
      title={
        <span>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </span>
      }
    >
      { this.getMenuNodes(item.children)}
    </SubMenu>
    ))
 }
    return pre
    },[])
  
   
  }


  //在第一次render（）之前执行一次
  //为第一次render()准备数据 同步的准备
componentWillMount(){
   this.menunode=this.getMenuNodes(menuList)
}

    render() {
      //得到当前请求的路由路径
    // debugger
 const path = this.props.location.pathname
 console.log('render()',path)

 //得到需要打开菜单项的key
 const openKey=this.openKey
      


        return (
            <div  className='left-nav'>
               <Link to='/home' className='left-nav-header'>
                <img src={logo} alt='logo'></img>
                <h1> AVG DATA </h1>     
               </Link>
          <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
          >
          { 
          this.menunode
          }
         </Menu> 
            </div>  
        )
    }
}


//withrouter高阶组件
//包装非路由组件，返回一个新的组件
//新的组件向非路由组件传递3个属性：history/location/match
export default withRouter(leftnav)