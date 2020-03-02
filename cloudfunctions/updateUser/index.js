// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'cloud-tcb' });
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()

  try{

    var nowDate = new Date();
    var data = {
      name: event.name,
      address: event.address,
      phone: event.phone,
      sex: event.sex,
      idcard: event.idcard,
      region: event.region,
      community: event.community
    };
    var result = await db.collection('tcbst_user').where({
      openid: wxContext.OPENID
    }).update({
      data: data
    });
    
    return {
      error: null,
      msg:"ok",
      requestId: event.requestId,
      updateTime: nowDate,
      timestamp: Math.round(new Date().getTime() / 1000)
    };

  }catch(error){
    console.log(error);
    return { error: JSON.stringify(error),msg:"发生错误" };
  };
}
