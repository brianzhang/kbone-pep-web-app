
export const navigateTo = (url) => {
  if ('undefined' != typeof wx && wx.getSystemInfoSync) {
    wx.navigateTo(url)
  } else {
	  // 页面跳转方法
	  // browserHistory.push(url.url)
    location.hash = url.url
    // window.location.href = '#' + url.url
  }
  return ''
}
