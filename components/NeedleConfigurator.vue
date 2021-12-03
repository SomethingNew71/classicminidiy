<template>
  <div class="columns is-multiline configurator-component">
    <div class="column is-3">
      <nav class="panel">
        <p class="panel-heading">Choose your Needles</p>
        <a
          v-for="(value, name) in selectValues"
          :key="name"
          class="panel-block is-fullwidth"
        >
          <b-button
            class="remove-button"
            :aria-label="
              'Click here to remove the ' + selectValues[name] + ' needle'
            "
            type="is-light"
            icon-pack="fas"
            icon-right="minus"
            :disabled="selectValues.length === 1"
            @click="removeArrayItem(selectValues[name])"
          />
          <b-field class="is-fullwidth" expanded>
            <b-select
              v-model="selectValues[name]"
              expanded
              placeholder="Select a Needle"
              @input="updateArrayItem(value, selectValues[name])"
            >
              {{ selectValues[name] }}
              <option
                v-for="needle in allNeedles"
                :key="needle.name"
                :value="needle"
              >
                {{ needle.name }}
              </option>
            </b-select>
          </b-field>
        </a>
        <div class="panel-block">
          <b-button
            type="is-primary"
            icon-pack="fas"
            icon-left="plus"
            expanded
            aria-label="Click here to add another needle with a generic value"
            :disabled="selectValues.length === 10"
            @click="addArrayItem()"
          >
            Add Needle
          </b-button>
        </div>
        <div class="panel-block">
          <b-button
            type="is-secondary"
            icon-pack="fas"
            icon-left="info"
            expanded
            @click="isComponentModalActive = true"
          >
            What do these values mean?
          </b-button>

          <b-modal
            v-model="isComponentModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="true"
            aria-role="dialog"
            aria-label="Example Modal"
            aria-modal
          >
            <div class="modal-card">
              <header class="modal-card-head">
                <h1 class="modal-card-title">Diagram of Needle Measurements</h1>
                <button
                  type="button"
                  class="delete"
                  @click="isComponentModalActive = false"
                />
              </header>
              <section class="modal-card-body">
                <img
                  class="diagram"
                  src="/diagram.jpg"
                  alt="Diagram of Needle Measurements"
                />
              </section>
              <footer class="modal-card-foot">
                <b-button
                  label="Close"
                  @click="isComponentModalActive = false"
                />
              </footer>
            </div>
          </b-modal>
        </div>
      </nav>
    </div>
    <div class="column is-9">
      <div class="card">
        <highcharts ref="needlesChart" :options="mapOptions"></highcharts>
      </div>
    </div>
  </div>
</template>
<script>
  import Needles from '~/static/data/needles.json';
  import StarterNeedles from '~/static/data/default-needles.json';

  export default {
    data() {
      return {
        isComponentModalActive: false,
        allNeedles: Needles,
        selectValues: [...StarterNeedles],
        mapOptions: {
          chart: { zoomType: 'x' },
          title: { text: 'Needle Comparison Chart' },
          subtitle: {
            text: 'Source: <a target="_blank" href="http://www.mintylamb.co.uk/suneedle/">http://www.mintylamb.co.uk/suneedle/</a>',
          },
          // This is the data decleration
          series: StarterNeedles,
          yAxis: {
            title: { text: 'Needle Diameter (mm)' },
            labels: {
              enabled: true,
            },
            reversed: true,
          },
          xAxis: {
            title: { text: 'Needle Station' },
            labels: {
              enabled: true,
            },
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          tooltip: { headerFormat: 'Richness:<br>', shared: true },
          responsive: {
            rules: [
              {
                condition: { maxWidth: 500 },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                  },
                },
              },
            ],
          },
        },
      };
    },
    methods: {
      updateArrayItem() {
        // When someone changes a needle value, update the chart
        this.mapOptions.series = this.selectValues;
      },
      addArrayItem() {
        // Pick out a random needle from all the needles
        const rand =
          this.allNeedles[Math.floor(Math.random() * this.allNeedles.length)];
        // Update the needle values which automatically triggers a redraw
        StarterNeedles.push(rand);
        this.selectValues.push(rand);
      },
      removeArrayItem(currentItem) {
        // Find the index of the item you wanna remove
        const itemIndex = this.selectValues.indexOf(currentItem);
        // Remove the specific needle value which automatically triggers a redraw
        StarterNeedles.splice(itemIndex, 1);
        this.selectValues.splice(itemIndex, 1);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .is-fullwidth {
    width: 100%;
  }
  .remove-button {
    margin-right: 5px;
  }

  .diagram {
    max-height: 600px;
    width: auto;
    margin: auto;
    display: inline-block;
  }
</style>

<style lang="scss">
  .highcharts-credits {
    display: none !important;
  }
  .configurator-component .button .icon,
  .button .icon.is-small {
    height: 1rem;
    width: 1rem;
  }
</style>
