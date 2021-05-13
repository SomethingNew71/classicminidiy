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
              <div class="card callout-card">
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
      <div class="column is-justify-content-end">
        <i class="fas fa-circle pl-1 has-text-success"></i> Standard
        <i class="fas fa-circle pl-1 has-text-primary"></i> Standard Overbore
        <i class="fas fa-circle pl-1 has-text-danger"></i> Different Stroke
      </div>
      <div class="column is-12">
        <div class="card">
          <div class="card-content">
            <b-table
              :data="data"
              narrowed
              :hoverable="true"
              :row-class="(row, index) => row.group !== '' && 'has-background-light has-text-weight-bold'"
            >
              <b-table-column v-slot="props" field="group" label="Group">
                {{ props.row.group }}
              </b-table-column>
              <b-table-column v-slot="props" field="engineSize" label="Engine Size">
                <template v-if="props.row.group === ''">
                  <i class="ref-icons fas fa-circle pl-1" :class="props.row.color"></i>
                </template>
                {{ props.row.engineSize }}
              </b-table-column>
              <b-table-column v-slot="props" field="overBore" label="Over Bore">
                {{ props.row.overBore }}
              </b-table-column>
              <b-table-column v-slot="props" field="boreSize" label="Bore Size">
                {{ props.row.boreSize }}
              </b-table-column>
              <b-table-column v-slot="props" field="stroke" label="Stroke">
                {{ props.row.stroke }}
              </b-table-column>
              <b-table-column v-slot="props" field="power" label="Power">
                {{ props.row.power }}
              </b-table-column>
              <b-table-column v-slot="props" field="torque" label="Torque">
                {{ props.row.torque }}
              </b-table-column>
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
          group: '850',
          type: '',
          color: '',
          engineSize: '',
          boreSize: '',
          overBore: '',
          stroke: '',
          power: '',
          torque: ''
        },
        {
          group: '',
          type: '',
          color: 'has-text-success',
          engineSize: '850cc',
          boreSize: '2.58" / 62.9mm',
          overBore: '----',
          stroke: '2.688" / 68.26mm (std)',
          power: '34bhp',
          torque: '44lb/ft'
        },
        // 997cc Cooper Engines
        {
          group: '997',
          type: '',
          color: '',
          engineSize: '',
          boreSize: '',
          overBore: '',
          stroke: '',
          power: '',
          torque: ''
        },
        {
          group: '',
          type: '',
          color: 'has-text-success',
          engineSize: '997cc',
          boreSize: '2.458 / 62.43mm',
          overBore: '----',
          stroke: '3.200" / 81.28mm (std)',
          power: '55bhp',
          torque: '54lb/ft'
        },
        // 998cc Engines
        {
          group: '998',
          type: '',
          color: '',
          engineSize: '',
          boreSize: '',
          overBore: '',
          stroke: '',
          power: '',
          torque: ''
        },
        {
          group: '',
          type: '',
          color: 'has-text-success',
          engineSize: '998cc',
          boreSize: '2.543" / 64.57mm',
          overBore: '----',
          stroke: '3.000" / 76.20mm (std)',
          power: '41bhp',
          torque: '52lb/ft'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1014cc',
          boreSize: '2.563" / 65.09mm',
          overBore: '+020',
          stroke: '3.000" / 76.20mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1030cc',
          boreSize: '2.583" / 65.60mm',
          overBore: '+040',
          stroke: '3.000" / 76.20mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1046cc',
          boreSize: '2.603" / 66.10mm',
          overBore: '+060',
          stroke: '3.000" / 76.20mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1098cc',
          boreSize: '2.543" / 64.58mm',
          overBore: '----',
          stroke: '3.296" / 83.72mm',
          power: '45bhp',
          torque: '56ft/lb'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1114cc',
          boreSize: '2.563" / 65.09mm',
          overBore: '+020',
          stroke: '3.296" / 83.72mm',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1132cc',
          boreSize: '2.583" / 65.60mm',
          overBore: '+040',
          stroke: '3.296" / 83.72mm',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1149cc',
          boreSize: '2.603" / 66.10mm',
          overBore: '+060',
          stroke: '3.296" / 83.72mm',
          power: '----',
          torque: '----'
        },
        // 1275cc Engines
        {
          group: '1275',
          type: '',
          color: '',
          engineSize: '',
          boreSize: '',
          overBore: '',
          stroke: '',
          power: '',
          torque: ''
        },
        {
          group: '',
          type: '',
          color: 'has-text-success',
          engineSize: '1275cc',
          boreSize: '2.78" / 70.6mm',
          overBore: '----',
          stroke: '3.200" / 81.28mm (std)',
          power: '63bhp',
          torque: '70lb/ft'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1293cc',
          boreSize: '2.801" / 71.145mm',
          overBore: '+020',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1302cc',
          boreSize: '2.811" / 71.4mm',
          overBore: '+030',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1311cc',
          boreSize: '2.821" / 71.65mm',
          overBore: '+040',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1330cc',
          boreSize: '2.841" / 72.16mm',
          overBore: '+060',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1361cc',
          boreSize: '73mm',
          overBore: '73.00',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1379cc',
          boreSize: '73.5mm',
          overBore: '73.50',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-primary',
          engineSize: '1398cc',
          boreSize: '74mm',
          overBore: '74.00',
          stroke: '3.200" / 81.28mm (std)',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1406cc',
          boreSize: '73mm',
          overBore: '73.00',
          stroke: '84.00mm',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1426cc',
          boreSize: '73.5mm',
          overBore: '73.50',
          stroke: '84.00mm',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1440cc',
          boreSize: '73mm',
          overBore: '73.00',
          stroke: '86.00mm',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1460cc',
          boreSize: '73.5mm',
          overBore: '73.50',
          stroke: '86.00mm',
          power: '----',
          torque: '----'
        },
        {
          group: '',
          type: '',
          color: 'has-text-danger',
          engineSize: '1479cc',
          boreSize: '74mm',
          overBore: '74.00',
          stroke: '86.00mm',
          power: '----',
          torque: '----'
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
          content: 'Technical - Engine Sizes/Displacements'
        },
        {
          property: 'og:image',
          content: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.ref-icons {
  font-size: 0.5rem;
  vertical-align: middle;
  padding-bottom: 2px;
}
</style>
