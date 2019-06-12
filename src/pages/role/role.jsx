import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
//Category路由
import Addform from './add-form'
import Authform from './auth-form'
import memoryUtils from '../../utils/memoryUtils.js'
import { reqroles, reqaddroles ,requpdaterole} from '../../api/index'
import { formateDate} from '../../utils/dateUtils'

export default class Category extends Component {

    state = {
        roles: [],//所有角色的列表
        role: {},//选中的role
        isshowadd: false, //是否显示添加界面
        isshowAuth:false, //是否显示权限界面
    }

    constructor(props){
        super(props)
        this.auth = React.createRef()
    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                });
            }
        };
    };
   
    getroles = async () => {
        const result = await reqroles()
        if (result.status === 0) {
            // console.log(result.status)
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render:(create_time) => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:(auth_time) => formateDate(auth_time)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }
        ]
    }
    //添加角色
    addrole = () => {
        //进行表单验证 只有通过了才向下处理

        this.form.validateFields(async (error, values) => {
            if (!error) {
                //隐藏确认框架
                this.setState({
                    isshowadd: false
                })
                const { roleName } = values
                this.form.resetFields()
                console.log(roleName)
                //收集输入的数据

                //请求添加
                const result = await reqaddroles(roleName)
                //根据结果提示 更新列表显示
                if (result.status === 0) {
                    message.success('添加角色成功')
                    // this.getroles()
                    // 新产生的角色
                    const role = result.data

                    // const roles = [...this.state.roles]
                    // roles.push(role)
                    // this.setState({
                    //     roles  
                    // })

                    //更新roles状态，是基于原本状态数据更新
                    this.setState((state, props) => ({
                        roles: [...state.roles, role]
                    }))

                } else {
                    message.success('添加角色失败')
                }
            }
        })
    }

    //更新角色
    updaterole = async()=>{

        //隐藏确认框架
        this.setState({
        isshowAuth: false
        })

      const role = this.state.role
      //得到最新的menus
      const menus = this.auth.current.getMenus()
    //   const menus = this.setrolemenus
      role.menus = menus
      role.auth_time =   Date.now()
      role.auth_name = memoryUtils.user.username
      //请求更新
       const result = await requpdaterole(role)
       if(result.status===0){
           message.success('设置角色权限成功')
        //    this.getroles()

        this.setState({
            roles:[...this.state.roles]
        })
       }else{
       
       }
    }

    componentDidMount() {
        // this.initColumn()
        this.getroles()
    }
    componentWillMount() {
        this.initColumn()
        // this.getroles()
    }

    render() {

        const { roles, role, isshowadd,isshowAuth } = this.state

        const title = (
            <span>
                <Button onClick={() => { this.setState({ isshowadd: true }) }} type='primary'>创建角色</Button> &nbsp;&nbsp;&nbsp;
              <Button onClick={() => { this.setState({ isshowAuth: true }) }} type='primary' disabled={!role._id}>设置角色的权限</Button>
            </span>
        )
        return (

            <Card title={title} >
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                    onRow={this.onRow}
                ></Table>

                <Modal
                    title="添加角色"
                    visible={isshowadd}
                    onOk={this.addrole}
                    onCancel={() => {
                        this.setState({ isshowadd: false })
                        this.form.resetFields()
                    }}
                >
                    <Addform
                        setform={(form) => { this.form = form }}>
                    </Addform>
                </Modal>

                <Modal
                    title="设置角色的权限"
                    visible={isshowAuth}
                    onOk={this.updaterole}
                    onCancel={() => {
                        this.setState({ isshowAuth: false })

                    }}
                >   
                    {/* setrolemenus={(setrolemenus)=>{this.setrolemenus=setrolemenus}}         */}
                    <Authform ref={this.auth}  role={role}> </Authform>
                </Modal>
            </Card>
        )
    }
}
