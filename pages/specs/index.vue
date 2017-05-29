<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column is-10">
          <h1 class="title">
            Classic Mini Specifications
          </h1>
        </div>
        <div class="column">
          <div class="tabs is-toggle">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small"><i class="fa fa-thumbs-down"></i></span>
                  <span>Imperial</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small"><i class="fa fa-thumbs-up"></i></span>
                  <span>Metric</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-5">
          <div class="card">
            <div class="card-content">
              <p class="title">
                Classic Mini Saloon
              </p>
              <p class="subtitle">
                The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
              </p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <h3>{{ body.saloon.weightLbs}}</h3>
            </div>
            <div class="column is-half">
              <p>70 ft//lbs of torque</p>
            </div>
          </div>
        </div>
        <div class="column">
          Second column
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./specs.scss"></style>
<script>
export default {
  data: function () {
    return {
      'body': {
        'saloon': {
          'weightLbs': '1279',
          'weightKg': '580'
        },
        'clubman': {
          'weightLbs': '1279',
          'weightKg': '580'
        },
        'estate': {
          'weightLbs': '1279',
          'weightKg': '580'
        },
        'van': {
          'weightLbs': '1279',
          'weightKg': '580'
        }
      },
      'engine': {
        '850': {

        }
      }
    };
  },
  methods: {}
};
</script>
