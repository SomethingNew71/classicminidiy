<template>
  <div class="column engines is-4">
    <div class="card">
      <div class="card-content">
        <h3 class="title">
          A Series Motor
        </h3>
        <p class="subtitle">
          The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
        </p>
      </div>
    </div>
    <div class="column">
      <div class="tabs is-toggle is-small is-fullwidth">
        <ul>
          <li v-bind:class="{ 'is-active': active850 }" >
            <a v-on:click="engineToggle(850)">
              <span>850cc</span>
            </a>
          </li>
          <li v-bind:class="{ 'is-active': active998 }" >
            <a v-on:click="engineToggle(998)" >
              <span>998cc</span>
            </a>
          </li>
          <li v-bind:class="{ 'is-active': active1100 }">
            <a v-on:click="engineToggle(1100)" >
              <span>1100cc</span>
            </a>
          </li>
          <li v-bind:class="{ 'is-active': active1275 }">
            <a v-on:click="engineToggle(1275)" >
              <span>1275cc</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style lang="scss" src="./engines.scss"></style>

<script>
export default {
  data: function () {
    return {
      active850: true,
      active998: false,
      active1100: false,
      active1275: false,
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
    engineToggle: function (value) {
      if (value === 850) {
        this.active850 = true;
        this.active998 = false;
        this.active1100 = false;
        this.active1275 = false;
      } else if (value === 998) {
        this.active850 = false;
        this.active998 = true;
        this.active1100 = false;
        this.active1275 = false;
      } else if (value === 1100) {
        this.active850 = false;
        this.active998 = false;
        this.active1100 = true;
        this.active1275 = false;
      } else if (value === 1275) {
        this.active850 = false;
        this.active998 = false;
        this.active1100 = false;
        this.active1275 = true;
      }
    }
  }
};
</script>
