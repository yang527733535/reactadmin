import React, { Component } from 'react'
import {
    Form,
    Select,
    Input,
} from 'antd'
import propTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option
//添加分类的form组件
class Addfrom extends Component {

    static propTypes = {
        setform:propTypes.func.isRequired,      //用来传递form对象的函数
        categorys:propTypes.array.isRequired,   //一级分类的数组
        parentId:propTypes.string.isRequired    //父分类的id
    }


    componentWillMount(){
        this.props.setform(this.props.form)
    }

    render() {

        const {categorys,parentId} = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {getFieldDecorator('parentId', {
                        initialValue: parentId
                    })(
                        <Select>
                            <Option value='0'>一级分类</Option>
                            {
                               categorys.map(o=>
                                <Option value={o._id}>{o.name}</Option>
                               )
                            }
                        </Select>
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('categoryName', {
                        initialValue: '',
                        rules:[
                            {required:true,message:'分类消息必须输入'}
                        ],
                    })(
                        <Input placeholder='请输入分类消息' />
        )}

                </Item>

            </Form>
        )
    }
}

export default Form.create()(Addfrom)