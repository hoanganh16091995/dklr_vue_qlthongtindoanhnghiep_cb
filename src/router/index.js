import Vue from 'vue'
import Router from 'vue-router'
import HomeDataTable from '@/components/Home_data_table.vue'
import DetailTrongNuoc from '@/components/dklr/detail-thong-tin-doanh-nghiep.vue'
import DetailNgoaiNuoc from '@/components/dklr/detail-ngoai-nuoc.vue'
import Home from '@/components/Home.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/thong-tin-doanh-nghiep/:type',
          component: HomeDataTable,
          props: true
        },
        {
          path: '/thong-tin-doanh-nghiep/:type/:code',
          component: HomeDataTable,
          props: true
        },
        {
          path: '/thong-tin-doanh-nghiep/:type/:code/:id',
          component: DetailTrongNuoc,
          props: true
        },
        {
          path: '/co-so-nuoc-ngoai/:type/:code/:id',
          component: DetailNgoaiNuoc,
          props: true
        }
      ],
      props: true
    }
  ]
})
