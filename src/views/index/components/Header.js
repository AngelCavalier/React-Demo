import React, { Component } from "react";
//antd icon
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
//css
import "./aside.scss"
class LayoutHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed
        };
    }
    //生命周期，监听父级 props 的值变化
    componentWillReceiveProps({ collapsed }) {
        this.setState({
            collapsed: collapsed
        })
    }

    toggleMenu = () => {
        this.props.toggle();
    }
    render() {
        const { collapsed } = this.state
        return (
            <div className={collapsed ? "collapsed-close" : ""}>
                <h1 className="logo"><span>LOGO</span></h1>
                <div className="header-wrap">
                    <span className="collapsed-icon" onClick={this.toggleMenu}>{collapsed ? <MenuUnfoldOutlined /> : < MenuFoldOutlined />}
                    </span>
                </div>
            </div>
        );
    }
}

export default LayoutHeader;
