import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom"
//icon
import { UserOutlined } from '@ant-design/icons';
//antd
import { Menu } from "antd";
//路由
import Router from "../../router/index"
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //一级菜单
    //<Menu.Item key="0">控制台</Menu.Item>

    //子集菜单
    // <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
    //     <Menu.Item key="1">option1</Menu.Item>
    //     <Menu.Item key="2">option2</Menu.Item>
    //     <Menu.Item key="3">option3</Menu.Item>
    //     <Menu.Item key="4">option4</Menu.Item>
    // </SubMenu>

    //无子集菜单处理
    renderMenu = ({ title, key }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }
    //子集菜单处理
    renderSubMenu = ({ title, key, child }) => {
        return (
            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                    })
                }
            </SubMenu>
        )
    }

    render() {
        return (
            <Fragment>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                        })
                    }
                </Menu>
            </Fragment>

        );
    }
}

export default AsideMenu;
