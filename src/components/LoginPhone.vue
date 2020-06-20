<template>
    <div>
        <Progress :percent="percent" :stroke-width="1" v-if="showPercent"  />
        <Row type="flex" justify="center" class="content">
            <i-col :xs="24" :sm="{span: 6, offset: 9}">
            <span class="title">
                欢迎登录
            </span>
                <Row>
                    <Input class="el-input"
                           v-model="phone"
                           placeholder="手机号"
                           type="text" />
                    <span class="mssCode">
                     <Input class="el-input"
                            v-model="code"
                            placeholder="验证码"
                            type="password"
                            @keyup.enter.native="loginToDo" />
                     <Button type="default"
                             :disabled="isDisabled"
                             @click="sendSmsMethod">{{countText}}</Button>
                </span>
                    <Button type="primary"
                            @click="loginToDo">登录</Button>
                </Row>
            </i-col>
        </Row>
    </div>

</template>

<script>
	import {mapState, mapActions} from 'vuex';

	export default {
		data() {
			return {
				phone: '',  //手机号
				code: '',    //验证码
                countText: '验证码',
                countInterval: null,
				isDisabled: false,
                percent: 0,
				showPercent: false
			}
		},
		methods: {
			...mapActions([
				'sendSms',     //发送短信验证码
				'loginPhone'   //登录
			]),

            //发送短信验证码
            sendSmsMethod(){
				if(!this.phone){
					this.$Message.info('请填写手机号！');
					return;
                }
				if(this.phone.length != 11){
					this.$Message.info('请填写有效手机号！');
					return;
				}
				let params = {
					phone: this.phone.trim(),
				};
				this.sendSms(params).then(res => {
                    this.isDisabled = true;
                    this.countText = 59;
                    this.countIntervalMethod();
                });
            },

            //验证码重发倒计时
            countIntervalMethod(){
				if(this.countInterval == null){
					this.countInterval = setInterval(() => {
						if(this.countText > 0){
							this.countText -= 1;
						}else{
							this.countText = '重新发送';
							this.isDisabled = false;
                            clearInterval(this.countInterval);
						}
					}, 1000);
                }
            },

			//登录
			loginToDo() {
				this.showPercent = true;
				this.percent = 50;
				let {phone, code} = this;
				if(!phone){
					this.$Message.info('请填写手机号！');
					return;
				}
				if(phone.length != 11){
					this.$Message.info('请填写有效手机号！');
					return;
				}
				if(!code){
					this.$Message.info('请填写验证码！');
					return;
				}
				let obj = {	phone: phone.trim(), code: code.trim()};
				this.loginPhone(obj).then(res => {
					this.percent = 100;
					if (res.data.success) {
						localStorage.setItem('myToken', res.data.token);
						localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
						this.$Message.success({
							content: '登录成功！'
						});
						this.$router.push('/home');
					} else {
						this.$Message.error(res.data.info);
						localStorage.setItem('myToken', null);
					}
				});
			},

			//跳至登录页
			toSignup() {
				this.$router.push('/signupPhone');
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .content
        background url(../assets/login.jpg) no-repeat
        background-size 100% 100%
        height 720px
        align-items center
        justify-content center
        /*overflow-y hidden !important*/
    .signup
        position fixed
        top 10px
        right 10px
    .title
        font-size 28px
        color #fff
    .el-input
        margin 12px 0
        margin-right 10px
    .Button
        width 100%
        margin-top 12px
    .mssCode
        display flex
        justify-content center
        align-items center
</style>
