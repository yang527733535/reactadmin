import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import  'antd/dist/antd.css'
import storeUtils from  './utils/storeUtils.js'
import memoryUtils from './utils/memoryUtils.js'
//读取local中保存的user，保存到内存中

const user=storeUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
    <App></App>,document.getElementById('root')
)

