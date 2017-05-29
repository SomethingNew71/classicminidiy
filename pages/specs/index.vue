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
              <h3>{{ body.weight.saloonLb}}</h3>
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
        'wheelbase': {
          'saloonIn': 80.2,
          'saloonMm': 2036,
          'estateIn': 84.2,
          'estateMm': 2138
        },
        'length': {
          'saloonIn': 120.2,
          'saloonMm': 3054,
          'estateIn': 129.9,
          'estateMm': 3299,
          'hornetIn': 130,
          'hornetMm': 3300
        },
        'width': {
          'saloonIn': 55,
          'saloonMm': 1397
        },
        'height': {
          'saloonIn': 53,
          'saloonMm': 1346
        },
        'weight': {
          'saloonLb': 1360,
          'saloonkg': 617,
          'estateLb': 1512,
          'estatekg': 686
        }
      },
      'engines': {
        'engine850a': {
          'displacement': 850,
          'powerHp': 34,
          'powerKw': 25,
          'torqueLbft': 44,
          'torqueNm': 60,
          'prodYears': '1959 - 1980'
        },
        'engine998a': {
          'displacement': 998,
          'powerHp': 41,
          'powerKw': 31,
          'torqueLbft': 52,
          'torqueNm': 71,
          'prodYears': '1959 - 1980'
        },
        'engine1071a': {
          'displacement': 1071,
          'powerHp': 70,
          'powerKw': 52,
          'torqueLbft': 62,
          'torqueNm': 84,
          'prodYears': '1963 - 1964'
        },
        'engine1098a': {
          'displacement': 1098,
          'powerHp': 45,
          'powerKw': 34,
          'torqueLbft': 56,
          'torqueNm': 76,
          'prodYears': '1969 - 1980'
        },
        'engine1275a': {
          'displacement': 1275,
          'powerHp': 76,
          'powerKw': 57,
          'torqueLbft': 79,
          'torqueNm': 107,
          'prodYears': '1964 - 1980'
        },
        'engine998plus': {
          'displacement': 1275,
          'powerHp': 44,
          'powerKw': 33,
          'torqueLbft': 52,
          'torqueNm': 71,
          'prodYears': '1980 - 1992'
        },
        'engine1275plus': {
          'displacement': 1275,
          'powerHp': 78,
          'powerKw': 58,
          'torqueLbft': 78,
          'torqueNm': 106,
          'prodYears': '1980 - 1996'
        },
        'engine1275MPIplus': {
          'displacement': 1275,
          'powerHp': 63,
          'powerKw': 47,
          'torqueLbft': 70,
          'torqueNm': 95,
          'prodYears': '1997 - 2000'
        }
      }
    };
  },
  methods: {}
};
</script>
