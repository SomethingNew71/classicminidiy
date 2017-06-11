<template>
  <div class="column bodies">
    <h2 class="title">Bodies</h2>
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
              Mini Saloon
            </h3>
            <p class="subtitle">
              The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half aside-value">
            <h3 class="title">
              <output>{{body.weight.imperial.saloon}}</output>
              <output>{{unit.weight.imperial}}</output>
            </h3>
            <h4>
              <output>{{body.weight.metric.saloon}}</output>
              <output>{{unit.weight.metric}}</output>
            </h4>
            <p>Weight</p>
            <hr>
          </div>
          <div class="column is-half aside-value">
            <h3 class="title">
              <output>{{body.wheelbase.imperial.saloon}}</output>
              <output>{{unit.length.imperial}}</output>
            </h3>
            <h4>
              <output>{{body.wheelbase.metric.saloon}}</output>
              <output>{{unit.length.metric}}</output>
            </h4>
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
              Mini Estate
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
              Mini Elf
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
            <h3 class="title"><output>{{}}</output>in</h3>
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
              Mini Moke
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

<style lang="scss" src="./bodies.scss"></style>

<script>
import specs from '~pages/specs';

export default {
  components: {
    specs
  },
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
      'body': {
        'wheelbase': {
          'metric': {
            'saloon': 2036,
            'estate': 2138
          },
          'imperial': {
            'saloon': 80.2,
            'estate': 84.2
          }
        },
        'length': {
          'metric': {
            'saloon': 3054,
            'estate': 3299,
            'hornet': 3300
          },
          'imperial': {
            'saloon': 120.2,
            'estate': 129.9,
            'hornet': 130
          }
        },
        'width': {
          'metric': {
            'saloon': 1397,
            'estate': 1397,
            'hornet': 1397
          },
          'imperial': {
            'saloon': 55,
            'estate': 55,
            'hornet': 55
          }
        },
        'height': {
          'metric': {
            'saloon': 1346,
            'estate': 1346,
            'hornet': 1346
          },
          'imperial': {
            'saloon': 53,
            'estate': 53,
            'hornet': 53
          }
        },
        'weight': {
          'metric': {
            'saloon': 617,
            'estate': 686,
            'hornet': 617
          },
          'imperial': {
            'saloon': 1360,
            'estate': 1512,
            'hornet': 1360
          }
        }
      }
    };
  },
  methods: {
    saloonToggle: function () {
      console.log(specs.isMetric);
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
