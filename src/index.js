import './polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e){
    console.log(e,'全局错误处理')
  }
});
function addCookie(objName, objValue, objHours){//添加cookie
  var str = objName + "=" + objValue;
  if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
    var date = new Date();
    var ms = objHours * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    // str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
}
addCookie('sid','fec7d1e6-f13b-48a6-817c-27fe03ce604b');
// addCookie('rememberMe','myPFjqBQRG3pvRo7QFCDj7iAEKdbxc6VHCBaYVrXpUgSCbxpmNPNBUFCWE9VirXRInuFZOYVvpct8vV8gk5Aiv0pylHyqD8ox4M8rBFR4l9ZUWh+EwXOwHIaK2uTOrvkHZ7vWmS3QwZqU3/7wbJ3psauxxEMQT+EQhQoTZUxRPIEA7LKPWwxE+sQopN10cUpki9Bu6tp3OKjFhJGNmdfjzo5JCiAVOgrP40mE4OCSrj8FVFdOqeMuEkPa5Wq/JFBj0xlUXaYKCUqtYDBTfpI31dHL1c/3sScQmNlf8hMpGRXTGNciuka0Fik7lVeE+oKwFkiirBPhVU78B6w6w2voADpbkx/z+TZKvRQu9MnMFwCnHRTQgKf08KuWrt1ZSdswOCsmUbIWbeM+yUZZintXRmsmSNb8kWu3+3RgST2gbtNsg3F9TwKgbNHEbPrwS2ZUa6RH/m0BnOm72ncXKiF0F5bgCaPhxZXEyNjUh/A7LmiAn+YLK1HCZHafvSC9NSDeTKYxl1YitV8de6jfVyfiD7hJtBBI1FU4rkKVAQpoSVd01HvzGycu72F7TF6eL7HM3l3F4pddzvUG8cWS3d4dA==')

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
