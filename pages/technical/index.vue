<template>
  <section class="section">
    <div class="columns">
      <div v-for="(card, index) in cards" :key="index" class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-4 has-text-centered">{{ card.title }}</p>
            <div class="content">
              {{ card.aside }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Torque Specs',
          image: '',
          aside: ''
        },
        {
          title: 'Manuals',
          image: '',
          aside: ''
        },
        {
          title: 'Electrical Diagrams',
          image: '',
          aside: ''
        }
      ]
    }
  }
}
</script>
