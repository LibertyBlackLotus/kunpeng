<!-- 最热文章 -->
<template>
    <div class="articleList"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">

        <transition-group name="list" tag="p">
            <div v-for="(item) in hotList" :key="'hot'+item.article_id">
                <ArticleItem :item="item"></ArticleItem>
            </div>
        </transition-group>
        <Tag v-if="noMore" size="large" class="noMore">无更多</Tag>
    </div>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
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
				hotList: state => state.article.hotList,  //最热文章列表
				hotListCount: state => state.article.hotListCount,  //最热文章总页数
			})
		},

		created: function () {
			let {page, limit} = this;
			this.getHotList({page, limit}); //获取最热文章列表
		},

		methods: {
			...mapActions({
				getHotList: 'getHotList',  //获取文章列表
			}),

			//加载更多
			loadMore(){
				this.busy = true;
				if(this.page < this.hotListCount){
					this.page ++;
					this.getHotList({page: this.page, limit: this.limit}).then(res => { //最新文章列表
						this.busy = false;
					});
				}else{
					console.log('---无更多--->');
					this.busy = false;
					this.noMore = true;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
    .noMore{
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateY(30px);
    }
</style>
