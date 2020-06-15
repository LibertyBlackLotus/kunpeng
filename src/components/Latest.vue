<!-- 最新文章 -->
<template>
    <div class="articleList">
        <div v-for="(item) in latestList" :key="item.article_id">
            <ArticleItem :item="item"></ArticleItem>
        </div>
    </div>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import {openBlank} from '../utils/common';
	import ArticleItem from "./ArticleItem";

	export default {
		components: {
			ArticleItem
        },

		computed: {
			...mapState({
				latestList: state => state.article.latestList
			})
		},

		mounted() {
			this.getLatestList();  // 最新文章列表
		},

		methods: {
			...mapActions([
				'getLatestList' // 获取最新文章列表
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
