
export default {
	methods: {
		/**
		 * 获取用户信息
		 * @return Object userInfo or null
		 */
		getUserInfo(){
			let userInfo = JSON.parse(localStorage.getItem('userInfo'));
			return userInfo != null ? userInfo : null;
		},

		/**
		 * 获取用户id
		 * @return String id
		 */
		getUserId(){
			let userInfo = JSON.parse(localStorage.getItem('userInfo'));
			return userInfo != null ? userInfo.id : '';
		}
	}
};

