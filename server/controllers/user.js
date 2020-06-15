const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Core = require('@alicloud/pop-core');
const {SERVER_URL, SERVER_API_PORT} = require('../config/server');
const redis = require("../config/redis") // 你的redis配置文件路径
const {smsCode} = require('../utils/common');

var client = new Core({
	accessKeyId: 'LTAI4G3Cz7gGrTnBVrpTFT5S',
	accessKeySecret: '358gKGjguqOcJfJrFIpvmhTN4brgAo',
	endpoint: 'https://dysmsapi.aliyuncs.com',
	apiVersion: '2017-05-25'
});

/**
 * 发送验证码
 * @param ctx
 * @returns {Promise.<void>}
 */
const sendSms = async (ctx) => {
	let data = ctx.request.body;
	let {phone} = data;
	let code = smsCode();
	redis.set(phone, code);
	var params = {
		"RegionId": "cn-hangzhou",
		"PhoneNumbers": phone,
		"SignName": "昆朋app",
		"TemplateCode": "SMS_192821864",
		"TemplateParam": `{code:"${code}"}`
	}
	var requestOption = {
		method: 'POST'
	};

	client.request('SendSms', params, requestOption).then((result) => {
		let code = JSON.stringify(result);
	}, (ex) => {
		console.log(ex);
	});

	ctx.body = 'ok';
};

/**
 * 注册(手机号、验证码）
 * @param ctx
 * @returns {Promise.<void>}
 */
const register = async (ctx) => {
	let data = ctx.request.body;
	let userInfo = await User.createUser(data);
	const userToken = {
		name: userInfo.user_name,
		id: userInfo.id,
		time: moment().format('YYYY-MM-DD HH:mm:ss')
	};
	const secret = 'lin';
	const token = jwt.sign(userToken, secret); //签名
	ctx.body = {
		success: true,
		token,     //返回token
		userInfo,  //用户信息
	}
};

/**
 * 用户登录 （手机号、验证码）
 * @param ctx
 * @returns {Promise.<void>}
 */
const login = async (ctx) => {
	const data = ctx.request.body;
	let {phone, code} = data;
	return redis.get(phone).then(async (result) => {
		if (code != result) {
			ctx.body = {
				success: false,
				info: '验证码错误！'
			}
		}else{
			redis.del(parseFloat(phone));
			let userInfo = await User.getUserInfo({ phone_number: phone });
			if (userInfo == null) {
				userInfo = await User.createUserPhone({ phone_number: phone });
			}
			const userToken = {
				id: userInfo.id,
				phone_number: userInfo.phone_number,
				time: moment().format('YYYY-MM-DD HH:mm:ss')
			};
			const secret = 'lin';
			const token = jwt.sign(userToken, secret); //签名
			ctx.body = {
				success: true,
				token,     //返回token
				userInfo,  //用户信息
			}
		}
	});

};

/**
 * 获取用户信息
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const getUserInfo = async (ctx) => {
	const id = ctx.params.id;
	const result = await User.getUserById(id);
	ctx.body = result;
};

/**
 * 注册(用户名、密码）
 * @param ctx
 * @returns {Promise.<void>}
 */
const createUser = async (ctx) => {
	let data = ctx.request.body;
	let userInfo = await User.createUser(data);
	const userToken = {
		name: userInfo.user_name,
		id: userInfo.id,
		time: moment().format('YYYY-MM-DD HH:mm:ss')
	};
	const secret = 'lin';
	const token = jwt.sign(userToken, secret); //签名
	ctx.body = {
		success: true,
		token,     //返回token
		userInfo,  //用户信息
	}
};

/**
 * 用户登录 （用户名、密码）
 * @param ctx
 * @returns {Promise.<void>}
 */
const postUserAuth = async (ctx) => {
	const data = ctx.request.body;
	const userInfo = await User.getUserByName(data.name);
	if (userInfo != null) {
		if (!bcrypt.compareSync(data.password, userInfo.password)) {
			ctx.body = {
				success: false,
				info: '密码错误'
			}
		} else {
			const userToken = {
				name: userInfo.user_name,
				id: userInfo.id,
				time: moment().format('YYYY-MM-DD HH:mm:ss')
			};
			const secret = 'lin';
			const token = jwt.sign(userToken, secret); //签名
			ctx.body = {
				success: true,
				token,     //返回token
				userInfo,  //用户信息
			}
		}
	} else {
		ctx.body = {
			success: false,
			info: '用户不存在!'
		}
	}
};

/**
 * 保存用户头像
 * @param ctx
 * @returns {Promise.<void>}
 */
const saveAvatar = async (ctx) => {
	let data = ctx.request.body;
	let base64Data = data.picBase64;
	let base64DataImg = base64Data.replace(/^data:image\/\w+;base64,/, "");
	let dataBuffer = new Buffer(base64DataImg, 'base64');
	let avatarName = Date.now() + Math.random();
	let result = "fail";
	fs.writeFileSync(path.join('public/uploads', avatarName + '.png'), dataBuffer);
	// console.log('--saveResult--->', saveResult);
	let pathUrl = `${SERVER_URL}:${SERVER_API_PORT}/uploads/` + avatarName + '.png';
	const userInfo = await User.saveUserAvatarUrl(data.id, pathUrl); //头像地址入库
	ctx.body = {
		success: true,
		url: pathUrl
	};
};

module.exports = {
	getUserInfo,   // 获取用户信息
	postUserAuth,
	createUser,
	saveAvatar,
	sendSms,
	register,
	login
}
