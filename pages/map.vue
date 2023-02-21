<template>
  <div>
    <div class="" align="center" style="padding-top: 15px">
      <b-col class="">
        <b-card no-body class="overflow-hidden" style="width: 90%" ref="map">
          <b-row no-gutters>
            <b-col md="8" cols="12">
              <gmap-map
                :zoom="14"
                :center="center"
                style="width: 100%; height: 600px"
                class="mb-5"
              >
                <gmap-marker
                  :key="index"
                  v-for="(m, index) in places"
                  :position="m.geometry.location"
                  @click="center = m.geometry.location"
                ></gmap-marker>
              </gmap-map>
            </b-col>
            <b-col md="4" cols="12">
              <b-card-body title="Horizontal Card">
                <b-col>
                  <gmap-autocomplete
                    @place_changed="initMarker"
                    style="width: 100%"
                  ></gmap-autocomplete>

                  <b-form-input
                    v-model="coordinates"
                    placeholder="Enter your name"
                    class="mt-3"
                  ></b-form-input>

                  <b-form-select
                    v-model="selectedType"
                    :options="optionsType"
                    class="mt-3"
                  ></b-form-select>
                  <b-form-select
                    v-model="selectedRedius"
                    :options="optionsRedius"
                    class="mt-3"
                  ></b-form-select>
                  <b-button
                    pill
                    variant="outline-danger"
                    class="mt-3"
                    @click="findCloseBuyButtonPressed"
                    >Button</b-button
                  >
                </b-col>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </div>
    <div align="center" style="padding-top: 15px">
      <b-row no-gutters>
        <b-col md="12" cols="12">
          <div v-for="place in places" :key="place.id">
            <b-card
              no-body
              class="overflow-hidden mt-3"
              style="width: 70%; height: 200px"
            >
              <b-row no-gutters>
                <b-col md="4" cols="4">
                  <b-card-img
                    src="https://picsum.photos/200/200/?image=20"
                    alt="Image"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="8" cols="8">
                  <b-card-body :title="place.name">
                    <b-card-text>
                      {{ place.vicinity }}
                    </b-card-text>

                    <b-form-rating
                      id="rating-readonly"
                      variant="warning"
                      :value="place.rating"
                      readonly
                      show-value
                      precision="2"
                      no-border
                    ></b-form-rating>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  data() {
    return {
      center: {
        lat: 13.823407815603725,
        lng: 100.51234692335129,
      },

      selectedType: null,
      selectedRedius: null,
      lat: 0,
      lng: 0,
      places: [],
      existingPlace: null,
      optionsType: [
        { value: null, text: "Please select an type" },
        { value: "restaurant", text: "Restaurant" },
        { value: "hospital", text: "Hospital" },
        { value: "cafe", text: "Cafe" },
      ],
      optionsRedius: [
        { value: null, text: "Please select an redius" },
        { value: 5, text: "5 KM" },
        { value: 10, text: "10 KM" },
      ],
    };
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`;
    },
    google: gmapApi,
  },
  mounted() {
    // this.locatorButtonPressed();
    this.addLocationMarker();
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        this.lat = this.existingPlace.geometry.location.lat();
        this.lng = this.existingPlace.geometry.location.lng();
      }
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        },
        (error) => {
          console.log("Error getting location");
        }
      );
    },

    findCloseBuyButtonPressed() {
      this.addLocationMarker();

      const URL = `/maps/api/place/nearbysearch/json?location=${this.lat},${
        this.lng
      }&type=${this.selectedType}&radius=${
        this.selectedRedius * 1000
      }&key=AIzaSyAXsl7deCMhvVBsVRJHGks_RJvJ59kEAI4`;
      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
          console.log(response.data.results);
          //   this.addLocationsToGoogleMaps();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    addLocationsToGoogleMaps() {
      let map = new gmapApi.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: new gmapApi.maps.LatLng(this.lat, this.lng),
        mapTypeId: gmapApi.maps.MapTypeId.ROADMAP,
      });
      let infowindow = new gmapApi.maps.InfoWindow();
      this.places.forEach((place) => {
        const lat = place.geometry.location.lat;
        const lng = place.geometry.location.lng;
        let marker = new gmapApi.maps.Marker({
          position: new gmapApi.maps.LatLng(lat, lng),
          map: map,
        });
        gmapApi.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(
            `<div class="ui header">${place.name}</div><p>${place.vicinity}</p>`
          );
          infowindow.open(map, marker);
        });
      });
    },
  },
};
</script>
