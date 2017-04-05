<template>
  <h1></h1>
</template>

<script>
export default {
  name: 'manuals',
  data() {
    return {
      manuals: []
    };
  },
  created() {
    const baseUrl = 'https://api.fieldbook.com/v1';
    const bookId = '/58e44719e6d1c40300d3314f';
    const location = '/manuals';
    const url = baseUrl + bookId + location;

    return this.$http
      .get(url)
      .then(response => response.json())
      .then(response => {
        this.manuals = response;
        console.log(this.manuals);
      });
  }
};
</script>
