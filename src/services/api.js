import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

//正式接口

export const login = (params) => request('/cool.sale/brower/login/auth',{ method: 'POST', body: params, });

export const restAccountInfo = (params) => request('/api/cool.sale/sale/rest/account/info',{ method: 'POST', body: params, });
export const restAccountSave = (params) => request('/api/cool.sale/sale/rest/account/save',{ method: 'POST', body: params, });
export const restConfigInfo = (params) => request('/api/cool.sale/sale/rest/config/query/one',{ method: 'POST', body: params, });
export const restConfigSave = (params) => request('/api/cool.sale/sale/rest/config/save',{ method: 'POST', body: params, });

export const restAutoreplyList = (params) => request('/api/cool.sale/sale/rest/autoReply/list',{ method: 'POST', body: params, });//获取回复
export const restAutoreplySave = (params) => request('/api/cool.sale/sale/rest/autoReply/save',{ method: 'POST', body: params, });//保存回复
export const restAutoreplyDelete = (params) => request('/api/cool.sale/sale/rest/autoReply/delete',{ method: 'POST', body: params, });//删除回复

export const restKeywordSave = (params) => request('/api/cool.sale/sale/rest/keyword/save',{ method: 'POST', body: params, });
export const restKeywordDelete = (params) => request('/api/cool.sale/sale/rest/keyword/delete',{ method: 'POST', body: params, });
export const restMsgtextSave = (params) => request('/api/cool.sale/sale/rest/msgtext/save',{ method: 'POST', body: params, });
export const restMaterialSave = (params) => request('/api/cool.sale/sale/rest/material/save',{ method: 'POST', body: params, });
export const restMaterialDelete = (params) => request('/api/cool.sale/sale/rest/material/delete',{ method: 'POST', body: params, });

export const restMsgtextSaveSubresText = (params) => request('/api/cool.sale/sale/rest/msgtext/saveSubresText',{ method: 'POST', body: params, });

export const restQrcodeList = (params) => request('/api/cool.sale/sale/rest/qrcode/list',{ method: 'POST', body: params, });
export const restQrcodeSave = (params) => request('/api/cool.sale/sale/rest/qrcode/save',{ method: 'POST', body: params, });

//idea gift
export const restGiftList = (params) => request('/api/cool.sale/sale/rest/gift/list',{ method: 'POST', body: params, });
export const restGiftSave = (params) => request('/api/cool.sale/sale/rest/gift/save',{ method: 'POST', body: params, });
export const restGiftDelete = (params) => request('/api/cool.sale/sale/rest/gift/delete',{ method: 'POST', body: params, });

//idea invite
export const restInvitationPage = (params) => request('/api/cool.sale/sale/rest/invitation/page',{ method: 'POST', body: params, });
export const restInvitationChangeStatus = (params) => request('/api/cool.sale/sale/rest/invitation/change/status',{ method: 'POST', body: params, });
export const restInvitationQueryOne = (params) => request('/api/cool.sale/sale/rest/invitation/queryOne',{ method: 'POST', body: params, });
export const restInvitationSave = (params) => request('/api/cool.sale/sale/rest/invitation/save',{ method: 'POST', body: params, });

//idea ggk
export const restGgkQuery = (params) => request('/api/cool.sale/sale/rest/ggk/query',{ method: 'POST', body: params, });
export const restGgkSave = (params) => request('/api/cool.sale/sale/rest/ggk/save',{ method: 'POST', body: params, });
export const restGgkPrizeList = (params) => request('/api/cool.sale/sale/rest/ggk/prize/list',{ method: 'POST', body: params, });
export const restGgkPrizeSave = (params) => request('/api/cool.sale/sale/rest/ggk/prize/save',{ method: 'POST', body: params, });
export const restGgkPrizeDelete = (params) => request('/api/cool.sale/sale/rest/ggk/prize/delete',{ method: 'POST', body: params, });
export const restGgkShakeGoodsList = (params) => request('/api/cool.sale/sale/rest/shake/goodsList',{ method: 'POST', body: params, });

//idea coupon

export const restCouponList = (params) => request('/api/cool.sale/sale/rest/coupon/list',{ method: 'POST', body: params, });
export const restCouponSave = (params) => request('/api/cool.sale/sale/rest/coupon/save',{ method: 'POST', body: params, });

export const restCouponStList = (params) => request('/api/cool.sale/sale/rest/coupon/st/list',{ method: 'POST', body: params, });
export const ideaSelectOrg = (params) => request('/cool.sale/openapi/idea/select/org',{ method: 'POST', body: params, });

