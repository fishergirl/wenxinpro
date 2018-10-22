import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Popover,
  Input,
  Button,
  Icon,
  Tooltip
} from 'antd';
import Qqface from '../qqface/qqface'
import styles from './index.less'
const { TextArea } = Input;

export default class PopoverInput extends Component {
  state = {
    show:false,
    loading:false,
    linkShow:false,
    linkValue:'',
    textAreaValue:'',
    tipShow:false
  };

  handleClose = () => {
    this.setState({
      show:false,
    })
  };
  handleTogle = () => {
    this.setState({
      show:!this.state.show,
      textAreaValue:''
    })
  };
  handleLinkInput = e =>{
    this.setState({
      linkValue:e.target.value,
    })
  };
  handleLinkTogle = e => {
    this.setState({
      linkShow:!this.state.linkShow
    })
  };
  handleLinkClose = e => {
    this.setState({
      linkShow:false
    })
  };
  onLinkSuccess = () => {
    let value = this.state.textAreaValue + `<a href="${this.state.linkValue}"></a>`;
    if(value.length > 300)return;
    this.setState({
      textAreaValue:value,
      tipShow:false,
    });
    this.handleLinkClose()
  };
  handleChoice = (value)=>{
    let textAreaValue = this.state.textAreaValue + value;
    if(textAreaValue.length > 300)return;
    this.setState({
      textAreaValue:textAreaValue,
      tipShow:false,
    })
  };
  handleTextAreaInput = e =>{
    if(e.target.value.length > 300)return;
    this.setState({
      textAreaValue:e.target.value,
    });
    if(e.target.value.length>0){
      this.setState({
        tipShow:false,
      })
    }
  };
  onSuccess = () => {
    const {textAreaValue} = this.state;
    if(!textAreaValue){
      this.setState({
        tipShow:true
      });
      return
    }
    this.setState({ loading:true });
    let promise = this.props.onSuccess(textAreaValue);
    if(promise){
      promise.finally(()=>{
        this.setState({
          show:false,
          loading:false
        })
      })
    }else{
      this.setState({
        show:false,
        loading:false
      })
    }
  };

  linkVisibleChange = (linkShow) => {
    this.setState({
      linkValue:'',
      linkShow
    })
  };

  render() {
    const { show,linkValue,linkShow,textAreaValue,tipShow,loading } = this.state;

    const linkContent = (
      <div>
        <Input value={linkValue} placeholder='http://' onInput={this.handleLinkInput} style={{marginBottom:10}}/>
        <Button type="primary" size='small' onClick={this.onLinkSuccess}>
          确认
        </Button>
        <Button onClick={this.handleLinkClose} size='small' style={{ marginLeft: 8 }}>取消</Button>
      </div>
    );

    const content =  (
      <ul className={styles.content}>
        <li>
          <Popover content={<Qqface handleChoice={this.handleChoice}/>} trigger="click" placement="topLeft">
            <span className={styles.click}>表情</span>
          </Popover>&nbsp;&nbsp;&nbsp;
          <Popover content={linkContent} visible={linkShow} onVisibleChange={this.linkVisibleChange}  trigger="click" placement="topLeft">
            <span onClick={this.handleLinkTogle} className={styles.click}>插入链接</span>
          </Popover>
        </li>
        <li className={styles.textAreaWrapper}>
          <Tooltip title="此项必填" visible={tipShow}>
            <TextArea rows={4} value={textAreaValue} onChange={this.handleTextAreaInput}/>
          </Tooltip>
        </li>
        <li>
          <Button type="primary" size='small' loading={loading} onClick={this.onSuccess}>
            确认
          </Button>
          <Button onClick={this.handleClose} size='small' style={{ marginLeft: 8 }}>取消</Button>
          <span className='right'>还可以输入{300-textAreaValue.length}字</span>
        </li>
      </ul>
    )

    return (
      <Fragment>
        <Popover content={content} placement="bottom" visible={show}>
          <span onClick={this.handleTogle}>
            {this.props.children}
          </span>
        </Popover>
      </Fragment>
    );
  }
}
