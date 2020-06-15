<!-- 最热文章 -->
<template>
    <div class="articleList">
        <Row v-for="(item) in hotList" :key="item.article_id">
            <ArticleItem :item="item"></ArticleItem>
        </Row>
    </div>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import ArticleItem from "./ArticleItem";

	export default {
		components: {
			ArticleItem
        },

		computed: {
			...mapState({
				hotList: state => state.article.hotList  //文章列表
			})
		},

		mounted: function () {
			this.getHotList();    //获取文章列表
		},

		methods: {
			...mapActions({
				getHotList: 'getHotList',  //获取文章列表
			})
		}
	}
</script>

<style lang="stylus" scoped>

</style>
