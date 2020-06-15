<template>
    <div class="settingBasic">
        <Row class="settingBasicRow">
            <i-col span="4">
                <div class="avatar">
                    <img :src="imageSave"/>
                </div>
            </i-col>
            <i-col span="20">
                <Button @click="changeAvatar">
                    更换头像
                </Button>
                <input accept="image/png,image/jpeg,image/jpg"
                       class="idimg"
                       type="file"
                       style="display: none;"
                       multiple
                       ref="avatar"
                       v-on:change="selectedImg($event)"/>

            </i-col>
        </Row>

        <Row class="settingBasicRow">
            <i-col span="4">
                <span>
                    昵称
                </span>
            </i-col>
            <i-col span="20">
                {{userInfo.user_name}}
            </i-col>
        </Row>
    </div>
</template>


<script>
	import {getUserInfo} from '../utils/common';

	export default {
		components: {},

		data() {
			return {
				userInfo: getUserInfo(),
				imageSave: require('../assets/avatar.png')
			}
		},

        mounted(){
			this.imageSave = this.userInfo.photo? this.userInfo.photo: require('../assets/avatar.png')
        },

		methods: {
			//提示消息
			notify(message = '', type = '') {
				this.$Message[type](message);
			},

            //更换头像
            changeAvatar(){
				this.$refs.avatar.click();
            },

			selectedImg(e) {
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.picavalue = files[0];
				if (this.picavalue.size / 1024 > 10240) {
					this.notify('图片过大，请重新上传', '温馨提示', 'warning');
				} else {
					this.imgPreview(this.picavalue);
				}
			},

			//获取图片
			imgPreview(file) {
				let self = this
				//判断支不支持FileReader
				if (!file || !window.FileReader) return false;
				if (/^image/.test(file.type)) {
					//创建一个reader
					let reader = new FileReader();
					//将图片转成base64格式
					reader.readAsDataURL(file);
					//读取成功后的回调
					reader.onloadend = function () {
						let result = this.result;
						let img = new Image();
						img.src = result;
                        //console.log('********未压缩前的图片大小********');
                        //console.log(result.length / 1024)
						img.onload = function () {
							let data = self.compress(img, 0.3);
							self.uploadImg(data);
						}
					}
				}
			},

			// 压缩图片
			compress(img, size) {
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d')
				let width = img.width
				let height = img.height
				canvas.width = width
				canvas.height = height
				// 铺底色
				ctx.fillStyle = '#fff'
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height);
				//进行最小压缩
				let ndata = canvas.toDataURL('image/jpeg', size);
				//console.log('*******压缩后的图片大小*******')
				return ndata;
			},

			//上传图片
			uploadImg(base64) {
				let body = {
					'id': this.userInfo.id,
					'picBase64': base64
				};
				this.$http.post('/api/uploadAvatar', body).then(res => {
					if (res.status == '200') {
						this.notify('更换成功！', 'success');
						let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
						userInfo.photo = res.data.url;
						this.imageSave = userInfo.photo;
						sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
					}
				});
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .settingBasic
        padding 30px
        background-color #fff
    .avatar
        width 80px
    .avatar img
        width 80px
        border-radius 100%
    .settingBasicRow
        border-bottom 1px dashed #c8c9cc
        min-height 50px
        padding 10px 0
</style>
