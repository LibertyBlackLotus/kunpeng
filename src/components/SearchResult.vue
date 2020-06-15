<!-- 搜索结果组件 -->
<template>
    <div>
        <Header></Header>
        <div class="articleList">
            <Tag>{{searchResult.length}}个结果</Tag>
            <Row class="articleListRow">
                <!-- 搜索结果 -->
                <i-col span="18">
                    <Card class="articleItem"
                             v-for="item in searchResult"
                             :key="item.article_id">
                        <!-- 作者 -->
                        <div class="articleItemInfoContent">
                            <span class="articleItemInfo articleItemInfoUser"
                                    @click="toUserMainPage(item.user_id)">
                                <img :src="item.User.photo"/>
                                {{ item.User.user_name }}
                            </span>
                            <span class="articleItemInfo">
                                <span class="articleItemInfoImg">
                                    <img src="../assets/heart.png"/>
                                </span>
                                <span>
                                    {{ item.article_like_count }}
                                </span>
                            </span>
                                <Tag class="articleItemInfo">
                                {{ item.article_date | dateFormat }}
                            </Tag>
                        </div>
                        <!-- 标题 -->
                        <span class="articleItemTitle"
                              @click="toDetail(item.article_id, item.article_title)">
                        {{item.article_title}}
                    </span>
                        <!-- 内容 -->
                        <div class="articleItemContent"
                             v-html="item.article_content">
                            {{item.article_content}}
                        </div>
                    </Card>
                </i-col>

                <!-- 最近搜索 -->
                <i-col span="5" offset="1">
                    <RecentSearch :userId="userId"></RecentSearch>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
	import Header from './Header.vue';
	import RecentSearch from './RecentSearch.vue';
	import moment from 'moment';
	import {getUserId, openBlank} from '../utils/common';
	import {mapState, mapActions} from 'vuex';

	export default {
		props: {
			keywords: String  //关键字
		},

		components: {
			Header,
			RecentSearch
		},

		data() {
			return {
                userId: getUserId()  //用户id
			}
		},

        computed: {
            ...mapState({
				searchResult: state => state.article.searchResult,       //搜索结果
            })
        },

		created () {
			this.saveSearchRecordMethod();                  //记录搜索内容
			this.getSearchItem({keywords: this.keywords});  //获取搜索结果
		},

		methods: {
            ...mapActions([
                'getSearchItem',   //获取搜索结果
                'saveSearchRecord' //记录搜索内容
            ]),

			//记录搜索内容
            saveSearchRecordMethod(){
                let params = {
                    user_id: this.userId,
                    content: this.keywords,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                this.saveSearchRecord(params);
            },

			//跳转至详情
			toDetail(id, title) {
				openBlank(this.$router, 'article_detail', {id, title});
			},

			//跳转至用户主页
			toUserMainPage(id) {
				openBlank(this.$router, 'mypage', {id});
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .articleList
        width 1080px
        margin 0 auto
        padding-bottom 50px
    .articleItem
        margin-top 1px
    .articleItemTitle
        font-size 16px
        font-weight 600
        color #00b4ff
        cursor pointer
        margin-top 5px
    .articleItemTitle:hover
        text-decoration underline
    .articleItemContent
        max-height 200px
        overflow hidden
    .articleItemInfoContent
        margin-top 5px
    .articleItemInfo
        margin-left 20px
        font-size 12px
        color #b4b4b4
    .articleItemInfoUser
        cursor pointer
    .articleItemInfoUser img
        width 30px
    .articleItemInfoImg img
        width 10px
</style>
