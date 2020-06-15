import {
	USER_LOGIN,
	USER,
	SMS_CODE,
	USER_LOGIN_PHONE
} from './apiUrl';
import axios from 'axios';

export default {
	//发送短信验证码
	sendSms(params) {
		return axios.post(SMS_CODE, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},

	//手机号登录
	loginPhone(params) {
		return axios.post(USER_LOGIN_PHONE, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},

	//手机号注册
	signupPhone(params) {
		return axios.post(USER, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},

	//登录
	login(params) {
		return axios.post(USER_LOGIN, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},

	//注册
	signup(params) {
		return axios.post(USER, params)
			.then((res) => {
				if (res.status == 200) {
					return res;
				}
			});
	},


	//获取用户信息
	getUserInfo(id) {
		return axios.get(USER + `/${id}`)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	},

}