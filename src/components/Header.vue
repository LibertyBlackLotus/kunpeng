<template>
    <transition>
        <div class="headerContent" v-if="headerBarShow">
            <Row class="header" type="flex">
                <i-col span="2" offset="1" class="logo">
                    <img src="../assets/logo.png" @click="toHome" alt="昆朋"/>
                    <!--                <span>昆朋</span>-->
                </i-col>
                <i-col span="6">
                    <Input class="searchInput"
                           placeholder="请输入搜索内容"
                           search
                           enter-button
                           @on-enter="searchItem"
                           @on-search="searchItem"
                           v-model="keywords" />
                </i-col>
                <i-col span="2" offset="8"
                       v-if="userInfo"
                       class="userInfo">
                    <Row>
                        <Dropdown @on-click="handleCommand">
                            <a href="javascript:void(0)">
                            <span class="el-dropdown-link">
                            <span class="avatar">
                                <img :src="userInfo.photo? userInfo.photo: require('../assets/avatar.png')"/>
                            </span>
                                <Icon type="ios-arrow-down"></Icon>
                          </span>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="toMyPage">我的主页</DropdownItem>
                                <DropdownItem name="toSettings">设置</DropdownItem>
                                <DropdownItem name="logout">退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </i-col>
                <i-col span="2" offset="10" v-else>
                    <Button @click="toLogin">
                        login
                    </Button>
                </i-col>
                <i-col span="2" offset="1" v-if="userInfo">
                    <Button @click="toNotebook">写文章</Button>
                </i-col>
            </Row>
        </div>
    </transition>
</template>

<script>
    import {
    	getUserInfo,
        getUserId,
        openBlank,
		scrollDirection,
		scrollDirection2
    } from '../utils/common';
	export default {
		data() {
			return {
				headerBarShow: true,
				userInfo: null, //用户信息
				keywords: '',   //搜索关键字
			}
		},

        created(){
			this.userInfo = getUserInfo();
        },

        mounted(){
			// this.handleScroll();
        },

        destroyed(){

        },

		methods: {
            //搜索
			searchItem(){
				let params =  {keywords: this.keywords};
				openBlank(this.$router, 'searchResult', params);
            },

			handleCommand(command) {
				switch (command) {
					case 'toMyPage':
						this.toMyPage();
						break;
					case 'toSettings':
						this.toSettings();
						break;
					case 'logout':
						this.logout();
						break;
					default:
						this.toMyPage();
				}
			},

			//跳转至我的页
			toMyPage() {
				this.$router.push({name: 'mypage', params: {id: getUserId()}});
			},

			//跳转至设置
			toSettings() {
				this.$router.push('/settings');
			},

			//登出
			logout() {
				localStorage.setItem('myToken', null);
				localStorage.setItem('userInfo', null);
				this.toLogin();
			},

			//跳转至发布文章页
			toNotebook() {
				openBlank(this.$router, 'notebook');
			},

			//跳转至首页
			toHome() {
				this.$router.push('/home');
			},

			//跳转至登录页
			toLogin() {
				this.$router.push('/loginPhone');
			},

            //屏幕滚动
			handleScroll () {
				var i = 0;
				var _this = this;
				window.addEventListener('scroll', function(e) {
					e.stopPropagation();
					var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
						document.body.scrollTop
					var scroll = scrollTop - i;
					i = scrollTop;
					if(scroll < 0){
						console.log('up');
						_this.headerBarShow = true;
					}else{
						console.log('down');
						_this.headerBarShow = false;
					}
				});

			},
		}
	}
</script>

<style lang="scss" scoped>
    .headerContent{
        height: 60px;
        line-height: 60px;
    }
    .header{
        height: 60px !important;
        line-height: 60px !important;
        border-bottom: 1px solid #f1f1f1;
        background: #ffffff;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 10000;
        align-items: center;
    }
    .logo{
        justify-content: center;
        align-items: center;
    }
    .logo img{
        height: 30px;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 5px;
    }
    .avatar img{
        height: 40px;
        vertical-align: middle;
    }
    .userInfo{
        width: 100px;
        float: right;
    }
    .userInfoName{
        cursor: pointer;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
