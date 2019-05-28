import {get, post, postInstance} from './axiosUtil';

// 保险信息获取
const getSingleReportResult = get('/insureAssessment/assessment/pub/getSingleReportResult');
// 保险信息修改提交
const updateTempResult = post('/insureAssessment/assessment/pub/updateTempResult');
// 发现文章
const detail = get('/insureActivity/article/pub/detail');
// 文章推荐列表
const bottomList = get('/insureActivity/article/pub/bottomList');
// 测评结果满意不满意接口
const satisfyReport = post('/insureAssessment/assessment/pub/satisfyReport');
// 消耗或者赠送积分
const consumerOrObtainUserCredit = postInstance('/insureActivity/credit/pub/consumerOrObtainUserCreditForH5');

export {
  getSingleReportResult,
  updateTempResult,
  detail,
  bottomList,
  satisfyReport,
  consumerOrObtainUserCredit,
};
