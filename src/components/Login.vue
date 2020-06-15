<template>
    <Row type="flex" justify="center" class="content">
        <div class="signup">
            <Button type="primary" @click="toSignup">注册</Button>
        </div>
        <i-col :xs="24" :sm="{span: 6, offset: 9}">
            <span class="title">
                欢迎登录
            </span>
            <Row>
                <Input class="el-input"
                        v-model="account"
                        placeholder="用户名"
                        type="text" />
                <Input class="el-input"
                        v-model="password"
                        placeholder="密码"
                        type="password"
                        password
                        @keyup.enter.native="loginToDo" />
                <Button type="primary" @click="loginToDo">登录</Button>
            </Row>
        </i-col>
    </Row>
</template>

<script>
	import {mapState, mapActions} from 'vuex';

	export default {
		data() {
			return {
				account: '',  //用户名
				password: ''  //密码
			}
		},
		methods: {
			...mapActions([
				'login'     //登录
			]),

			//登录
			loginToDo() {
				let obj = {
					name: this.account,
					password: this.password
				};
				this.login(obj).then(res => {
					if (res.data.success) {
						sessionStorage.setItem('myToken', res.data.token);
						sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
						this.$Message.success({
							content: '登录成功！'
						});
						this.$router.push('/home');
					} else {
						this.$Message.error(res.data.info);
						sessionStorage.setItem('myToken', null);
					}
				});
			},

			//跳至登录页
			toSignup() {
				this.$router.push('/signup');
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .content
        background url(../assets/login.jpg) no-repeat
        background-size 100% 100%
        height 760px
        align-items center
        justify-content center
        overflow-y hidden !important
    .signup
        position fixed
        top 10px
        right 10px
    .title
        font-size 28px
        color #fff
    .el-input
        margin 12px 0
    .Button
        width 100%
        margin-top 12px
</style>
