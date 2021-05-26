<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fab bottom right fixed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add a video game</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="Image link" type="text"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Creation year*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="[
                    devs[0].name,
                    devs[1].name,
                    devs[2].name,
                    devs[3].name,
                    devs[4].name,
                  ]"
                  label="Developer*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="[
                    genres[0].name,
                    genres[1].name,
                    genres[2].name,
                    genres[3].name,
                    genres[4].name,
                  ]"
                    label="Genre*"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false; createGame(payload)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "FloatingButton",
  data: () => ({
    dialog: false,
  }),
  mounted() {
    this.$store.dispatch("getDevs");
    this.$store.dispatch("getGenres");
  },
  computed: {
    ...mapState({
      devs: (state) => state.devs,
      genres: (state) => state.genres,
    }),
  },
  methods: {    
    createGame(payload){
      this.$store.dispatch('createGame', payload)
    }
  }
};
</script>

<style>
</style>