<template>
  <div>
    <p>COLORS PAGE</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'Technical Information',
      subtitle: 'YOUR DIGITAL MINI TOOLBOX',
      background: '/technical.jpg',
      size: 'is-medium',
      centered: true
    };
  },
  methods: {
    getColors () {
      /*
      // This is the order the colors appear in the JSON object
      "columns": [
        "colour_id",
        "base_id",
        "colour_code",
        "colour_name",
        "colour_short",
        "colour_years",
        "colour_swatch",
        "colour_approved"
      ],

      // This is the color image URL
      http://mini-colours.co.uk/images/swatches/${colour[2]}.jpg

      // This is the no color found URL
      http://mini-colours.co.uk/images/swatches/no_swatch.jpg
    */
    }
  },
  head () {
    return {
      title: 'Technical - Color Picker'
    };
  }
};
</script>
