<template lang='pug'>
#mask-map.mask-map

</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
export default {
  name: 'maskMap',
  data () {
    return {
      map: {},
      markers: []
    }
  },
  mounted () {
    this.map = L.map(
      'mask-map',
      {
        center: [25.02, 121.55],
        zoom: 14
      }
    )
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '<a target="_blank" href="http://www.openstrrtmap.org/">© OpenStreeMap 貢獻者 </a>',
        maxZoom: 18,
        accessToken: 'pk.eyJ1Ijoid2lsbGlhbTA4MzIiLCJhIjoiY2tsbHN4dzh5MDJlbzJ3cWkzN2N6OWt6ZSJ9.qEc_noLehUDG9F2p-t-Ceg'
      }
    ).addTo(this.map)
    window.openLightBox = function (sId) {
      window.$vue.$refs.menu.openInfoBox(sId)
      const el = window.document.getElementById(sId)
      el.scrollIntoView({ behavior: 'smooth' })
    }
  },
  computed: {
    ...mapGetters(['currentDistrictInfo', 'filteredStores'])
  },
  watch: {
    currentDistrictInfo (nv) {
      this.map.panTo(new L.LatLng(nv.latitude, nv.longitude))
    },
    filteredStores (nv) {
      this.clearMarker()
      nv.forEach(e => this.addMarker(e))
    }

  },
  methods: {
    addMarker (item) {
      if (!item) return
      const ICON = {
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
      const marker = L.marker([item.lng, item.lat], ICON)
      marker
        .addTo(this.map)
        .bindPopup(`
          <h2 class="popup-name">${item.name}</h2>
          <button class='btn-info' onclick='openLightBox(${item.id})'> Show info </button>
        `)
      marker.markerId = item.id
      marker.lng = item.lng
      marker.lat = item.lat
      this.markers.push(marker)
    },
    clearMarker () {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer)
        }
        this.markers = []
      })
    },
    triggerPopup (markerId) {
      const marker = this.markers.find(e => e.markerId === markerId)
      this.map.flyTo(new L.LatLng(marker.lng, marker.lat), 15)
      marker.openPopup()
    }
  }
}
</script>

<style lang='sass'>
.btn-info
  margin: 0.5rem
</style>
