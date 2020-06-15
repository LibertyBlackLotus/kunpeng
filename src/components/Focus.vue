<!-- 关注的用户发表的文章 -->
<template>
    <div class="articleList">
        <div v-for="(item) in focusArticleList" :key="item.article_id">
            <ArticleItem :item="item"></ArticleItem>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
	import {openBlank, getUserId} from '../utils/common';
	import ArticleItem from "./ArticleItem";

	export default {
		// props: {
		// 	id: [Number, String]  //用户id
        // },

        data(){
			return{
		        id: getUserId()
            }
        },

        components: {
			ArticleItem
        },

        computed: {
            ...mapState({
				focusArticleList: state => state.article.focusArticleList  //关注的用户文章列表
            })
        },

		created: function () {
			this.getFocusUserArticleList({id: this.id});  // 获取关注文章列表
		},

		methods: {
            ...mapActions([
            	'getFocusUserArticleList' //获取关注文章列表
            ]),

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
        margin 0 auto
</style>
