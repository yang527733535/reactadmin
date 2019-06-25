import React, { Component } from 'react'
//首页路由
import { Switch,Route,Redirect}  from 'react-router-dom'
  
import Producthome from './home.jsx'
import ProductAddupdate from './add-update.jsx'
import Productdetail from './detail.jsx'



export default class Product extends Component {
    render() {
        return (
         <Switch>
             {/* exact路径完全匹配 */}
             <Route exact path='/product' component={Producthome} />
             <Route path='/product/addandupdate' component={ProductAddupdate} />
             <Route path='/product/detail' component={Productdetail} />
             <Redirect to='/product' />
         </Switch>
        )
    }
}
