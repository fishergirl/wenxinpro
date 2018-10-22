import { restAccountInfo, restAccountSave, restConfigInfo, restConfigSave } from '../../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { setSessionStorage } from '../../utils/store'
import { getAccount } from '../../utils/account';

export default {
  namespace: 'account',

  state: {
    account:{},
    config:{}
  },

  effects: {
    *getAccountInfo({ payload }, { call, put }) {
      const res = yield call(restAccountInfo, payload);
      if(res.status === 200){
        yield put({
          type:'changeAccount',
          payload:res.data
        });
        setSessionStorage('account',res.data);
      }
    },
    *saveAccount({ payload }, { call, put, select }) {
      const account = yield select(state=>state.account.account);
      const res = yield call(restAccountSave, { accountJson:{ ...account,...payload } });
      if(res.status === 200){
        message.success('保存成功！');
        yield put(routerRedux.push('/wxConfig/account/info'))
      }
    },
    *getConfigInfo(_,{ call, put }){
      const res = yield call(restConfigInfo,{accountid: getAccount().accountid});
      if(res.status === 200){
        yield put({
          type:'changeConfig',
          payload:res.data
        })
      }
    },
    *saveConfig({ payload }, { call, put, select }){
      const config = yield select(state=>state.account.config);
      const res = yield call(restConfigSave,{configJson:{...config,...payload},appid:getAccount().appid});
      if(res.status === 200){
        message.success('保存成功！');
        yield put(routerRedux.push('/wxConfig/account/info'))
      }
    }
  },

  reducers: {
    changeAccount(state, { payload }){
      return {
        ...state,
        account:payload
      }
    },
    changeConfig(state, { payload }){
      return {
        ...state,
        config:payload
      }
    },
  },
};
