
// # 生命周期
// - viewWillAppear
//   - 第一次创建内置浏览器的时候，不过通常此时页面还没加载好，应该收不到
//   - 在网页上压了一个页面A，然后pop页面A，显示出原来的网页，原来的网页会收到这个方法
// - viewWillDisappear
//   - 在网页上压了一个新页面，原来的网页会收到这个方法
// - enterForeground
//   - APP从后台回到前天
// - enterBackground
//   - APP压后台

// 生命周期：show/hide
window.Interface = {
  // 调用
  reqWeb: function (modul, action) {
    modul = ('' + modul).toLowerCase().trim();
    action = ('' + action).toLowerCase().trim();
    if (modul === 'lifecycle' && action === 'show') {
      NativeLifeCycle['onShow'] && NativeLifeCycle['onShow']();
    }
    else if (modul === 'lifecycle' && action === 'hide') {
      NativeLifeCycle['onHide'] && NativeLifeCycle['onHide']();
    }
  },
  // app回调
  onNativeResp: function (callbackName, params) {
    try {
      // 执行回调函数，并将 params JSON字符串转换成json
      if (params) { callbackName(JSON.parse(params)); }
      else {
        if (callbackName in window) {
          window[callbackName]();
        }
      }
    }
    catch (err) {
      console.error(err.message);
    }
  }
};

export const NativeLifeCycle = {
  onShow (params) {
    console.log('生命周期：show');
  },
  onHide (params) {
    console.log('生命周期：hide');
  }
};

export const jumpPersonalPage = (uid) => {
  prompt('__native_call=>' + JSON.stringify({
    method: 'reqNative',
    module: 'jump',
    action: 'common_jump',
    args: { url: `msalam:///me/home_page?userId=${uid}` }
  }));
};

export const jumpWebPage = (url) => {
  prompt('__native_call=>' + JSON.stringify({
    method: 'reqNative',
    module: 'jump',
    action: 'common_jump',
    args: { url: `msalam:///home/web?url=${url}` }
  }));
};

