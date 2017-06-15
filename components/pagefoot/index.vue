<template>
  <section id="contact-section" class="section contact">
    <div class="columns">
      <div class="column">
        <h2>
          Classic Mini DIY
        </h2>
        <h3>
          DIY Videos for your Classic Car
        </h3>
        <nav class="social-icons level is-mobile">
          <div class="level-left">
            <a class="level-item" target='_blank' :href='urls.youtube'>
              <span class="icon is-medium"><i class="fa fa-youtube"></i></span>
            </a>
            <a class="level-item" target='_blank' :href='urls.facebook'>
              <span class="icon is-medium"><i class="fa fa-facebook"></i></span>
            </a>
            <a class="level-item"  target='_blank' :href='urls.instagram'>
              <span class="icon is-medium"><i class="fa fa-instagram"></i></span>
            </a>
            <a class="level-item" target='_blank' :href='urls.github'>
              <span class="icon is-medium"><i class="fa fa-github"></i></span>
            </a>
          </div>
        </nav>
      </div>
      <div class="column ad-block">
        <!-- PUT YOUR AD SHIT RIGHT HERE -->
      </div>
      <div class="column sponsors">
        <h2>Sponsors</h2>
        <a target='_blank' :href='urls.sevenMini'>
          <img src="/pages/home/seven-mini.png" alt="Seven Mini Parts">
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./pagefoot.scss"></style>

<script>
export default {
  data: function () {
    return {
      urls: {
        instagram: 'https://www.instagram.com/classicminidiy59/',
        facebook: 'https://www.facebook.com/classicminidiy',
        github: 'https://github.com/SomethingNew71/classicminidiy',
        youtube: 'https://www.youtube.com/c/classicminidiy',
        sevenMini: 'http://www.7ent.com'
      }
    };
  }
};
</script>
