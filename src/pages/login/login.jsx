import React, { Component } from 'react';
import './login.less'
import logo from './images/logo.png'
import { Form, Icon, Input, Button } from 'antd';
//登录的路由组件
class Login extends Component {

    handleSubmit=(event)=>{
        
        //阻止事件的默认行为
        event.preventDefault()

        //对所有表单的字段进行验证
        this.props.form.validateFields((err, values) => {
            // 检验成功
            if (!err) {
             console.log('提交登陆的ajax请求',values)
            } else{
             console.log('failed')
            }
          });

        //得到from对象
        // const form = this.props.form
        // const values= form.getFieldsValue()
        // console.log('handleSubmit()', values)
    }
    //对密码进行自定义验证

    validatorPWD=(rule, value, callback)=>{
        console.log('validatorPWD()',rule,value)
        if(!value){
            callback('密码必须输入')
        }  else if(value.length<4){
            callback('密码长度不能小于4') 
        }   else if(value.length>12){
            callback("密码长度不能da于12") 
        }   else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("必须是英文数字或者下划线")    
        } else{
            callback() //验证pass
        }

        
        // callback('xxx') //验证失败，提示响应的值    
    }

    render() {

        //得到具有强大功能的form对象
        const from = this.props.from
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
            <header className='login-header'>  
                <img src={logo} alt="logo"/>
                <h1>
                   后台管理项目 
                </h1>
             </header>
            <section className='login-container'>
             <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
            {
                getFieldDecorator('username',{ //配置对象 属性名字是一些特定制的名称
                    // 声明式验证 ：直接使用别人写好的验证规则来进行验证
                rules: [
                    { required: true, whitespace:true,  message: '用户名必须输入' },
                    { min: 4, message: '用户名必须大于4位' },
                    { max: 12, message: '用户名必须小于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/,message:'必须是英文数字或者下划线'}
                ],
                })
                (
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              />
                 )
            }
        </Form.Item>
        <Form.Item>
       {
           getFieldDecorator('password',{
               rules:[
                {
                    validator:this.validatorPWD
                    
                }
               ]
           })(
            <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />
           )
           }
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
          </Button>
        </Form.Item>
      </Form>
            </section>
            </div>
        );
    }
}


// 前台表单验证

// 表单数据的收集


/*
1.高阶函数
 // 1.一类特别的函数
    // 1.1 接受函数类型的参数
    // 1.2 返回值是函数 

    //2.1 定时器:settimeout() setinterval()
    //2.2 promise : promise(()=>{}) then(value=>{},reason=>{})
    //2.3 数组遍历相关的方法:foreach()/filter()/map()/reduce()/find()/findindex()
    //2.4 函数对象bind方法
    //2.5 Form.create()/getFieldDecorator()()
    //3 高阶函数更新动态,更加具有扩展性
2.高阶组件
  //1本质就是一个函数
  //2接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会给被包装组件传递新的属性
  //3 作用：扩展组件的功能
*/


//包装form组件 生成一个新的组件 Form(Login)
//新组件会向form组件传递一个强大的对象属性：form 这样这个组件就多了很多方法
const WrapLogin  = Form.create()(Login)

export default WrapLogin;