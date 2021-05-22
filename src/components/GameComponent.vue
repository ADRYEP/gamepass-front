<template>
  <div>
      <navbar />
      {{$route.params.title}}
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
};
</script>