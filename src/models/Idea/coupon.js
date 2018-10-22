import {
  restCouponList,
  restCouponStList,
  restCouponSave,
  ideaSelectOrg
} from '../../services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getAccount } from '../../utils/account';
import { getChoice } from '../../utils/jsonTree'

export default {
  namespace: 'coupon',

  state: {
    couponData:{
      pageSize:10,
      pages:1,
      rows:[],
      total:0
    },
    couponItem:{

    },
    mechanismList:[],
    hasChoice:[]
  },

  effects: {
    * getCouponList({ payload }, { call, put, select }) {
      const { pageSize,pages } = yield select(state=>state.coupon.couponData);
      let data = {
        pageIndex:pages,
        pageSize,
        ...payload,
        couponJson:{
          accountid: getAccount().accountid,
          cname:'',
          status:0,
        },
      };
      if(payload)data.couponJson = Object.assign(data.couponJson,payload.couponJson);
      const res = yield call(restCouponList,data);
      if(res.status === 200){
        yield put({
          type:'changeState',
          payload:{
            couponData:res.data
          }
        })
      }
    },
    * changeCouponStatus({ payload }, { call, put, select }) {
      let couponJson = {
        accountid: getAccount().accountid,
        cid: payload.cid,
        status: payload.status === 1 ? 2 : 1
      };
      const res = yield call(restCouponSave,{couponJson});
      if(res.status === 200){
        const couponData = yield select(state=>state.coupon.couponData);
        couponData.rows[payload.index].status = payload.status === 1 ? 2 : 1;
        yield put({
          type:'changeState',
          payload:{
            couponData
          }
        });
        message.success('修改成功')
      }
    },
    * getCouponItem({ payload }, { call, put, select }){
      const res = yield call(restCouponList,{couponJson:{ accountid: getAccount().accountid, cid:payload.cid}});
      const mechanismList = yield select(state=>state.coupon.mechanismList);
      yield put({
        type:'changeState',
        payload:{
          couponItem:res.data.rows[0],
          hasChoice:getChoice(res.data.rows[0].institutionId,mechanismList)
        }
      })
    },
    *getIdeaSelectOrg(_, { call, put }){
      const res = yield call(ideaSelectOrg);
      yield put({
        type:'changeState',
        payload:{
          mechanismList:res.data
        }
      })
    }
  },

  reducers: {
    changeState( state, { payload }){
      return {
        ...state,
        ...payload
      }
    },
  },
};
