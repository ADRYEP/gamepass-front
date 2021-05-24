<template>
  <div>
    <v-app-bar
      flat
      app
      dark
      color="black"
    >
      <v-btn text to="/">
        <span>Home</span>
      </v-btn>

      <v-btn text to="/devs">
        <span>Devs</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/graph">
        <span>Cypher Query Builder</span>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>