<template>
    <div>
        <BackToTop></BackToTop>
        <Header></Header>
        <div class="myInfo">
            <Row>
                <span class="userInfoSpan">
                    <span class="avatar">
                        <img :src="userInfo.photo? userInfo.photo: require('../assets/avatar.png')" />
                    </span>
                    <span class="myName">{{userInfo.user_name}}</span>
                </span>
                <span v-if="userId != id">
                    <Button type="primary"
                               size="small"
                               v-if="!isFocus"
                               @click="focusUser">
                         关注
                    </Button>
                    <Button type="success"
                               size="small"
                               v-if="isFocus"
                               @click="removeFocus">
                        已关注
                    </Button>
                </span>
            </Row>
        </div>
        <div class="myPageContent">
            <Row>
                <i-col span="17">
                    <Tabs class="tabsContent"
                             v-model="activeName" >
                        <TabPane v-for="item in myPageTabsList"
                                     :key="item.id"
                                     :label="item.tabItem"
                                     :name="item.name" >
                            <keep-alive>
                                <component v-bind:is="item.component" :userId="id"></component>
                            </keep-alive>
                        </TabPane>
                    </Tabs>
                </i-col>
                <i-col span="6" offset="1" v-if="userId == id">
                    <ReadRecord :userId="id"></ReadRecord>
                </i-col>
            </Row>
        </div>

    </div>
</template>

<script>
	import Header from './Header.vue';
	import Article from './UserArticle.vue';
	import Collection from './UserCollection.vue';
	import ReadRecord from './ReadRecord.vue';
	import moment from 'moment';
	import {mapState, mapActions} from 'vuex';
	import {getUserId, openBlank} from '../utils/common';
	import BackToTop from './BackToTop.vue';

	export default {
		props: {
		    id: [Number, String]  //个人主页用户id
        },

		components: {
			Header,
            Article,
			Collection,
			ReadRecord,
			BackToTop
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'article',
                isFocus: false,
				userId: getUserId(),    //登录用户id
				myPageTabsList: [
					{id: 1, name: 'article', tabItem: '文章', component: Article},
					{id: 2, name: 'collection', tabItem: '收藏', component: Collection}
				]
			}
		},

		computed: {
			...mapState({
				userInfo: state => state.user.userInfo  //个人主页用户信息
			})
		},

        mounted: function(){
            this.getUserInfo({id: this.id});  //获取个人主页用户信息
            this.checkFocus();                //检测是否关注
        },

		methods: {
			...mapActions([
				'getUserInfo',  //获取用户信息
			]),

            //关注用户
			focusUser(){
            	let data = {
                    user_id: getUserId(),      //当前登录用户id
                    user_friends_id: this.id,  //个人主页或文章博主id
                    focus_time: moment().format('YYYY-MM-DD HH:mm:ss')  //关注时间
                };
				this.$http.post('/api/friends', data)
					.then((res) => {
						if (res.status == 200) {
							this.$Message.success({
								content: '关注成功！'
							});
							this.isFocus = true;
						}
					});
            },

			//取消关注
			removeFocus(){
				let data = {
					user_id: getUserId(),      //当前登录用户id
					user_friends_id: this.id,  //个人主页或文章博主id
				};
				this.$http.delete('/api/friends/removeFocus', {data: data})
					.then((res) => {
						if (res.status == 200) {
							this.$Message.info({
								content: '已取消关注！'
							});
							this.isFocus = false;
						}
					});
			},

			//检测是否关注
			checkFocus(){
				let data = {
					user_id: getUserId(),      //当前登录用户id
					user_friends_id: this.id,  //个人主页或文章博主id
				};
				this.$http.post('/api/friends/checkFocus', data)
					.then((res) => {
						if (res.status == 200) {
                            this.isFocus = res.data;
						}
					});
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .myInfo
        width 1080px
        margin 0 auto
        margin-bottom 20px
        padding 10px
    .userInfo
        width 100px
        float right
    .userInfoSpan
        cursor pointer
        margin-right 10px
    .userInfoSpan:hover
        color: #409EFF
    .avatar img
        width 80px
        border-radius 100%
    .myName
        font-size 24pt
    .myPageContent
        width 1080px
        margin 0 auto
</style>
