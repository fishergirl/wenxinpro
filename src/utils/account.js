import { getSessionStorage } from './store';
import { message } from 'antd'
import { history } from '../router'

export const getAccount = ()=> {
  let account = getSessionStorage('account');
  if(!account){
    // location.replace('#/wxConfig/account');
    history.push('/wxConfig/account');
    account = {};
  }
  return account
};


