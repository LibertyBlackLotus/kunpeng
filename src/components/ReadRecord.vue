<!-- 阅读记录 -->
<template>
    <div v-if="readRecords.length > 0">
        <Button @click="clearReadRecord"
                class="recordHistory"
                   type="text"
                   size="small">
            清空
        </Button>

        <List header="浏览历史" >
            <ListItem v-for="item in readRecords" :key="item.id">
                <ListItemMeta :title="item.article && item.article.article_title" />
                <template slot="action">
                    <li>
                        <a href="" @click="rowClick(item)">详情</a>
                    </li>
                    <li>
                        <a href="" @click="deleteRecord(item)">删除</a>
                    </li>
                </template>
            </ListItem>
        </List>

    </div>
</template>

<script>
	export default {
		props: {
			userId: [Number, String]   //用户id
		},

		data() {
			return {
				readRecords: []   //最近阅读记录
            }
		},

		created: function () {
			this.getReadRecords();  //获取用户阅读记录
		},

		methods: {
			//获取用户阅读记录
			getReadRecords() {
				this.$http.get('/api/readRecord/user/' + this.userId)
					.then((res) => {
						console.log('getReadRecords: ', res);
						if (res.status == 200) {
							this.readRecords = res.data;
						}
					});
			},

            //删除一条阅读记录
            deleteRecord(item){
				this.$http.delete('/api/readRecord/' + item.id)
					.then((res) => {
						console.log('deleteRecord: ', res);
						if (res.status == 200) {
							this.getReadRecords();
						}
					});
            },

			//清空用户阅读记录
			clearReadRecord(){
				let params = {
					user_id: this.userId
				};
				this.$http.delete('/api/readRecord', {data: params})
					.then((res) => {
						console.log('clearReadRecord: ', res);
						if (res.status == 200) {
							this.getReadRecords()
						}
					});
			},

			rowClick(row){
                let id = row.article.article_id;
                let title = row.article.article_title;
                let {href} = this.$router.resolve({
                    name: 'article_detail',
                    params: {id, title}
                });
                window.open(href, '_blank');
            }
		}

	}
</script>

<style lang="stylus" scoped>
    .recordHistory
        margin-top 40px
</style>
