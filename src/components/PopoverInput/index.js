import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Popover,
  Form,
  Input,
  Button
} from 'antd';
const FormItem = Form.Item;
@Form.create()
export default class PopoverInput extends Component {
	state = {
	  show:false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values.value);
        this.handleClose();
      }
    });
  };
  handleClose = () => {
    this.setState({
      show:false
    })
  };
  handleTogle = () => {
    this.setState({
      show:!this.state.show
    })
  };

	render() {
	  const { show } = this.state;
	  const { defaultValue,placeholder } = this.props;
    const { getFieldDecorator } = this.props.form;

    const EditContent =  (
      <Form onSubmit={this.handleSubmit}>
        <FormItem style={{ marginBottom: 8 }}>
          {getFieldDecorator('value', {
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
            initialValue:defaultValue || ''
          })(<Input placeholder={placeholder} />)}
        </FormItem>
        <FormItem style={{ marginBottom: 8 }}>
          <Button type="primary" size='small' htmlType="submit">
            保存
          </Button>
          <Button size='small' onClick={this.handleClose} style={{ marginLeft: 8 }}>取消</Button>
        </FormItem>
      </Form>
    )

		return (
			<Fragment>
        <Popover content={EditContent} visible={show} trigger="click" onVisibleChange={(show)=>this.setState({show})}>
          <span onClick={this.handleTogle}>
            {this.props.children}
          </span>
        </Popover>
			</Fragment>
		);
	}
}
