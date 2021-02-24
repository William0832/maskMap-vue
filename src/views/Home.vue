<template lang='pug'>
#home
  asideMenu

  #mask-map
</template>

<script>
import asideMenu from '../components/asideMenu'
import { mapActions } from 'vuex'
import { types } from '../store/types'

export default {
  name: 'Home',
  components: { asideMenu },
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
