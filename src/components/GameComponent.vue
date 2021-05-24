<template>
  <div>
      <navbar />
      <v-container>
          <v-card elevation="24" outlined class="mx-auto" max-width="600px">
          <v-row dense>
          <v-col cols="8">
            <v-img
                v-if="current_game[0].cover_image"
                :src="current_game[0].cover_image"
                width="100%"
                height="100%"
              ></v-img>
              
              <v-img
                  v-else
                  src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                  width="100%"
                  height="100%"
              ></v-img>
          </v-col>
          <v-col cols="4">
            <v-card-title>
              {{ current_game[0].title }}
            </v-card-title>

            <v-card-subtitle v-if="current_game[0].released.low">
              <v-row>
                <div class="col-7"><strong>{{ current_game[0].released.low }}</strong></div>
                <div class="col-5"><strong>{{ current_game[0].install_size }}</strong></div>
              </v-row>
            </v-card-subtitle>
            <v-card-subtitle v-else>
              <v-row>
                <div class="col-7"><strong>{{ current_game[0].released.low }}</strong></div>
                <div class="col-5"><strong>{{ current_game[0].install_size }}</strong></div>
              </v-row>
            </v-card-subtitle>

            <br>

            <v-card-text>
              <div><strong>{{current_game[1]}}:</strong></div>
              <div>{{current_game[2].name}}</div>
              <br>

              <v-divider width="100%"></v-divider>
              <br>
              
              <div><strong>{{current_game[3]}}:</strong></div>
              <div>{{current_game[4].name}}</div>
              <div>{{current_game[4].country}}</div>
            </v-card-text>
          </v-col>
        </v-row>
          </v-card>
        
      </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapState } from "vuex";

export default {
  name: "GameComponent",
  components: {
    Navbar,
  },
  data: () => ({
  }),
  mounted() {
    this.$store.dispatch("getGameByTitle");
  },
  computed: {
    ...mapState({
      current_game: (state) => state.current_game,
    }),
  }
};
</script>