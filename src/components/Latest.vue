<!-- 最新文章 -->
<template>
    <div class="articleList"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">
        <div v-for="(item) in latestList" :key="item.article_id">
            <ArticleItem :item="item"></ArticleItem>
        </div>
        <Tag v-if="noMore" size="large" class="noMore">无更多</Tag>
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

        data(){
			return {
				busy: false,
                page: 0,
                limit: 5,
				noMore: false
            }
        },

		computed: {
			...mapState({
				latestList: state => state.article.latestListPage,
				latestListPageCount: state => state.article.latestListPageCount,
			})
		},

		created() {
			let {page, limit} = this;
			this.getLatestListPaged({page, limit});  //最新文章列表
		},

		methods: {
			...mapActions([
				'getLatestListPaged' // 获取最新文章列表
			]),

            //加载更多
			loadMore(){
				console.log('---loadMore--->');
				console.log('---loadMore---this.latestListPageCount-->', this.latestListPageCount);
				console.log('---loadMore---this.latestListPageCount-type->', typeof this.latestListPageCount);
				console.log('---loadMore---this.page->', this.page);
                this.busy = true;
                if(this.page < this.latestListPageCount){
					this.page ++;
					this.getLatestListPaged({page: this.page, limit: this.limit}).then(res => { //最新文章列表
						this.busy = false;
					});
                }else{
					console.log('---无更多--->');
					this.busy = false;
					this.noMore = true;
                }
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
        margin 0 auto
    .noMore
        display flex
        justify-content center
        margin-top 10px
        margin-bottom 20px
</style>
