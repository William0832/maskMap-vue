<template lang="pug">
.aside-menu
  .wraps
    label 縣市:
      select(v-model='currentCity')
        option(
          v-for='c in cities',
          :key='c'
        ) {{ c }}
    label 行政區:
      select(v-model='currentDistrict')
        option(
          v-for='d in districts',
          :key='d.id'
        ) {{ d.name }}

  .wraps
    label
      i.fas.fa-search-location
      span 關鍵字搜尋:
      input(
        type='text',
        placeholder='請輸入關鍵字',
        v-model='keywords'
      )

  ul.store-list
    li.store-info.wraps(
      v-for='s in filteredStores',
      :id='s.id'
      :key='s.id',
      @click="$emit('triggerMarkerPopup', s.id)"
    )
      h1(v-html='keywordHeighlight(s.name)')
      .mask-info
        i.fas.fa-user
        span 大人口罩: {{s.mask_adult}} 個
      .mask-info
        i.fas.fa-baby
        span 小孩口罩: {{s.mask_child}} 個
      .mask-info 最後更新時間: {{s.updated}}
      button.btn-store-detail(@click='openInfoBox(s.id)')
        i.fas.fa-info-circle
        | 看詳細資訊
</template>

<script>
import { mapGetters } from 'vuex'
import { types } from '../store/types'
export default {
  name: 'asideMenu',
  methods: {
    keywordHeighlight (str) {
      if (!this.keywords) return str
      const heighlightEl = `<span class="heighlight"> ${this.keywords} </span>`
      return str.replace(this.keywords, heighlightEl)
    },
    openInfoBox (sId) {
      this.showModal = true
      this.lightBoxSid = sId
    }
  },

  computed: {
    ...mapGetters(['cities', 'districts', 'filteredStores']),
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
    },
    keywords: {
      get () {
        return this.$store.state.keywords
      },
      set (val) {
        this.$store.commit(types.SET_KEYWORDS, val)
      }
    },
    showModal: {
      get () {
        return this.$store.state.showModal
      },
      set (val) {
        this.$store.commit(types.SET_SHOWMODAL, val)
      }
    },
    lightBoxSid: {
      get () {
        return this.$store.state.lightBoxSid
      },
      set (val) {
        this.$store.commit(types.SET_LIGHTBOXSID, val)
      }
    }
  }
}
</script>
