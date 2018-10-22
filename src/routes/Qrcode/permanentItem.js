import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import PopoverInput from '../../components/PopoverInput'
import PopoverKeyword from '../../components/PopoverKeyword'
import PopoverReply from '../../components/PopoverReply'
import {
  Row,
  Col,
  Icon,
  Card,
  Badge,
  Popover,
  Button,
  Popconfirm
} from 'antd';

import Qqface from '../../components/qqface/qqface'
import styles from './style.less'

@connect(({qrcode}) => {
  return {
    qrcode
  }
})

export default class Keyword extends Component {

  handleEdit = (props,value) =>{
    this.props.dispatch({
      type:'qrcode/saveQrcode',
      payload:{
        qrcodeid:props.qrcodeid,
        qrcodeName:value,
      }
    })
  };
  handleDeleteReply = (props)=>{
    this.props.dispatch({
      type:'qrcode/saveQrcode',
      payload:{
        qrcodeid:props.qrcodeid,
        avaliable:'invalid',
      },
      handleType:'delete'
    })
  };
  handleDeleteMaterial = (item) => {
    this.props.dispatch({
      type:'qrcode/restMaterialDelete',
      payload:item
    })
  };
  addkeywordMsg = async (props,obj) => {
    await this.props.dispatch({
      type:'qrcode/restKeywordSave',
      payload:{
        keywordJson:{
          relationid:props.qrcodeid,
          accountid:props.accountid,
          keyword:obj.inputValue,
          matchType:obj.radioValue
        },
        index:props.index
      }
    })
  };
  deletekeywordMsg = (item) => {
    this.props.dispatch({
      type:'qrcode/restKeywordDelete',
      payload:item
    })
  };
  addReply = async (props,value) => {
    await this.props.dispatch({
      type:'qrcode/restMsgtextSave',
      payload:{
        value,
        props
      }
    })
  };

  render() {
    const props = this.props;

    const Rule = (item) => (
      <div className={styles.keyword_ctn}>
        <a className={styles.close_dialog} href="javascript:void(0)" onClick={()=>this.deletekeywordMsg(item)}>×</a>
        <span className={styles.keyword}><Qqface faceWord={item.keyword} /></span>
        <span className={styles.rule}>{item.matchType==='matchAll'?'全匹配':'模糊匹配'}</span>
      </div>
    );
    const Reply = (item)=>(
      <div className={styles.reply_item_box}>
        <span>{item.indexs[0]+1}. </span><span className={styles.reply_type}>文本</span>&nbsp;&nbsp;
        <span className={styles.reply_max}><Qqface faceWord={item.preview} /></span>
        <Popconfirm onConfirm={()=>this.handleDeleteMaterial(item)} title='确定删除' okText="删除" cancelText="取消">
          <span className={`${styles.hover} right`}>删除</span>
        </Popconfirm>
      </div>
    );

    return (
      <Fragment>
        <Row>
          <Col xs={24} sm={{span:21,offset:1}} className={styles.keyword_box}>
            <div className={`${styles.sub_box} ${styles.border_right}`}>
              <div className={styles.title}>
                {props.index+1}. {props.qrcodeName} {props.avaliable === 'invalid' ? '（已失效）':''}
                <span className="right">
                <PopoverInput onSubmit={(value)=>this.handleEdit(props,value)} defaultValue={props.qrcodeName}>
                  <span className={styles.hover}>编辑</span>-
                </PopoverInput>
                <Popconfirm onConfirm={()=>this.handleDeleteReply(props)} title='确定失效' okText="失效" cancelText="取消">
                  <span className={styles.hover} >失效</span>
                </Popconfirm>
              </span>
              </div>
              <div className={styles.article}>
                <span>扫描带参数二维码</span>
                <a className='right' href={props.qrcodeUrl} target="_blank">下载二维码</a>
              </div>
              <div className={styles.article}>
                <p>场景值：{props.sceneStr}</p>
                <div className={styles.qrcode_box}>
                  <img src={props.qrcodeUrl} alt="qrcodeUrl"/>
                </div>
                <p>或发送关键词</p>
              </div>
              <div className={styles.article} style={{height:'auto'}}>
                {
                  props.keywordList.length > 0 ?
                    props.keywordList.map((item,index)=>(
                      <Rule {...item} indexs={[index,props.index]}  key={index}/>
                    )) : (<p>还没有设置任何关键词</p>)
                }
              </div>
              <div className={styles.addmore}>
                <PopoverKeyword onSuccess={(...arg)=>this.addkeywordMsg(props,...arg)}>
                  <span>+添加关键词</span>
                </PopoverKeyword>
              </div>
            </div>
            <div className={styles.sub_box}>
              <div className={styles.title}>
                自动回复：如果含多条回复内容则随机回复一条
              </div>
              <div className={`${styles.article} ${styles.reply_box}`}>
                {
                  props.materialList.length > 0 ?
                    props.materialList.map((item,index)=>(<Reply {...item} indexs={[index,props.index]} key={index}/>))
                    : (<span>还没有设置自动回复</span>)
                }
              </div>
              <div className={styles.addmore}>
                <PopoverReply onSuccess={(...arg)=>this.addReply(props,...arg)} >
                  <span>+添加回复</span>
                </PopoverReply>
              </div>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
