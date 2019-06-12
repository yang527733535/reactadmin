import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from  'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
class App extends Component {
   
    
    render() {
       return(
        <BrowserRouter>
        <Switch> {/* 这个SWITCH的作用是只匹配其中的一个 */}
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
        </Switch>
        </BrowserRouter>
       )
    }
}

export default App;