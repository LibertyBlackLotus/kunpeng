<!-- 关注的用户发表的文章 -->
<template>
    <div class="articleList"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">

        <transition-group name="list" tag="p">
            <div v-for="(item) in focusArticleList" :key="'focus'+item.article_id">
                <ArticleItem :item="item"></ArticleItem>
            </div>
        </transition-group>
        <Tag v-if="noMore" size="large" class="noMore">无更多</Tag>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
	import {openBlank, getUserId} from '../utils/common';
	import ArticleItem from "./ArticleItem";

	export default {
        data(){
			return{
		        id: getUserId(),
				busy: false,
				page: 0,
				limit: 5,
				noMore: false
            }
        },

        components: {
			ArticleItem
        },

        computed: {
            ...mapState({
				focusArticleList: state => state.article.focusArticleList,     //关注的用户文章列表
				focusArticleListCount: state => state.article.focusArticleListCount //关注的用户文章总页数
            })
        },

		created() {
			let {id, page, limit} = this;
			this.getFocusUserArticleList({id, page, limit});  // 获取关注文章列表
		},

		methods: {
            ...mapActions([
            	'getFocusUserArticleList' //获取关注文章列表
            ]),

			//加载更多
			loadMore(){
				this.busy = true;
				if(this.page < this.focusArticleListCount){
					this.page ++;
					this.getFocusUserArticleList({id: this.id, page: this.page, limit: this.limit})
                        .then(res => { //最新文章列表
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

<style lang="scss" scoped>
    .articleList{
        margin: 0 auto;
    }
    .noMore{
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
