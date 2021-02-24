<template lang='pug'>
#home
  asideMenu

  #mask-map
  light-box
</template>

<script>
import asideMenu from '../components/asideMenu'
import lightBox from '../components/lightBox'
import { mapActions } from 'vuex'
import { types } from '../store/types'

export default {
  name: 'Home',
  components: { asideMenu, lightBox },
  methods: {
    ...mapActions([types.FETCH_LOCATION, types.FETCH_STORES])

  },
  mounted () {
    this.FETCH_LOCATION()
      .then(e => {
        if (e.state === 'err') console.log(e.errInfo)
      })
    this.FETCH_STORES()
      .then(e => {
        if (e.state === 'err') console.log(e.errInfo)
      })
  }
}
</script>
