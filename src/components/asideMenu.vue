<template lang="pug">
.aside-menu
    .wraps
      label 縣市:
        select(v-model='currentCity')
          option(v-for='c in cities', :key='c') {{ c }}
      label 行政區:
        select(v-model='currentDistrict')
          option(v-for='d in districts', :key='d.id') {{ d.name }}

    .wraps
      label
        i.fas.fa-search-location
        span 關鍵字搜尋:
        input(type='text', placeholder='請輸入關鍵字')

    ul.store-list
      li.store-info.wraps
        h1 XX藥局
        .mask-info
          i.fas.fa-user
          span 大人口罩: 500個
        .mask-info
          i.fas.fa-baby
          span 小孩小孩口罩: 500個
        .mask-info 最後更新時間:
        button.btn-store-detail
          i.fas.fa-info-circle
          | 看詳細資訊

      li.store-info.wraps
        h1 XX藥局
        .mask-info
          i.fas.fa-user
          span 大人口罩: 500個
        .mask-info
          i.fas.fa-baby
          span 小孩小孩口罩: 500個
        .mask-info 最後更新時間:
        button.btn-store-detail
          i.fas.fa-info-circle
          | 看詳細資訊

      li.store-info.wraps
        h1 XX藥局
        .mask-info
          i.fas.fa-user
          span 大人口罩: 500個
        .mask-info
          i.fas.fa-baby
          span 小孩小孩口罩: 500個
        .mask-info 最後更新時間:
        button.btn-store-detail
          i.fas.fa-info-circle
          | 看詳細資訊
</template>

<script>
import { mapGetters } from 'vuex'
import { types } from '../store/types'
export default {
  name: 'asideMenu',
  computed: {
    ...mapGetters(['cities', 'districts']),
    currentCity: {
      get () {
        return this.$store.state.currentCity
      },
      set (val) {
        this.$store.commit(types.SET_CURRENT_CITY, val)
        // set the fisrt district
        const firstDistrict = this.$store.getters.districts[0].name
        this.$store.commit(types.SET_CURRENT_DISTRICT, firstDistrict)
      }
    },
    currentDistrict: {
      get () {
        return this.$store.state.currentDistrict
      },
      set (val) {
        this.$store.commit(types.SET_CURRENT_DISTRICT, val)
      }
    }
  }
}
</script>
