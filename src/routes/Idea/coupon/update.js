import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { getPageQuery, format } from '../../../utils/utils'
import { getTreeData } from '../../../utils/jsonTree'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Radio,
  Button,
  DatePicker,
  Checkbox,
  InputNumber,
  message,
  Modal,
  Tree,
  Icon
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './style.less'
const FormItem = Form.Item;
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;

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
const radioStyle = {
  display: 'block',
  height: '40px',
  lineHeight: '40px',
};

@connect(({ coupon, loading }) => {
  return {
    coupon,
    loading: loading.effects['coupon/SaveGgkData'],
  };
})
@Form.create()
export default class CouponUpdate extends Component {
  state = {
    visible:false,
    choice:[],
  };

  componentDidMount() {
    const { dispatch,  } = this.props;
    const cid = getPageQuery().cid;
    console.log(getPageQuery())
    dispatch({
      type:"coupon/getIdeaSelectOrg"
    }).then(()=>{
      console.log(1)
      if(cid){
        dispatch({
          type:'coupon/getCouponItem',
          payload:{ cid }
        })
      }
    })
  }

  componentWillUnmount() {

  }
  showModal = () => {
    const { coupon:{ hasChoice }} = this.props;
    this.setState({
      visible: true,
      choice: hasChoice,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.dispatch({
      type:'coupon/changeState',
      payload:{
        hasChoice:this.state.choice
      }
    })
  };

  handleCancel = (e) => {
    const { coupon:{ hasChoice }} = this.props;
    this.setState({
      visible: false,
      choice: hasChoice,
    });
  };

  handleSubmit = e => {
    const { validateFields, setFields } = this.props.form;
    e.preventDefault();
    validateFields((err, values) => {
      if(!values.issuanceCheck && !values.issuance){
       setFields({
         issuance: {
            errors: [new Error('请输入发放总量')],
          },
        });
      }
      if(!values.getLimitCheck && !values.getLimit){
        setFields({
          getLimit: {
            errors: [new Error('请输入每人限领')],
          },
        });
      }
      if(values.residentIntegralCheck && !values.residentIntegral){
        setFields({
          residentIntegral: {
            errors: [new Error('请输入')],
          },
        });
      }
      if(values.businessIntegralCheck && !values.businessIntegral){
        setFields({
          businessIntegral: {
            errors: [new Error('请输入')],
          },
        });
      }
      if(values.industryIntegralCheck && !values.industryIntegral){
        setFields({
          industryIntegral: {
            errors: [new Error('请输入')],
          },
        });
      }
      console.log(err,values)
      // if (!err) {
      //   this.props.dispatch({
      //     type: 'ggk/SaveGgkData',
      //     payload: values,
      //   });
      // }
    });
  };
  onCheck = (checkedKeys,info) => {
    this.setState({choice:info.checkedNodes.map(item=>item.props.dataRef)})
  };

  renderIntegral(){
    const { coupon:{ couponItem, hasChoice } } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    return (
      <Fragment>
        <Row>
          <Col {...submitFormLayout.wrapperCol} className={styles.transfrom}>
            <div className={styles.inline}>
              {getFieldDecorator('residentIntegralCheck')(<Checkbox onChange={e=>{if(!e.target.checked)setFieldsValue({residentIntegral:''})}} >居民用户兑换所需积分 :</Checkbox>)}
            </div>
            <FormItem className={styles.check}>
              {getFieldDecorator('residentIntegral', {
                initialValue:couponItem.residentIntegral
              })(<InputNumber placeholder="请输入" disabled={!getFieldValue('residentIntegralCheck')} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...submitFormLayout.wrapperCol} className={styles.transfrom}>
            <div className={styles.inline}>
              {getFieldDecorator('businessIntegralCheck')(<Checkbox onChange={e=>{if(!e.target.checked)setFieldsValue({businessIntegral:''})}} >商业用户兑换所需积分 :</Checkbox>)}
            </div>
            <FormItem className={styles.check}>
              {getFieldDecorator('businessIntegral', {
                initialValue:couponItem.businessIntegral
              })(<InputNumber placeholder="请输入" disabled={!getFieldValue('businessIntegralCheck')} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...submitFormLayout.wrapperCol} className={styles.transfrom}>
            <div className={styles.inline}>
              {getFieldDecorator('industryIntegralCheck')(<Checkbox onChange={e=>{if(!e.target.checked)setFieldsValue({industryIntegral:''})}} >工业用户兑换所需积分 :</Checkbox>)}
            </div>
            <FormItem className={styles.check}>
              {getFieldDecorator('industryIntegral', {
                initialValue:couponItem.industryIntegral
              })(<InputNumber placeholder="请输入" disabled={!getFieldValue('industryIntegralCheck')} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...submitFormLayout.wrapperCol} className={styles.transfrom}>
            <p><span className='red'>*</span> 兑换适用机构范围</p>
            <div className={styles.add_box}>
              <span className={styles.add_box_left}>
                {hasChoice.map(item=>item.orgName).join(',')}
              </span>
              <Icon className='right' type="plus-square-o" onClick={this.showModal}/>
            </div>
            {/*隐藏的输入框只是为了让这里有验证错误提示*/}
            <FormItem className={styles.check}>
              {getFieldDecorator('choice')(<Input style={{display:'none'}}/>)}
            </FormItem>
          </Col>
        </Row>
      </Fragment>
    )
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.orgName} key={item.orgId + ''} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.orgName} key={item.orgId + ''} dataRef={item} />;
    });
  };
  renderModal (){
    const { coupon:{ mechanismList } } = this.props;
    const { choice } = this.state;
    const Subtitle = (
      <div>
        <span>已选（{choice.length}个机构）</span>
        <Button className='right' onClick={()=>this.setState({choice:[]})} >清空</Button>
      </div>
    );
    let list = getTreeData(mechanismList);
    return(
      <Modal
        title="选择机构"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Card title={Subtitle}>
          <Tree
            className={styles.tree_box}
            checkable
            checkedKeys={choice.map(item=>item.orgId+'')}
            defaultExpandedKeys={list.map(item=>item.orgId + '')}
            onCheck={this.onCheck}
          >
            {this.renderTreeNodes(list)}
          </Tree>
        </Card>
      </Modal>
    )
  };
  render() {
    const { coupon:{ couponItem }, loading, dispatch } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;

    const Label = (label) => <span><span style={{color:'red'}}>*</span> {label}</span>;
    return (
      <PageHeaderLayout title='编辑优惠卷'>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Card bordered={false} style={{minWidth:900}}>
            <Card bordered={false} className={styles.updateBox}  title='优惠券基础配置'>
              <FormItem {...formItemLayout} label={Label("优惠卷名称")}>
                {getFieldDecorator('cname', {
                  rules: [
                    {
                      required: true,
                      message: '请输入活动名称，最多不超过10个字',
                      max:10
                    },
                  ],
                  initialValue:couponItem.cname
                })(<Input style={{width:250}} placeholder="最多不超过10个字" />)}
              </FormItem>
              <FormItem {...formItemLayout} label={Label("优惠卷类型")}>
                <div>
                  {getFieldDecorator('ctype', {
                    rules: [
                      {
                        required: true,
                        message: '请选择优惠卷类型',
                      },
                    ],
                    initialValue: "1",
                  })(
                    <Radio.Group>
                      <Radio value="1">优惠卷</Radio>
                    </Radio.Group>
                  )}
                </div>
              </FormItem>
              <FormItem {...formItemLayout} label={Label("生效时间")}>
                {getFieldDecorator('sTime', {
                  rules: [
                    {
                      required: true,
                      message: '请选择生效时间',
                    },
                  ],
                  initialValue:couponItem.sTime ? format(couponItem.sTime): null,
                })(<DatePicker placeholder="生效时间" />)}
              </FormItem>
              <FormItem {...formItemLayout} label={Label("结束时间")}>
                {getFieldDecorator('eTime', {
                  rules: [
                    {
                      required: true,
                      message: '请选择结束时间',
                    },
                  ],
                  initialValue:couponItem.sTime ? format(couponItem.sTime): null,
                })(<DatePicker placeholder="结束时间" />)}
              </FormItem>
              <FormItem {...formItemLayout} label={Label("面值")}>
                {getFieldDecorator('value', {
                  rules: [
                    {
                      required: true,
                      message: '请输入面值',
                    },
                  ],
                  initialValue:couponItem.value
                })(<InputNumber placeholder="请输入" />)}
                <span> 元</span>
              </FormItem>
              <FormItem {...formItemLayout} label={Label("使用门槛")}>
                <div>
                  {getFieldDecorator('limitRadio', {
                    rules: [
                      {
                        required: true,
                        message: '请选择使用门槛',
                      },
                    ],
                    initialValue: couponItem.limit === 0 ? "1" : couponItem.limit > 0 ? "2" : '',
                  })(
                    <Radio.Group onChange={e=>{if(e.target.value === "1")setFieldsValue({limit:''})}}>
                      <Radio style={radioStyle} value="1">无限制</Radio>
                      <Radio style={radioStyle} value="2">
                        <FormItem style={{display:'inline-block'}}>
                          {getFieldDecorator('limit', {
                            rules: [
                              {
                                required: getFieldValue('limitRadio')==="2",
                                message: '请输入',
                              },
                            ],
                            initialValue:couponItem.limit
                          })(<InputNumber disabled={getFieldValue('limitRadio') === "1"} placeholder="请输入" />)}
                          <span> 元</span>
                        </FormItem>
                      </Radio>
                    </Radio.Group>
                  )}
                </div>
              </FormItem>
            </Card>
            <Card  bordered={false} className={styles.updateBox}  title='优惠券详情'>
              <FormItem {...formItemLayout} label={Label("发放总量")}>
                {getFieldDecorator('issuance', {
                  initialValue:couponItem.issuance
                })(<InputNumber placeholder="请输入" disabled={getFieldValue('issuanceCheck')} />)}
                <span> 张</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormItem className={styles.inline}>
                  {getFieldDecorator('issuanceCheck',{
                    initialValue:couponItem.issuance === 0
                  })(<Checkbox onChange={e=>{if(e.target.checked)setFieldsValue({issuance:''})}}>无限制</Checkbox>)}
                </FormItem>
              </FormItem>
              <FormItem {...formItemLayout} label={Label("每人限领")}>
                {getFieldDecorator('getLimit', {
                  initialValue:couponItem.getLimit
                })(<InputNumber placeholder="请输入" disabled={getFieldValue('getLimitCheck')} />)}
                <span> 张</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormItem className={styles.inline}>
                  {getFieldDecorator('getLimitCheck',{
                    initialValue:couponItem.getLimit === 0
                  })(<Checkbox onChange={e=>{if(e.target.checked)setFieldsValue({getLimit:''})}}>无限制</Checkbox>)}
                </FormItem>
              </FormItem>
              <FormItem {...formItemLayout} label={Label("领取策略")}>
                <div>
                  {getFieldDecorator('strategy', {
                    initialValue: couponItem.strategy || "1",
                  })(
                    <Radio.Group>
                      <Radio value="1">无限制</Radio>
                      <Radio value="2">积分兑换</Radio>
                    </Radio.Group>
                  )}
                </div>
              </FormItem>
              {getFieldValue('strategy') === '2' ? this.renderIntegral(): ''}
              <FormItem {...formItemLayout} label="活动描述">
                {getFieldDecorator('remark', {
                  initialValue:couponItem.remark
                })(<TextArea style={{ minHeight: 32, width:250 }} placeholder="请输入活动描述" rows={4} />)}
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button onClick={()=>dispatch(routerRedux.push('/idea/ggk/info'))}>取消</Button>
                <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" loading={loading} >提交</Button>
              </FormItem>
            </Card>

          </Card>
        </Form>
        {this.renderModal()}
      </PageHeaderLayout>
    );
  }
}
