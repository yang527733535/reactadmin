import React, { Component } from 'react'
import {
    Form,
    Select,
    Input,
    Tree
} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig.js'
const Item = Form.Item
const { TreeNode } = Tree;
//添加分类的form组件

export default class Authform extends Component {

    static propTypes = {
        role: PropTypes.object,
        setrolemenus: PropTypes.func.isRequired
    }

    state = {
        checkedKeys: []
    }
    constructor(props) {
        super(props)
        //根据传入的角色的menus生成初始状态
        const { menus } = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    //选中某个node时的回调
    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys })
    }


    //为父组件提交最新的menus数据
    getMenus = () => this.state.checkedKeys





    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
    }

    componentDidMount() {
        //为父组件提交最新的menus数据
        // this.props.setrolemenus(this.state.checkedKeys)
    }

    //根据新传入的role来更新checkedKeys状态
    //当组件接收到了新的属性时自动调用 是在render之前调用的
    componentWillReceiveProps(nextProps) {

        const menus = nextProps.role.menus
        console.log('componentWillReceiveProps()', nextProps)
        this.setState({
            checkedKeys: menus
        })
    }


    render() {
        console.log('auth render()')
        const { role } = this.props
        const { checkedKeys } = this.state
        const formItemLayout = {
            labelCol: { span: 4 },//左侧label的宽度
            wrapperCol: { span: 15 }, //右侧包裹的宽度
        }
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    <Input value={role.name} disabled />
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNodes}

                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
