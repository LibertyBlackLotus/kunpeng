<template>
    <div>
        <BackToTop></BackToTop>
        <Header></Header>
        <Row class="homeContent">
            <i-col span="16">
                <Tabs class="tabsContent"
                         v-model="activeName" >
                    <TabPane v-for="item in tabList"
                                 :key="item.id"
                                 :label="item.tabItem"
                                 :name="item.name" >
                        <keep-alive>
                            <component v-bind:is="item.component" :userId="userId"></component>
                        </keep-alive>
                    </TabPane>
                </Tabs>
            </i-col>
            <i-col span="7" offset="1">
                <Recommend :userId="userId"></Recommend>
            </i-col>
        </Row>

        <Footer></Footer>
    </div>
</template>

<script>
	import Vue from 'vue';
	import Latest from './Latest';
	// import BackToTop from './BackToTop';
    import {getUserId} from '../utils/common';
	const Header = () => import('./Header.vue');
	const Hot = () => import('./Hot.vue');
	const Focus = () => import('./Focus.vue');
	const Footer = () => import('./Footer.vue');
	const Recommend = () => import('./Recommend.vue');

	// const Hot = Vue.component('Hot', function (resolve) {
	// 	setTimeout(function () {
	// 		require(['./Hot.vue'], resolve)
	// 	}, 100);
	// });
	const BackToTop = Vue.component('BackToTop', function (resolve) {
		setTimeout(function () {
			require(['./BackToTop.vue'], resolve)
		}, 100);
	});
	// const Focus = Vue.component('Focus', function (resolve) {
	// 	setTimeout(function () {
	// 		require(['./Focus.vue'], resolve)
	// 	}, 100);
	// });

	export default {
		components: {
			Header,
			Hot,
			Latest,
			Focus,
			Recommend,
			Footer
		},

		data() {
			return {
				activeIndex: '1',
				activeName: 'latest',
                userId: getUserId(),
				bannerList: [
//					{id: 1, image: require('../assets/banner1.jpg')}
                ],
				tabList: [
					{id: 1, name: 'latest', tabItem: '最新', component: Latest},
					{id: 2, name: 'hot', tabItem: '最热', component: Hot},
					{id: 3, name: 'focus', tabItem: '关注', component: Focus},
				]
			}
		},

        mounted() {

		},

		methods: {
		},
	}
</script>

<style lang="stylus" scoped>
    .homeContent
        width 1080px
        margin 0 auto
        margin-top 5px
    .bannerImg
        width 100%


</style>
