<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fad fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fad fa-info-circle" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fad fa-cogs" aria-hidden="true"></i>
                </span>
                <span>Engine Sizes</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="columns">
          <div class="column is-8">
            <h1 class="title">
              Engine Displacement and Sizes
            </h1>
            <p>
              Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!
            </p>
          </div>
          <div class="column is-4">
            <nuxt-link :to="'/technical/compression'" :title="'Link to Compression Calculator'">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <picture>
                          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp" type="image/webp">
                          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png" type="image/png">
                          <img src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png">
                        </picture>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="subtitle">
                        Trying to calculate your compression ratio?
                      </h2>
                      <p>Click here to try out our compression ratio calculator.</p>
                    </div>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <p class="pb-3">Note: All specs below are based on <strong>standard stroke</strong> engines.</p>
        <div class="card">
          <div class="card-content">
            <b-table
              :data="data"
              :columns="columns"
              :selected.sync="selected"
              :hoverable="true"
              :row-class="(row, index) => row.group !== '' && 'has-background-light has-text-weight-bold'"
            >
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      data: [
        // 850cc Engines
        {
          group: '850\'s',
          engineSize: '',
          boreSize: '',
          overBore: ''
        },
        {
          group: '',
          engineSize: '850cc',
          boreSize: '2.58" / 62.9mm',
          overBore: '----'
        },
        {
          group: '',
          engineSize: '----',
          boreSize: '----',
          overBore: '+020'
        },
        {
          group: '',
          engineSize: '----',
          boreSize: '----',
          overBore: '+030'
        },
        {
          group: '',
          engineSize: '----',
          boreSize: '----',
          overBore: '+040'
        },
        // 998cc Engines
        {
          group: '998\'s',
          engineSize: '',
          boreSize: '',
          overBore: ''
        },
        {
          group: '',
          engineSize: '998cc',
          boreSize: '2.543" / 64.57mm',
          overBore: '----'
        },
        {
          group: '',
          engineSize: '1014cc',
          boreSize: '----',
          overBore: '+020'
        },
        {
          group: '',
          engineSize: '----',
          boreSize: '----',
          overBore: '+030'
        },
        {
          group: '',
          engineSize: '----',
          boreSize: '----',
          overBore: '+040'
        },
        {
          group: '1275\'s',
          engineSize: '',
          boreSize: '',
          overBore: ''
        },
        // 1275cc Engines
        {
          group: '',
          engineSize: '1275cc',
          boreSize: '2.78" / 70.6mm',
          overBore: '----'
        },
        {
          group: '',
          engineSize: '1293cc',
          boreSize: '2.801" / 71.145mm',
          overBore: '+020'
        },
        {
          group: '',
          engineSize: '1302cc',
          boreSize: '2.811" / 71.4mm',
          overBore: '+030'
        },
        {
          group: '',
          engineSize: '1311cc',
          boreSize: '2.821" / 71.65mm',
          overBore: '+040'
        },
        {
          group: '',
          engineSize: '1330cc',
          boreSize: '2.841" / 72.16mm',
          overBore: '+060'
        },
        {
          group: '',
          engineSize: '----',
          boreSize: '2.8745" / 73.01mm',
          overBore: '+094'
        },
        {
          group: '',
          engineSize: '1380',
          boreSize: '2.894" / 73.51mm',
          overBore: '+1135'
        }
      ],
      selected: null,
      columns: [
        {
          field: 'group',
          label: 'Group',
          width: '100'
        },
        {
          field: 'engineSize',
          label: 'Engine Size'
        },
        {
          field: 'overBore',
          label: 'Over Bore'
        },
        {
          field: 'boreSize',
          label: 'Bore Size'
        }
      ]
    };
  },
  head () {
    return {
      title: 'Technical - Engine Sizes/Displacements',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you\'d like your next build to be!'
        },
        {
          property: 'og:title',
          content: 'Technical - Workshop Manuals'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.is-amazon {
  color: white;
  font-size: 1rem;
  background-color: #febd69;
}
</style>
