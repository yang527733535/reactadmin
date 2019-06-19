import React, { Component } from 'react'
//User路由
import LinkButton from  '../../components/link-button/index'
import { Card, message,Button, Table, Modal } from 'antd'
import {formateDate} from '../../utils/dateUtils.js'
import {requsers ,deleteuser } from '../../api/index'
export default class User extends Component {

    state = {
        users: [],//所有的用户列表
        isshow:false, //是否显示确认框
        roles:[], //所有角色的列表
        // isshowdele:false,
    }

    initColumns = ()=>{
        this.columns = [
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                 render:formateDate
            },
            {
                title:'所属角色',
                dataIndex:'role_id',

                render:(role_id)=>this.roleNames[role_id]
                // render:(role_id)=>this.state.roles.find(item=>item._id===role_id).name
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                    <LinkButton>修改</LinkButton>   
                    <LinkButton onClick={()=>this.deleteuser(user)}>删除</LinkButton>   
                    </span>
                )
            },
        ]
    }

    deleteuser = (user)=>{
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async()=> {
                const result = await deleteuser(user._id)
                if(result.status===0){
                    message.success('删除用户成功！')
                    this.getusers()
                }
            }
          })
    }

 //添加或者更新用户
 addorupdateuer = ()=>{

 }


 //根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
 initRoleNames = (roles)=>{

    const roleNames = roles.reduce((pre,role)=>{
        pre[role._id] = pre.name
        return pre
    },{})

     //baocun
     this.roleNames =roleNames

 }

 getusers = async()=>{
    const result = await requsers()
    if(result.status===0){
        const {users,roles} = result.data
        this.initRoleNames(roles)
        this.setState({
            users,
            roles
        })
    }
 }

    componentWillMount(){
        this.initColumns()
    }

  componentDidMount(){
        this.getusers()
  }

    render() {
        const title = <Button onClick={()=>{this.setState({isshow:true})}} type='primary'>创建用户</Button>
        const { users,isshow } = this.state
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="users._id"
                    dataSource={users}
                    columns={this.columns}
                    // loading={loading}
                />
                <Modal
                    title="添加用户"
                    visible={isshow}
                    onOk={this.addorupdateuer}
                    onCancel={()=>this.setState({isshow:false})}
                ></Modal>

                <div> 添加/更新界面</div>
            </Card>
        )
    }
}
