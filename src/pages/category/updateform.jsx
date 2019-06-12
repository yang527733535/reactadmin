import React, { Component } from 'react'
import {
    Form,
    Select,
    Input,

} from 'antd'
import PropTypes from  'prop-types'
const Item = Form.Item
const Option = Select.Option
//添加分类的form组件
class Updatefrom extends Component {

    static propTypes = {
     catetoryName:PropTypes.string.isRequired,
     setform:PropTypes.func.isRequired
    }


    componentWillMount(){
        //讲form对象通过下面的方法传递给父组件
       this.props.setform(this.props.form)
    }

    render() {
        const {catetoryName} = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {getFieldDecorator('categoryName', {
                        initialValue: catetoryName
                    })(
                        <Input placeholder='请输入分类消息' />
                    )}

                </Item>

            </Form>
        )
    }
}

export default Form.create()(Updatefrom)