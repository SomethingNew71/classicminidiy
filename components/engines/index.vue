<template>
  <div class="column bodies">
    <h2 class="title">Engines</h2>
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': saloonActive }" class="saloon">
          <a v-on:click="saloonToggle" >
            <span class="icon is-small"><i class="fa fa-black-tie"></i></span>
            <span>Saloon</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': estateActive }" class="estate">
          <a v-on:click="estateToggle">
            <span class="icon is-small"><i class="fa fa-users"></i></span>
            <span>Estate</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': elfActive }" class="elf">
          <a v-on:click="elfToggle">
            <span class="icon is-small"><i class="fa fa-question"></i></span>
            <span>Elf</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': mokeActive }" class="moke">
          <a v-on:click="mokeToggle">
            <span class="icon is-small"><i class="fa fa-hand-peace-o"></i></span>
            <span>Moke</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- SALOON *************************************************************-->
    <div v-bind:class="{ 'is-active': saloonActive }" class="columns saloon">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <h3 class="title">
              Classic Mini Saloon
            </h3>
            <p class="subtitle">
              The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half aside-value">
            <h3 class="title"></h3>
            <p>Weight</p>
            <hr>
          </div>
          <div class="column is-half aside-value">
            <h3 class="title">in</h3>
            <p>Wheelbase</p>
            <hr>
          </div>
        </div>
      </div>
      <div class="column">
        Second column
      </div>
    </div>
    <!-- ESTATE *************************************************************-->
    <div v-bind:class="{ 'is-active': estateActive }" class="columns estate">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <h3 class="title">
              Classic Mini Saloon
            </h3>
            <p class="subtitle">
              The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half aside-value">
            <h3 class="title"></h3>
            <p>Weight</p>
            <hr>
          </div>
          <div class="column is-half aside-value">
            <h3 class="title">in</h3>
            <p>Wheelbase</p>
            <hr>
          </div>
        </div>
      </div>
      <div class="column">
        Second column
      </div>
    </div>
    <!-- ELF ****************************************************************-->
    <div v-bind:class="{ 'is-active': elfActive }" class="columns elf">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <h3 class="title">
              Classic Mini Saloon
            </h3>
            <p class="subtitle">
              The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half aside-value">
            <h3 class="title"></h3>
            <p>Weight</p>
            <hr>
          </div>
          <div class="column is-half aside-value">
            <h3 class="title">in</h3>
            <p>Wheelbase</p>
            <hr>
          </div>
        </div>
      </div>
      <div class="column">
        Second column
      </div>
    </div>
    <!-- MOKE ***************************************************************-->
    <div v-bind:class="{ 'is-active': mokeActive }" class="columns moke">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <h3 class="title">
              Classic Mini Saloon
            </h3>
            <p class="subtitle">
              The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half aside-value">
            <h3 class="title"></h3>
            <p>Weight</p>
            <hr>
          </div>
          <div class="column is-half aside-value">
            <h3 class="title">in</h3>
            <p>Wheelbase</p>
            <hr>
          </div>
        </div>
      </div>
      <div class="column">
        Second column
      </div>
    </div>
  </div>
</template>


<style lang="scss" src="./engines.scss"></style>

<script>
export default {
  data: function () {
    return {
      saloonActive: true,
      estateActive: false,
      elfActive: false,
      mokeActive: false,
      'unit': {
        'weight': {
          'metric': 'kg',
          'imperial': 'lbs'
        },
        'length': {
          'metric': 'mm',
          'imperial': 'in'
        },
        'power': {
          'metric': 'kw',
          'imperial': 'hp'
        },
        'torque': {
          'metric': 'nm',
          'imperial': 'lb/ft'
        }
      },
      'engines': {
        'engine850a': {
          'prodYears': '1959 - 1980',
          'displacement': 850,
          'power': {
            'metric': 25,
            'imperial': 34
          },
          'torque': {
            'metric': 60,
            'imperial': 44
          }
        },
        'engine998a': {
          'prodYears': '1959 - 1980',
          'displacement': 998,
          'power': {
            'metric': 31,
            'imperial': 41
          },
          'torque': {
            'metric': 71,
            'imperial': 52
          }
        },
        'engine1071a': {
          'prodYears': '1963 - 1964',
          'displacement': 1071,
          'power': {
            'metric': 52,
            'imperial': 70
          },
          'torque': {
            'metric': 84,
            'imperial': 62
          }
        },
        'engine1098a': {
          'prodYears': '1969 - 1980',
          'displacement': 1098,
          'power': {
            'metric': 34,
            'imperial': 45
          },
          'torque': {
            'metric': 76,
            'imperial': 56
          }
        },
        'engine1275a': {
          'prodYears': '1964 - 1980',
          'displacement': 1275,
          'power': {
            'metric': 57,
            'imperial': 76
          },
          'torque': {
            'metric': 107,
            'imperial': 79
          }
        },
        'engine998plus': {
          'prodYears': '1980 - 1992',
          'displacement': 998,
          'power': {
            'metric': 33,
            'imperial': 44
          },
          'torque': {
            'metric': 71,
            'imperial': 52
          }
        },
        'engine1275plus': {
          'prodYears': '1980 - 1996',
          'displacement': 1275,
          'power': {
            'metric': 58,
            'imperial': 78
          },
          'torque': {
            'metric': 106,
            'imperial': 78
          }
        },
        'engine1275MPIplus': {
          'prodYears': '1997 - 2000',
          'displacement': 1275,
          'power': {
            'metric': 47,
            'imperial': 63
          },
          'torque': {
            'metric': 95,
            'imperial': 70
          }
        }
      }
    };
  },
  methods: {
    saloonToggle: function () {
      this.saloonActive = true;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = false;
    },
    estateToggle: function () {
      this.saloonActive = false;
      this.estateActive = true;
      this.elfActive = false;
      this.mokeActive = false;
    },
    elfToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = true;
      this.mokeActive = false;
    },
    mokeToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = true;
    }
  }
};
</script>
