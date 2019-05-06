function request (obj) {
  let url = obj.url || ''
  let data = obj.data || {}
  let method = obj.method || 'get'
  url = 'https://www.zhengzhicheng.cn' + url

  return new Promise(function (resolve, rejected) {
    mpvue.request({
      url: url,
      method: method,
      data: data,
      success: function (info) {
        resolve(info.data)
      }
    })
  })
}

export default request
