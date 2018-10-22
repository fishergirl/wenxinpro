import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Table,
  Divider,
  Form,
  Input,
  Button,
  DatePicker
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(({ chart, loading }) => {
  return {
    chart,
    loading: loading.effects['chart/fetch'],
  };
})
@Form.create()
export default class ScanCount extends Component {
  static contextTypes = {
    location:PropTypes.object
  };
  state = {
    title:''
  };

  componentDidMount() {
    const { location:{ pathname } } = this.context;
    let { title } = this.state;
    if( pathname === '/qrcode/scanCount'){
      title = '扫码统计'
    }else if( pathname === '/qrcode/scanSubCount' ){
      title = '扫码关注统计'
    }
    this.setState({title})
  }

  componentWillUnmount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { title } = this.state;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="ant-dropdown-link">
          More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];

    return (
      <Fragment>
        <PageHeaderLayout title={title}>
          <Card style={{minWidth:1080}}>
            <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:20}}>
              <FormItem
                label="二维码名称"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="场景值"
              >
                {getFieldDecorator('cc', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="时间"
              >
                {getFieldDecorator('times',  {
                  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                })(
                  <RangePicker />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  查询
                </Button>
              </FormItem>
            </Form>
            <Table columns={columns} dataSource={data} />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
