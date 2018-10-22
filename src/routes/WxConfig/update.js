import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Icon,
  Card,
  Button,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Tooltip
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less'
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ account, loading }) => {
  return{
    account,
    saveLoading: loading.effects['account/saveAccount'],
  }
})
@Form.create()
export default class AccountUpdate extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'account/getAccountInfo',
      payload: {
        userCode:'FD68C372E46469B48193EB9124109E6E'
      }
    });
  }

  componentWillUnmount() {

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/saveAccount',
          payload: values
        });
      }
    });
  };

  render() {
    const { account:{ account }, saveLoading, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Fragment>
        <PageHeaderLayout title="修改公众账号">
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="公众账号名称：">
                {getFieldDecorator('accountName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入公众账号名称',
                    },
                  ],
                  initialValue:account.accountName
                })(<Input placeholder="请输入公众账号名称" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="公众账号TOKEN：">
                {getFieldDecorator('token', {
                  rules: [
                    {
                      required: true,
                      message: '请输入公众账号TOKEN',
                    },
                  ],
                  initialValue:account.token
                })(<Input placeholder="请输入公众账号TOKEN" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="微信号：">
                {getFieldDecorator('accountNum', {
                  rules: [
                    {
                      required: true,
                      message: '请输入微信号',
                    },
                  ],
                  initialValue:account.accountNum
                })(<Input placeholder="请输入微信号" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="原始ID：">
                {getFieldDecorator('originalId', {
                  rules: [
                    {
                      required: true,
                      message: '请输入原始ID',
                    },
                  ],
                  initialValue:account.originalId
                })(<Input placeholder="请输入原始ID" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="appid：">
                {getFieldDecorator('appid', {
                  rules: [
                    {
                      required: true,
                      message: '请输入appid',
                    },
                  ],
                  initialValue:account.appid
                })(<Input placeholder="请输入appid" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="appsecret：">
                {getFieldDecorator('appsecret', {
                  rules: [
                    {
                      required: true,
                      message: '请输入appsecret',
                    },
                  ],
                  initialValue:account.appsecret
                })(<Input placeholder="请输入appsecret" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="EncodingAESKey：">
                {getFieldDecorator('EncodingAESKey', {
                  rules: [
                    {
                      required: true,
                      message: '请输入EncodingAESKey',
                    },
                  ],
                  initialValue:account.EncodingAESKey
                })(<Input placeholder="请输入EncodingAESKey" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="公众账号描述">
                {getFieldDecorator('accountdesc', {
                  rules: [
                    {
                      required: true,
                      message: '请输入公众账号描述',
                    },
                  ],
                  initialValue:account.accountdesc
                })(
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder="请输入公众账号描述"
                    rows={4}
                  />
                )}
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={saveLoading}>
                  保存
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={()=>dispatch(routerRedux.push('/wxConfig/account/info'))}>取消</Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
