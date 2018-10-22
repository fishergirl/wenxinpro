import { restAutoreplyList, restMaterialDelete, restMsgtextSaveSubresText } from '../../services/api';
import { message } from 'antd';
import { getAccount } from '../../utils/account';

export default {
  namespace: 'subscribe',

  state: {
    data: {},
  },

  effects: {
    * getReplyList({ payload }, { call, put }) {
      const res = yield call(restAutoreplyList, { accountid: getAccount().accountid, ...payload });
      if (res.status === 200) {
        yield put({
          type: 'changeList',
          payload: res.data.rows[0],
        });
      }
    },
    * addReply({ payload }, { call, put, select }) {
      const res = yield call(restMsgtextSaveSubresText, payload);
      if (res.status === 200) {
        const data = yield  select(state => state.subscribe.data);
        data.materialList.push({
          materialType: 'text',
          materialid: res.data.materialid,
          preview: payload.msgtextJson.content,
        });
        yield put({
          type: 'changeList',
          payload: data,
        });
      }
    },
    * deleteReply({ payload: { materialid, index } }, { call, put, select }) {
      const res = yield call(restMaterialDelete, { materialid });
      if (res.status === 200) {
        let data = yield select((state) => state.subscribe.data);
        data.materialList.splice(index, 1);
        yield put({
          type: 'changeList',
          payload: data,
        });
        message.success('删除成功');
      }
    },
  },

  reducers: {
    changeList(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    clear() {
      return {
        data: {},
      };
    },
  },
};
