import React, { Component } from 'react'
import {
    Card, Icon, List, Button
} from 'antd'
import './product.less'
import { reqCategory } from '../../api/index'

//product的详情的子路由组件
const Item = List.Item


export default class Productdetail extends Component {

    state = {
        cName1: '',
        cName2: '',
    }

    async componentDidMount() {
        //得到当前商品的分类id
        const { pCategoryId, categoryId } = this.props.location.state.product
        const result = await reqCategory(pCategoryId)

        if (pCategoryId === '0') {    //一级分类下的商品 只要查询一个
            const result = await reqCategory(categoryId)
            console.log(result.data.name)
        } else {
            //这种发送请求的方式效率偏低 要等第一个开始响应之后才发送第二个请求
            //我们需要的效果是一次性发送多个请求 只有都成功了 才正常处理

            // const result1 = await reqCategory(pCategoryId)  //获取一级分类
            // const result2 = await reqCategory(categoryId)   //获取二级分类


            //一次性发送多个请求  只有都成功了 才正常处理
            const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            console.log(result)
            this.setState({
                cName1: result[0].data.name,
                cName2: result[1].data.name
            })
        }
    }

    render() {
        const { name, desc, price, detail, imgs } = this.props.location.state.product
        const { cName1, cName2 } = this.state
        const title = (
            <span>
                <Button onClick={() => this.props.history.goBack()}>
                    <Icon style={{ color: 'green', fontSize: 20, marginLeft: 5 }} type='arrow-left'></Icon>
                </Button>
                <span style={{ marginLeft: 10 }}>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类:</span>
                        <span>{cName1}--{cName2}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        alt='img'
                                        className='product-img'
                                        src={img}></img>
                                ))
                            }

                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}
