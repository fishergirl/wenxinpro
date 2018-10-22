import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Button,
  Tabs,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ account, loading }) => {
  return{
    account,
    infoLoading: loading.effects['account/getAccountInfo'],
    saveLoading: loading.effects['account/saveAccount'],
    configLoading: loading.effects['account/getConfigInfo'],
  }
})
@Form.create()
export default class Analysis extends Component {

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

  handerChange = key => {
    this.props.dispatch({
      type:'account/tabChange',
      payload: key
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/saveAccount',
          payload: {
            accountJson:{
              userCode:'',
              ...values
            }
          }
        });
      }
    });
  };

  render() {
    const { account:{ account, tab, config }, infoLoading, saveLoading, configLoading } = this.props;
    const { getFieldDecorator } = this.props.form;

    //公众账号
    const accountCard = (
      <Card className={styles.accountInfo} loading={infoLoading}>
      <table>
        <tbody>
        <tr>
          <td className={styles.accountOpt}>公众账号名称：</td>
          <td className={styles.accountValue}>{account.accountName}</td>
        </tr>
        <tr>
          <td className={styles.accountOpt}>公众账号TOKEN：</td>
          <td className={styles.accountValue}>{account.token}</td>
        </tr>
        <tr>
          <td className={styles.accountOpt}>微信号：</td>
          <td className={styles.accountValue}>{account.accountNum}</td>
        </tr>
        <tr>
          <td className={styles.accountOpt}>原始号：</td>
          <td className={styles.accountValue}>{account.originalId}</td>
        </tr>
        <tr>
          <td className={styles.accountOpt}>公众账号appid：</td>
          <td className={styles.accountValue}>{account.appid}</td>
        </tr>
        <tr>
          <td className={styles.accountOpt}>公众号描述：</td>
          <td className={styles.accountValue}>{account.accountdesc}</td>
        </tr>
        </tbody>
      </table>
      </Card>);
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
    //修改公众账号
    const modifyCard = (
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
            <Button style={{ marginLeft: 8 }}>取消</Button>
          </FormItem>
        </Form>
      </Card>);

    //营销配置
    const number = (
      <FormItem className={styles.numberInput}>
        {getFieldDecorator('shakeRedpackLimit', {
          initialValue:config.shakeRedpackLimit
        })(<InputNumber placeholder="请输入" min={0} />)}
      </FormItem>
    );

    const configCard = (
      <Card bordered={false} loading={configLoading}>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem>
            {getFieldDecorator('limitCheck', {
              valuePropName: 'checked',
              initialValue:false
            })(<Checkbox> 摇一摇红包每人每日限领 {number} 次 </Checkbox>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('sp1', {
              valuePropName: 'checked',
              initialValue:false
            })(<Checkbox> 自动回复接入微信客服系统(开启后自动回复功能失效)</Checkbox>)}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={saveLoading}>
              保存
            </Button>
            <Button style={{ marginLeft: 8 }}>取消</Button>
          </FormItem>
        </Form>
      </Card>
    )
    return (
      <Fragment>
        <PageHeaderLayout title='微信配置中心'>
          <Card bordered={false}>
            <Tabs activeKey={tab} onChange={ this.handerChange }>
              <TabPane tab="公众账号" key="1">{accountCard}</TabPane>
              <TabPane tab="修改微信公众号" key="2">{modifyCard}</TabPane>
              <TabPane tab="营销配置" key="3">{configCard}</TabPane>
            </Tabs>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
