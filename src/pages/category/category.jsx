import React, { Component } from 'react'
import {
  Card,
  Table,
  Icon,
  Button,
  message,
  Modal
} from 'antd'
import Addfrom from './addfrom'
import Updatefrom from './updateform'
import LinkButton from '../../components/link-button'
//Category路由
import { reqcategorys ,reqaddcategorys,requpdatecategorys } from '../../api/index'

export default class Category extends Component {

  state = {
    categorys: [],//一级分类列表
    loading: false,  //是否正在获取数据中
    parentId: '0',  //当前需要显示的分类列表的parentId
    parentName: '', //当前需要显示的分类列表的父分类名称
    subcategorys: [], //二级分类列表
    showStatus: 0,//标识添加/更新的确认框是否显示 0:都不显示 1:显示添加 2:显示更新
  }


  //初始化table所有列的数组
  initcolumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', //显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (category) =>   //返回需要显示的标签
          (<span>
            <LinkButton onClick={()=>{this.showupdatemodel(category)}}>修改分类</LinkButton>
            {/* 如何向事件回掉函数传递参数  就是下面那个方法 先定义箭头函数，在函数中调用处理的函数 并传入参数*/}
            {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }} >查看子分类</LinkButton> : null}
          </span>)
      },
    ];
  }

  //更新为显示一级列表的状态
  showfirstcategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subcategorys: []
    })
  }

  showupdatemodel = (category) => {

    //保存分类对象
    this.category = category
    console.log(category)
    //更新状态
    this.setState({
      showStatus: 2
    })
  }

  // 显示指定一级分类对象的二级列表
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    },
      //获取二级分类列表
      //setstate()不能立即回去最新的状态 因为setstate()是异步更新的
      () => {  //在状态更新且重新render后执行
        console.log(this.state.parentId)
        this.getcategory()
      })


  }

  //异步获取一级分类列表展示
  getcategory = async () => {
    //在发请求前，显示loading
    this.setState({
      loading: true
    })


    //发送ajax请求  获取数据
    const { parentId } = this.state
    const result = await reqcategorys(parentId)
    if (result.status === 0) {

      //取出分类数组（可能是一级的，也可能是二级的）
      const categorys = result.data
      // 这是更新一级分类的
      if (parentId === '0') {
        // 这是更新一级分类的
        this.setState({ loading: false, categorys })
      } else {
        this.setState({
          subcategorys: categorys,
          loading: false
        })
      }

    } else {
      message.error('获取列表失败')
    }
  }

  //显示添加的确认框
  showmodel = () => {
    this.setState({
      showStatus: 1
    })
  }

  //modal点击取消
  handleCancel = () => {
 //清除输入数据
 this.form.resetFields()
 //隐藏确定框
    this.setState({
      showStatus: 0
    })
  }

  //添加分类

  addcategory = () => {
    console.log('addcategory()')
  }

  //更新分类
  updatecategory = async() => {
    //1.隐藏确定框
    this.setState({
      showStatus: 0
    })

 //2.发送更新请求
 //准备参数数据
 const categoryId=  this.category._id
 const categoryName = this.form.getFieldValue('categoryName')

 //清楚输入数据
 this.form.resetFields()
 const result = await requpdatecategorys({categoryId,categoryName})
  if(result.status===0){
  //3.重新显示列表
  this.getcategory()
   }
  }


  //为第一次render()准备数据
  componentWillMount() {
    this.initcolumns()
  }


  //发送异步ajax请求 执行异步请求
  componentDidMount() {
    this.getcategory()
  }

  render() {

    //读取状态数据
    const { categorys, showStatus, subcategorys, loading, parentId, parentName } = this.state
 
    //读取指定的分类
    const catetory =this.category ||{}  //如果还没有 指定一个空对象

    //card的zuo侧标题
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showfirstcategorys} >一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>

    )
    //card的额外信息
    const extra = (
      <Button onClick={this.showmodel} type='primary'>
        <Icon type='plus'></Icon>
        添加
            </Button>
    )
    return (
      <Card title={title} extra={extra} style={{ width: '100%' }}>
        <Table
          bordered
          rowKey="_id"
          dataSource={parentId === '0' ? categorys : subcategorys}
          columns={this.columns}
          loading={loading}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addcategory}
          onCancel={this.handleCancel}
        >
          <Addfrom></Addfrom>
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updatecategory}
          onCancel={this.handleCancel}
        >
          <Updatefrom  
          setform={(form)=>{this.form=form}} 
          catetoryName={catetory.name}>
          </Updatefrom>
        </Modal>
      </Card>
    )
  }
}
