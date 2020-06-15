import {
	ARTICLE_LIST_HOT,
	RECORD
} from './apiUrl';
const axios = require('axios');

export default {
	//添加阅读记录
	addReadRecord(params) {
		return axios.post(RECORD, params)
			.then((res) => {
				if (res.status == 200) {
					return res.data;
				}
			});
	}
}