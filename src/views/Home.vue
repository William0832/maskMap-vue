<template lang='pug'>
#home
  asideMenu(
    @triggerMarkerPopup="openPopup",
    ref='menu'
  )

  maskMap(ref='map')
  lightBox
</template>

<script>
import asideMenu from '../components/asideMenu'
import lightBox from '../components/lightBox'
import maskMap from '../components/maskMap'

import { mapActions } from 'vuex'
import { types } from '../store/types'

export default {
  name: 'Home',
  components: { asideMenu, lightBox, maskMap },
  methods: {
    ...mapActions([types.FETCH_LOCATION, types.FETCH_STORES]),
    openPopup (id) {
      this.$refs.map.triggerPopup(id)
    }

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
