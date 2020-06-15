<!-- 最近搜索组件 -->
<template>
    <div>
        <Modal
                v-model="clearModal"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>确定清空搜索记录？</p>
        </Modal>
        <Button @click="clearRecordMethod"
                   type="error"
                   v-if="recentSearch.length > 0"
                   size="small">
            清空搜索记录
        </Button>

        <List header="搜索记录">
            <ListItem v-for="item in recentSearch" :key="item.id">
                {{item.content}}
                <template slot="action">
                    <li>
                        <a href="" @click="deleteRecordMethod(item)">删除</a>
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
	export default {
		props: {
			userId: Number  //用户id
		},

        data(){
			return {
				clearModal: false
            }
        },

        computed: {
            ...mapState({
				recentSearch: state => state.searchRecord.recentSearch,  //搜索记录
            })
        },

		created () {
			this.getRecentSearch({id: this.userId});  //获取用户最近搜索记录
		},

		methods: {
            ...mapActions([
            	'getRecentSearch',   //获取用户最近搜索记录
            	'deleteRecord',      //删除搜索记录
            	'clearRecord',       //清空用户搜索记录
            ]),

            ok(){
				let params = {
					user_id: this.userId
				};
				this.clearRecord(params).then(res => {
					this.getRecentSearch({id: this.userId});  //获取用户最近搜索记录
				});
            },

            cancel(){
            },

            //删除搜索记录
			deleteRecordMethod(item) {
                console.log('----deleteRecordMethod--->', item);
				this.deleteRecord({id: item.id}).then(res => {
					this.getRecentSearch({id: this.userId});  //获取用户最近搜索记录
                });
			},

			//清空用户搜索记录
			clearRecordMethod() {
            	this.clearModal = true;
			},
		}

	}
</script>

<style lang="stylus" scoped>

</style>
