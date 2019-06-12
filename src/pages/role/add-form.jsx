import React, { Component } from 'react'
import {
    Form,
    Select,
    Input,

} from 'antd'
import PropTypes from  'prop-types'
const Item = Form.Item
//添加分类的form组件
class Addform extends Component {
    static propTypes = {
     setform:PropTypes.func.isRequired
    }


    componentWillMount(){
        //讲form对象通过下面的方法传递给父组件
       this.props.setform(this.props.form)
    }

    render() {
        const formItemLayout = {
            labelCol:{span:4},//左侧label的宽度
            wrapperCol:{span:15}, //右侧包裹的宽度
        }

        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item label='角色名称' {...formItemLayout}>
                    {getFieldDecorator('roleName', {
                        initialValue: '',
                        rules:[
                          {required:true,message:"角色名必须输入"}
                        ]
                    })(
                        <Input placeholder='请输入角色名称' />
                    )}
                </Item>

            </Form>
        )
    }
}

export default Form.create()(Addform)