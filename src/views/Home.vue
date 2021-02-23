<template lang='pug'>
#home
  .aside-menu

    .wraps
      label 縣市:
        select
          option 台北市
      label 行政區:
        select
          option 北投區

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

  #mask-map
</template>

<script>
export default {
  name: 'Home'
}
</script>
