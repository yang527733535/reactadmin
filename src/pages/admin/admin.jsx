import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils.js'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd';
import Leftnav from '../../components/left-nav'
import Header from '../../components/header'

import Pie from '../chart/pie'
import Home from '../home/home.jsx'
import Category from '../category/category'
import Bar from '../chart/bar.jsx'
import Line from '../chart/line.jsx'
import Product from '../product/product.jsx'
import Role from '../role/role.jsx'
import User from '../user/user.jsx'

const { Footer, Sider, Content } = Layout;

//后台管理的路由组件
class Admin extends Component {

  render() {
    const user = memoryUtils.user
    //如果内存中没有user 说明当前没用登陆的用户
    if (!user || !user._id) {
      //自动跳转到登陆（在render中）
      return <Redirect to='/login'></Redirect>
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <Leftnav></Leftnav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin:20, backgroundColor: '#fff' }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} /> 
              <Route path='/product' component={Product} /> 
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              {/* <Route path='/charts/pie' component={Pie} /> */}
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>Copyright ™️ 2019 星尘游戏</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;