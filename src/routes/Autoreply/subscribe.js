import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Popconfirm,
  Spin
} from 'antd';
import PopoverReply from '../../components/PopoverReply'
import Qqface from '../../components/qqface/qqface'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './keyword.less'
@connect(({ subscribe, loading }) => {
  return {
    subscribe,
    loading: loading.effects['subscribe/getReplyList'],
  };
})
export default class Analysis extends Component {
  static contextTypes = {
    location:PropTypes.object
  };

  state = {
    title:''
  };

  componentDidMount() {
    const { location:{ pathname} } = this.context;
    let ruleType;
    if( pathname === '/autoreply/subscribe' ){
      ruleType = 'subscribe';
      this.setState({title:'关注回复语'})
    }else if( pathname === '/autoreply/defaults' ){
      ruleType = 'defaults';
      this.setState({title:'默认回复'})
    }
    this.props.dispatch({
      type:'subscribe/getReplyList',
      payload:{
        ruleType: ruleType
      }
    })
  }
  addReply = async (value) => {
    this.props.dispatch({
      type:'subscribe/addReply',
      payload:{
        msgtextJson: {
          accountid: '',
          content: value
        },
        ruleid: this.props.subscribe.data.ruleid,
        ruleType: this.props.subscribe.data.ruleType
      }
    })
  };
  handleDelete = (item) => {
    this.props.dispatch({
      type:'subscribe/deleteReply',
      payload:{
        materialid:item.materialid,
        index:item.index
      }
    })
  };

  render() {
    const { subscribe:{ data }, loading } = this.props;
    const { title } = this.state;

    const Reply = (item)=>(
      <div className={styles.reply_item_box}>
        <span>{item.index+1}. </span><span className={styles.reply_type}>文本</span>&nbsp;&nbsp;
        <span className={styles.reply_max}><Qqface faceWord={item.preview} /></span>
        <Popconfirm onConfirm={()=>this.handleDelete(item)} placement="bottom" title='确定删除' okText="删除" cancelText="取消">
          <span className={`${styles.hover} right`}>删除</span>
        </Popconfirm>
      </div>
    );
    return (
      <Fragment>
        <PageHeaderLayout title={title}>
          <Card bordered={false} style={{ minHeight: 600, minWidth: 800 }}>
            <Spin spinning={loading}>
              <Row>
                <Col xs={24} sm={{span:21,offset:1}} className={`${styles.keyword_box} ${styles.reply}`}>
                  <div className={styles.sub_box} style={{width:100+'%'}}>
                    <div className={styles.title}>
                      {title}：如果含多条回复内容则随机回复一条
                    </div>
                    <div className={`${styles.article} ${styles.reply_box}`}>
                      {
                        data.materialList && data.materialList.length > 0 ?
                          data.materialList.map((item,index)=>(<Reply {...item} index={index} key={index}/>))
                          : (<p>还没有设置自动回复</p>)
                      }
                    </div>
                    <div className={styles.addmore}>
                      <PopoverReply onSuccess={this.addReply} >
                        <span>+添加回复</span>
                      </PopoverReply>
                    </div>
                  </div>
                </Col>
              </Row>
            </Spin>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
