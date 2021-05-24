import NeoVis from 'neovis.js/dist/neovis.js';
<template>
  <div>
    <Navbar />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "GraphComponent",
  components: {
    Navbar,
  },
};

</script>
