import Vue from 'vue';
import Axios from 'axios';
import moment from 'moment';
import ViewUI from 'view-design';
import { Message } from 'view-design';
import 'view-design/dist/styles/iview.css';
import 'highlight.js/styles/monokai-sublime.css';
import App from './App.vue';
import store from './store';
import router from './router';
import {SERVER_URL, SERVER_API_PORT} from './api/config';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = `${SERVER_URL}:${SERVER_API_PORT}`; //配置axios请求url
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm") {
	return moment(dateStr).format(pattern);
});
Vue.filter('dateFormatDay', function (dateStr, pattern = "YYYY-MM-DD") {
	return moment(dateStr).format(pattern);
});
Vue.use(ViewUI);

// 响应拦截器，统一处理响应
Axios.interceptors.response.use(res => {
	if (res.status == '200') {
		return Promise.resolve(res);
	}else{
		return Promise.reject(res);
	}
}, (error) => {
	if (error.response && error.response.status) {
		switch (error.response.status) {
			/** 401: 未登录
			 未登录则跳转登录页面，并携带当前页面的路径
			 在登录成功后返回当前页面，这一步需要在登录页操作。*/
			case 401:
				Message.info('请登录！');
				router.replace({
					path: '/loginPhone'
				});
				break;
			/** 403 token过期
			 登录过期对用户进行提示
			 清除本地token
			 跳转登录页面 */
			case 403:
				Message.info('登录过期，请重新登录 ！');
				// 清除token和用户信息
				sessionStorage.setItem('myToken', null);
				sessionStorage.setItem('userInfo', null);
				// TODO:: 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
				setTimeout(() => {
					router.replace({
						path: '/loginPhone',
					});
				}, 500);
				break;
			// 404请求不存在
			case 404:
				console.log('404');
				break;
			// 其他错误，直接抛出错误提示
			default:
				console.log('error-->', error.response.data.message);
		}
	}
	return Promise.reject(error.response);
});

//跳转路由统一处理
router.beforeEach((to, from, next) => {
	const token = sessionStorage.getItem('myToken');
	if(token){
		Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
	}
	if (to.path == '/' || to.path == '/signupPhone' || to.path == '/loginPhone'
		|| to.path == '/signup' || to.path == '/login'
		|| to.name == 'home' || to.name == 'article_detail') {
		next();
	} else {
		if (token == null) {
			next('/loginPhone');
		} else {
			next();
		}
	}
});

router.afterEach(transition => {
	let name = transition.name;
	let item = router.options.routes.filter((ele) => {
		return ele.name == name;
	});
	let title = transition.params.title? transition.params.title: '';
	document.title = title? `${title}`: item[0].title;
});

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
