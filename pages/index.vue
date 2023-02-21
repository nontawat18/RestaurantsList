<template>
  <div class="container">
    <div>
      <h2 class="text-center">Google Map Nuxt.js</h2>
      <label class="form-label">
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>
        <button @click="addLocationMarker" class="btn btn-primary">
          Get Location
        </button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map
      :zoom="14"
      :center="center"
      style="width: 100%; height: 600px"
      class="mb-5"
      
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: {
        lat: 13.823407815603725,
        lng: 100.51234692335129,
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
    };
  },

  mounted() {
    this.locateGeoLocation();
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: 13.823407815603725,
          lng: 100.51234692335129,
        };
      });
    },
  },
};
</script>
