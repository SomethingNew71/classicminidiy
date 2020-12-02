<template>
  <div>
    <p>Working Component</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      views: null,
      subscribers: null,
      videos: null,
      isLoading: true
    };
  },
  created () {
    // var bore_radius = inputs.bore/2;
    // var deck_height = inputs.deck*0.0254;
    // var deck_volume = bore_radius*bore_radius*(deck_height/10)*3.14125;
    // var ringland = inputs.bore*0.0476190; //Correct for 18cc Accrallite 73.5mm pistons
    // var vc = inputs.dish+ +inputs.gasket+ +inputs.head+ +deck_volume+ +ringland+ +inputs.decomp;

    // return {
    //   ratio: (inputs.stroke*(bore_radius*bore_radius)*3.14125+vc)/vc,
    //   capacity: (inputs.stroke*(bore_radius*bore_radius)*3.14125)*4,
    // };
  },
  methods: {}
};
</script>
<style lang="scss">

</style>
