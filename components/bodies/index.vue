<template>
  <div class="column bodies">
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': saloonActive }" class="saloon">
          <a class="toggleElement saloon"v-on:click="saloonToggle" >
            <span>Saloon</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': estateActive }" class="estate">
          <a class="toggleElement estate"v-on:click="estateToggle">
            <span>Estate</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': vanActive }" class="van">
          <a class="toggleElement van"v-on:click="vanToggle">
            <span>Panel Van</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': countrymanActive }" class="countryman">
          <a class="toggleElement countryman"v-on:click="countrymanToggle">
            <span>Country-man</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': clubmanActive }" class="clubman">
          <a class="toggleElement clubman"v-on:click="clubmanToggle">
            <span>Clubman</span></span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': pickupActive }" class="pickup">
          <a class="toggleElement pickup"v-on:click="pickupToggle">
            <span>Pickup</span></span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': elfActive }" class="elf">
          <a class="toggleElement elf"v-on:click="elfToggle">
            <span>Elf</span>
          </a>
        </li>
        <li v-bind:class="{ 'is-active': mokeActive }" class="moke">
          <a class="toggleElement moke"v-on:click="mokeToggle">
            <span>Moke</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- TAB SECTION
    *************************************************************-->
    <div class="columns tab-section">
      <engines/>
      <div
        v-bind:class="{ 'is-active': saloonActive }"
        class="column saloon">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.saloon}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.saloon}}in/{{body.length.metric.saloon}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.saloon}}in/{{body.width.metric.saloon}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.saloon}}in/{{body.wheelbase.metric.saloon}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.saloon}}lbs/{{body.weight.metric.saloon}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': estateActive }"
        class="column estate">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.estate}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.estate}}in/{{body.length.metric.estate}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.estate}}in/{{body.width.metric.estate}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.estate}}in/{{body.wheelbase.metric.estate}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.estate}}lbs/{{body.weight.metric.estate}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': elfActive }"
        class="column elf">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.elf}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.elf}}in/{{body.length.metric.elf}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.elf}}in/{{body.width.metric.elf}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.elf}}in/{{body.wheelbase.metric.elf}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.elf}}lbs/{{body.weight.metric.elf}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': mokeActive }"
        class="column moke">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.moke}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.moke}}in/{{body.length.metric.moke}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.moke}}in/{{body.width.metric.moke}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.moke}}in/{{body.wheelbase.metric.moke}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.moke}}lbs/{{body.weight.metric.moke}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': vanActive }"
        class="column van">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.van}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.van}}in/{{body.length.metric.van}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.van}}in/{{body.width.metric.van}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.van}}in/{{body.wheelbase.metric.van}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.van}}lbs/{{body.weight.metric.van}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': countrymanActive }"
        class="column countryman">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.countryman}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.countryman}}in/{{body.length.metric.countryman}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.countryman}}in/{{body.width.metric.countryman}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.countryman}}in/{{body.wheelbase.metric.countryman}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.countryman}}lbs/{{body.weight.metric.countryman}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': clubmanActive }"
        class="column clubman">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.clubman}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.clubman}}in/{{body.length.metric.clubman}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.clubman}}in/{{body.width.metric.clubman}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.clubman}}in/{{body.wheelbase.metric.clubman}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.clubman}}lbs/{{body.weight.metric.clubman}}kg
            </a>
          </nav>
        </div>
      </div>
      <div
        v-bind:class="{ 'is-active': pickupActive }"
        class="column pickup">
        <div class="column">
          <div class="image">
            IMAGE GOES HERE
          </div>
          <div class="blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam nisi, vestibulum vel risus ut, dictum ullamcorper arcu. Ut non elit risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis vehicula velit, vitae suscipit neque.
          </div>
        </div>
        <div class="column is-5">
          <nav class="panel">
            <p class="panel-heading">
              Details
            </p>
            <a class="panel-block">
              <strong>Years Sold:</strong>{{body.yearsSold.pickup}}
            </a>
            <a class="panel-block">
              <strong>Length:</strong> {{body.length.imperial.pickup}}in/{{body.length.metric.pickup}}mm
            </a>
            <a class="panel-block">
              <strong>Width:</strong> {{body.width.imperial.pickup}}in/{{body.width.metric.pickup}}mm
            </a>
            <a class="panel-block">
              <strong>Wheelbase:</strong> {{body.wheelbase.imperial.pickup}}in/{{body.wheelbase.metric.pickup}}mm
            </a>
            <a class="panel-block">
              <strong>Weight:</strong> {{body.weight.imperial.pickup}}lbs/{{body.weight.metric.pickup}}kg
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./bodies.scss"></style>

<script>
import engines from '~components/engines';

export default {
  components: {
    engines
  },
  data: function () {
    return {
      saloonActive: true,
      estateActive: false,
      elfActive: false,
      mokeActive: false,
      vanActive: false,
      countrymanActive: false,
      clubmanActive: false,
      pickupActive: false,
      'body': {
        'yearsSold': {
          'saloon': '1959 - 2000',
          'estate': '1969 - 1980',
          'van': '1960 - 1964',
          'pickup': '1961 - 1969',
          'moke': '1964 - 1968',
          'countryman': '1961 - 1967',
          'clubman': '1969 - 1980',
          'elf': '1961 - 1969'
        },
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
      this.saloonActive = true;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = false;
      this.vanActive = false;
      this.countrymanActive = false;
      this.clubmanActive = false;
      this.pickupActive = false;
    },
    estateToggle: function () {
      this.saloonActive = false;
      this.estateActive = true;
      this.elfActive = false;
      this.mokeActive = false;
      this.vanActive = false;
      this.countrymanActive = false;
      this.clubmanActive = false;
      this.pickupActive = false;
    },
    elfToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = true;
      this.mokeActive = false;
      this.vanActive = false;
      this.countrymanActive = false;
      this.clubmanActive = false;
      this.pickupActive = false;
    },
    mokeToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = true;
      this.vanActive = false;
      this.countrymanActive = false;
      this.clubmanActive = false;
      this.pickupActive = false;
    },
    vanToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = false;
      this.vanActive = true;
      this.countrymanActive = false;
      this.clubmanActive = false;
      this.pickupActive = false;
    },
    countrymanToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = false;
      this.vanActive = false;
      this.countrymanActive = true;
      this.clubmanActive = false;
      this.pickupActive = false;
    },
    clubmanToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = false;
      this.vanActive = false;
      this.countrymanActive = false;
      this.clubmanActive = true;
      this.pickupActive = false;
    },
    pickupToggle: function () {
      this.saloonActive = false;
      this.estateActive = false;
      this.elfActive = false;
      this.mokeActive = false;
      this.vanActive = false;
      this.countrymanActive = false;
      this.clubmanActive = false;
      this.pickupActive = true;
    }
  }
};
</script>
