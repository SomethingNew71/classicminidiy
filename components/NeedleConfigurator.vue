<template>
  <div class="columns is-multiline configurator-component">
    <div class="column is-8 is-offset-2 card">
      <div class="card-content">
        <h3 class="fancy-font-bold is-size-4 pb-3">Add a Needle To Compare</h3>
        <p class="pb-3">
          Adding a needle is as simple as starting to type the name of the
          needle in the box below. You can also use the dropdown menu to scroll
          through the list of availble options. Unsure of what the graph values
          mean? Check out
          <a
            class="has-text-weight-bold"
            href="#"
            @click="isComponentModalActive = true"
            >this helpful diagram</a
          >
          to learn more.
        </p>
        <b-field class="is-fullwidth" expanded>
          <b-autocomplete
            v-model="addNeedleValue"
            expanded
            :data="filteredDataObj"
            :open-on-focus="true"
            placeholder="Needle Name"
            field="name"
            @select="(option) => (addNeedleSelection = option)"
          >
          </b-autocomplete>
          <b-button
            type="is-primary"
            icon-pack="fas"
            icon-left="plus"
            aria-label="Click here to add another needle with a generic value"
            :disabled="selectValues.length === 10 || !addNeedleSelection"
            @click="addArrayItem()"
          ></b-button>
          <b-message v-if="existsError" type="is-warning" class="my-3">
            This needle already exists on the chart.
          </b-message>
        </b-field>
        <b-field grouped group-multiline>
          <div
            v-for="(value, needle) in selectValues"
            :key="needle"
            class="control"
          >
            <b-tag
              type="is-primary is-light"
              size="is-medium"
              attached
              closable
              :disabled="selectValues.length === 1"
              :aria-close-label="
                'Click here to remove the ' + selectValues[needle] + ' needle'
              "
              @close="removeArrayItem(selectValues[needle])"
            >
              {{ selectValues[needle].name }}
            </b-tag>
          </div>
        </b-field>
      </div>
    </div>
    <div class="column is-12">
      <div class="card">
        <highcharts ref="needlesChart" :options="mapOptions"></highcharts>
      </div>
    </div>
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
          <b-button label="Close" @click="isComponentModalActive = false" />
        </footer>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import Needles from '~/static/data/needles.json';
  import StarterNeedles from '~/static/data/default-needles.json';
  export default {
    data() {
      return {
        Needles,
        existsError: false,
        addNeedleValue: '',
        addNeedleSelection: null,
        isComponentModalActive: false,
        selectValues: undefined,
        mapOptions: {
          chart: { zoomType: 'x' },
          title: { text: 'Needle Comparison Chart' },
          exporting: {
            buttons: {
              contextButton: {
                symbol: 'download',
              },
            },
          },
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
    computed: {
      filteredDataObj() {
        return this.Needles.filter((needle) => {
          return (
            needle.name
              .toString()
              .toLowerCase()
              .includes(this.addNeedleValue.toLowerCase()) >= 0
          );
        });
      },
    },
    created() {
      this.initializeNeedles();
    },
    methods: {
      initializeNeedles() {
        // Check to see if there are any pre-selected needles in the store
        const cachedNeedles = this.$store.getters.needles;
        if (cachedNeedles) {
          this.selectValues = [...cachedNeedles];
        } else {
          this.selectValues = [...StarterNeedles];
          this.$store.commit('updateNeedles', this.selectValues);
        }
      },
      updateArrayItem() {
        // When someone changes a needle value, update the chart
        this.mapOptions.series = this.selectValues;
        this.$store.commit('updateNeedles', this.selectValues);
      },
      addArrayItem() {
        this.existsError = this.selectValues.some(
          (obj) => obj.name === this.addNeedleSelection.name
        );
        if (this.existsError) {
          setTimeout(() => {
            this.existsError = false;
          }, 5000);
        } else {
          StarterNeedles.push(this.addNeedleSelection);
          this.selectValues.push(this.addNeedleSelection);
          this.$store.commit('updateNeedles', this.selectValues);
        }
      },
      removeArrayItem(currentItem) {
        // Find the index of the item you wanna remove
        const itemIndex = this.selectValues.indexOf(currentItem);
        // Remove the specific needle value which automatically triggers a redraw
        StarterNeedles.splice(itemIndex, 1);
        this.selectValues.splice(itemIndex, 1);
        this.$store.commit('updateNeedles', this.selectValues);
      },
      warning() {
        this.$buefy.snackbar.open({
          message: 'This',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Retry',
          indefinite: true,
          onAction: () => {
            this.$buefy.toast.open({
              message: 'Action pressed',
              queue: false,
            });
          },
        });
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
