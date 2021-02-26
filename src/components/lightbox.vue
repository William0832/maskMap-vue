<template lang="pug">
transition(name='modal')
.modal-mask(v-show='showModal')
  .modal-wrapper(@click.self='close()')
    .modal-container
      .modal-body(v-if='currentStore')
        .store-title {{currentStore.name}}
        .store-table.store-text 營業時間
          table
            thead
              tr
                th
                th 一
                th 二
                th 三
                th 四
                th 五
                th 六
                th 日
            tbody
              tr(v-for='(time ,i) in servicePeriod')
                th(v-if='i === 0') 早上
                th(v-else-if='i === 1') 中午
                th(v-else) 晚上
                td(v-for='s in time') {{s}}

        .store-text 地址: {{currentStore.address}}
        .store-text 電話: {{currentStore.phone}}
        .store-text 備註: {{currentStore.note}}
</template>
<script>
import { types } from '../store/types'
export default {
  name: 'lightBox',
  computed: {
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
        this.$stoe.commit(types.SET_LIGHTBOXSID, val)
      }
    },
    currentStore () {
      return this.$store.state.stores.find(e => e.id === this.lightBoxSid)
    },
    servicePeriod () {
      const p = this.currentStore
        ? this.currentStore.service_periods
        : ''
      if (p && p.length === 21) {
        const modifyP = []
        for (let i = 0; i < 3; i++) {
          const start = i * 7
          const end = start + 7
          modifyP.push(p.slice(start, end).split(''))
        }
        return modifyP
      }
      return p
    }
  },
  methods: {
    close () {
      this.showModal = false
    }
  }
}
</script>

<style lang='sass' scoped>
.bd
  border: 1px solid #000
  *
    border: 1px solid #000
.modal-mask
  position: fixed
  width: 100vw
  height: 100vh
  background-color: rgba(0,0,0,.3)
  transition: opacity 0.3s ease
  z-index: 100
.modal-wrapper
  height: 100%
  display: flex
  justify-content: center
  align-items: center
.modal-container
  border-radius: 5px
  background-color: #fff
  width: 520px
  box-shadow: 0 2px 8px rgba(0, 0, 0, .3)
  transition: all .3s ease
  font-family: Helvetica, Arial, sans-serif
.modal-body
  color: #42b983
  margin: 20px 0
  padding: 1rem
table
  margin-top: 0.5rem
  width: 100%
  border-spacing: 0
  border-radius: 3px
th
  background-color: #42b983
  color: #fff
td, th
  padding: .3rem
  text-align: center
  line-height: 1.6rem
.store-title
  font-weight: bold
  font-size: 2rem
  line-height: 1.6
  border-bottom: 2px solid rgba(black,0.5)
.store-text
  font-weight: 500
  font-size: 1.2rem
  margin-top: 1rem

</style>

<style>
.modal-enter {
  opacity: 1;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
