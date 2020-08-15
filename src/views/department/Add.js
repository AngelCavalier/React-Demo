import React from "react";
//antd
import { Form, Input, } from "antd"
class DepartmentAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (

            <Form>
                <Form.Item label="部门名称">
                    <Input />
                </Form.Item>
            </Form>

        );
    }
}

export default DepartmentAdd;
