import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Popover,
  Input,
  Button,
  Icon,
  Radio,
  Tooltip
} from 'antd';
import Qqface from '../qqface/qqface'
import styles from './index.less'
const RadioGroup = Radio.Group;
export default class PopoverInput extends Component {
  state = {
    show:false,
    tipShow:false,
    loading:false,
    radioValue:1,
    inputValue:''
  };

  handleClose = () => {
    this.setState({
      show:false,
      tipShow:false
    })
  };
  handleTogle = () => {
    this.setState({
      show:!this.state.show,
      tipShow:false,
      loading:false,
      radioValue:'matchAll',
      inputValue:''
    })
  };
  onChange = e => {
    this.setState({
      radioValue:e.target.value
    })
  };
  handleChoice = (value) =>{
    if((this.state.inputValue+value).length > 15) return;
    this.setState({
      inputValue:this.state.inputValue+value,
      tipShow:false
    })
  };
  handleInput = e =>{
    if(e.target.value.length > 15) return;
    this.setState({
      inputValue:e.target.value,
      tipShow:false
    })
  };

  onSuccess = () => {
    const {radioValue, inputValue, loading} = this.state;
    if(!inputValue){
      this.setState({
        tipShow:true
      });
      return
    }
    this.setState({ loading:true });
    let promise = this.props.onSuccess({ radioValue, inputValue });
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

  render() {
    const { show,radioValue,inputValue,tipShow,loading } = this.state;

    const faceContent = (
      <Popover content={<Qqface handleChoice={this.handleChoice}/>} trigger="click" placement="topLeft">
        <span>
          <Qqface faceItem='/::)'/>
        </span>
      </Popover>
    );

    const content =  (
      <ul className={styles.content}>
        <li>
          <span className={styles.label}><span className='red'>*</span>关键词：</span>
          <Tooltip title="此项必填" visible={tipShow}>
            <Input className={styles.for} addonAfter={faceContent} value={inputValue} placeholder='关键词最多支持15字' onInput={this.handleInput}/>
          </Tooltip>
        </li>
        <li>
          <span className={styles.label}><span className='red'>*</span>规则：</span>
          <RadioGroup className={styles.for} onChange={this.onChange} value={radioValue}>
            <Radio value='matchAll'>全匹配</Radio>
            <Radio value='matchFuzzy'>模糊匹配</Radio>
          </RadioGroup>
        </li>
        <li className={styles.button}>
          <Button type="primary" size='small' onClick={this.onSuccess} loading={loading}>
            确认
          </Button>
          <Button onClick={this.handleClose} size='small' style={{ marginLeft: 8 }}>取消</Button>
        </li>
      </ul>
    )

    return (
      <Fragment>
        <Popover content={content} placement="bottom"  visible={show}>
          <span onClick={this.handleTogle}>
            {this.props.children}
          </span>
        </Popover>
      </Fragment>
    );
  }
}
