<template>
  <v-app>
    <v-content>
  
      <router-view></router-view>

    </v-content>
  </v-app>
</template>
<script>
  // import $ from 'jquery'
  // import router from '@/router'
  export default {
    data: () => ({
      fab: false,
      tinMois: [],
      initData: null,
      isKeToan: false
    }),
    created () {
      var vm = this
      vm.$nextTick(function () {
        console.log('created app.vue')
      })
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
      }
    },
    destroyed () {
    },
    methods: {
    }
  }
</script>
