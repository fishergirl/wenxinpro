import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Card,
  InputNumber,
  Radio,
  Spin,
  message
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getPageQuery } from '../../../utils/utils'
import styles from './style.less'
const FormItem = Form.Item;
const getTime = (date,time)=> {
  return moment(date).format('YYYY-MM-DD')+ ' ' + moment(time).format('HH:mm')
};

@connect(({ invite, loading }) => {
  return {
    invite,
    loading: loading.models.invite,
  };
})
@Form.create()
export default class Update extends Component {
  state = {
    id:getPageQuery().id,
    title:'新增推荐有奖'
  };

  componentDidMount() {
    if(this.state.id){
      this.props.dispatch({
        type:'invite/getInvite',
        payload:{
          id:this.state.id
        }
      });
      this.setState({title:'编辑推荐有奖'})
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type:'invite/clearInvite',
    })
  }
  _getPrizeJson = (values)=>{
    const { invite:{ invite } } = this.props;
    let PrizeJson;
    if(invite.signPrize && invite.orderPrize){
      PrizeJson = [
        {
          ...invite.signPrize,
          min:values.signPrizeMin,
          max:values.signPrizeMax
        },
        {
          ...invite.orderPrize,
          min:values.orderPrizeMin,
          max:values.orderPrizeMax
        }
      ]
    }else{
      PrizeJson = [
        {
          prizeStrategy:1,
          min:values.signPrizeMin,
          max:values.signPrizeMax
        },
        {
          prizeStrategy:2,
          min:values.orderPrizeMin,
          max:values.orderPrizeMax
        }
      ]
    }
    return JSON.stringify(PrizeJson)
  };
  handleSubmit = e => {
    const { form, dispatch, invite:{ invite } } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      let startTime = getTime(values.startDate,values.startTime);
      let endTime = getTime(values.endDate,values.endTime);
      if(new Date(startTime).getTime() > new Date(endTime).getTime()){
        message.error('开始时间不得大于结束时间');
        return;
      }

      if (!err) {
        dispatch({
          type: 'invite/saveInvite',
          payload: {
            id: invite.id,
            accountid: invite.accountid,
            name: values.name,
            reward: values.reward,
            startTime,
            endTime,
            minCash: values.minCash,
            cashFreq: 1,
            prizeJson: this._getPrizeJson(values),
            status: invite.status || 3,
          },
        });
      }
    });
  };

  render() {
    const { submitting, invite:{ invite }, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { title } = this.state;
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
    const Label = (label) => <span><span style={{color:'red'}}>*</span> {label}</span>;
    return (
      <PageHeaderLayout
        title={title}
      >
        <Card bordered={false} style={{minWidth:550}}>
          <Spin spinning={loading}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label={Label('活动名称')}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入活动名称',
                    },
                  ],
                  initialValue:invite.name,
                })(<Input style={{width:300}} placeholder="请输入活动名称" />)}
              </FormItem>
              <FormItem {...formItemLayout} label={Label("奖励金额")}>
                {getFieldDecorator('reward', {
                  rules: [
                    {
                      required: true,
                      message: '请输入奖励金额',
                    },
                  ],
                  initialValue:invite.reward,
                })(<InputNumber placeholder="请输入" />)}
                <span className="ant-form-text">元</span>
              </FormItem>
              <Row>
                <Col {...formItemLayout.labelCol} className={styles.label} style={{marginTop:8}}>
                  <span style={{color:'red'}}>*</span> 开始时间 :
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <Row style={{width:350}}>
                    <Col span={12}>
                      <FormItem >
                        {getFieldDecorator('startDate', {
                          rules: [
                            {
                              required: true,
                              message: '请选择开始时间',
                            },
                          ],
                          initialValue:invite.startTime ? moment(moment(new Date(invite.startTime) - (8 * 60 * 60 * 1000)).format('YYYY/MM/DD'),'YYYY/MM/DD'): null,
                        })(<DatePicker placeholder="开始日期" />)}
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <FormItem>
                        {getFieldDecorator('startTime', {
                          rules: [
                            {
                              required: true,
                              message: '请选择开始时间',
                            },
                          ],
                          initialValue:invite.startTime ? moment(moment(new Date(invite.startTime) - (8 * 60 * 60 * 1000)).format('HH:mm'), 'HH:mm') : null,
                        })(<TimePicker placeholder="开始时间"  format='HH:mm'  />)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col {...formItemLayout.labelCol} className={styles.label} style={{marginTop:8}}>
                  <span style={{color:'red'}}>*</span> 结束时间 :
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <Row style={{width:350}}>
                    <Col span={12}>
                      <FormItem >
                        {getFieldDecorator('endDate', {
                          rules: [
                            {
                              required: true,
                              message: '请选择结束日期',
                            },
                          ],
                          initialValue:invite.endTime ? moment(moment(new Date(invite.endTime) - (8 * 60 * 60 * 1000)).format('YYYY/MM/DD'),'YYYY/MM/DD'): null,
                        })(<DatePicker placeholder="结束日期" />)}
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <FormItem>
                        {getFieldDecorator('endTime', {
                          rules: [
                            {
                              required: true,
                              message: '请选择结束时间',
                            },
                          ],
                          initialValue:invite.endTime ? moment(moment(new Date(invite.endTime) - (8 * 60 * 60 * 1000)).format('HH:mm'), 'HH:mm') : null,
                        })(<TimePicker placeholder="结束时间" format='HH:mm'/>)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <FormItem {...formItemLayout} label={Label("奖励类型")}>
                <div>
                  {getFieldDecorator('prizeType', {
                    initialValue: '1',
                  })(
                    <Radio.Group>
                      <Radio value="1">现金红包</Radio>
                    </Radio.Group>
                  )}
                </div>
              </FormItem>
              <FormItem{...formItemLayout} label={Label("提现额度")}>
                {getFieldDecorator('minCash',{
                  rules: [
                    {
                      required: true,
                      message: '请输入提现额度',
                    },
                  ],
                  initialValue: invite.minCash,
                })(<InputNumber placeholder="请输入" min={0}/>)}
                <span className="ant-form-text">元起</span>
              </FormItem>
              <Row>
                <Col {...formItemLayout.labelCol} className={styles.label}>
                  <span style={{color:'red'}}>*</span> 奖励策略 :
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  1.推荐注册成功赠送红包
                  <FormItem className={styles.subFormItem} label="金额下限">
                    {getFieldDecorator('signPrizeMin',{
                      initialValue: invite.signPrize ? invite.signPrize.min : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入金额下限',
                        },
                      ],
                    })(<InputNumber placeholder="请输入" min={0}/>)}
                    <span className="ant-form-text">元</span>
                  </FormItem>
                  <FormItem className={styles.subFormItem} label="金额上限">
                    {getFieldDecorator('signPrizeMax',{
                      initialValue: invite.signPrize ? invite.signPrize.max : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入金额上限',
                        },
                      ],
                    })(<InputNumber placeholder="请输入" min={0}/>)}
                    <span className="ant-form-text">元</span>
                  </FormItem>
                  2.推荐首次下单成功赠送红包
                  <FormItem className={styles.subFormItem} label="金额下限">
                    {getFieldDecorator('orderPrizeMin',{
                      initialValue: invite.orderPrize ? invite.orderPrize.min : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入金额下限',
                        },
                      ],
                    })(<InputNumber placeholder="请输入" min={0}/>)}
                    <span className="ant-form-text">元</span>
                  </FormItem>
                  <FormItem className={styles.subFormItem} label="金额上限">
                    {getFieldDecorator('orderPrizeMax',{
                      initialValue: invite.orderPrize ? invite.orderPrize.max : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入金额上限',
                        },
                      ],
                    })(<InputNumber placeholder="请输入" min={0}/>)}
                    <span className="ant-form-text">元</span>
                  </FormItem>
                </Col>
              </Row>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button onClick={()=>this.props.dispatch(routerRedux.push('/idea/invite/list'))}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" loading={submitting} style={{ marginLeft: 24 }}>保存活动</Button>
              </FormItem>
            </Form>
          </Spin>

        </Card>
      </PageHeaderLayout>
    );
  }
}
