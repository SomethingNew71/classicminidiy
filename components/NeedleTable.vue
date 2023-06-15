<template>
  <div class="column is-12">
    <template v-for="(table, name, index) in tables" :key="index">
      <div class="column is-12">
        <div class="card">
          <div class="card-header">
            <h2 class="card-header-title">
              <i :class="table.icon"></i>
              <span class="pl-2">{{ table.title }}</span>
            </h2>
          </div>
          <div class="card-content">
            <client-only>
              <o-table
                :data="table.items"
                :narrowed="true"
                :hoverable="true"
                :paginated="table.items.length >= 14 ? true : false"
                :per-page="10"
                icon-pack="fas"
                :mobile-cards="false"
              >
                <o-table-column
                  field="engineSize"
                  label="Engine Size"
                  v-slot:default="props"
                >
                  <span v-html="props.row.engineSize"></span>
                </o-table-column>
                <o-table-column
                  field="needleStd"
                  label="Needle Std"
                  v-slot:default="props"
                >
                  <span v-html="props.row.needleStd"></span>
                </o-table-column>
                <o-table-column
                  field="needleRich"
                  label="Needle Rich"
                  v-slot:default="props"
                >
                  <span v-html="props.row.needleRich"></span>
                </o-table-column>
                <o-table-column
                  field="needleLean"
                  label="Needle Lean"
                  v-slot:default="props"
                >
                  <span v-html="props.row.needleLea"></span>
                </o-table-column>
                <o-table-column
                  field="springType"
                  label="Spring Type"
                  v-slot:default="props"
                >
                  <span v-html="props.row.springType"></span>
                </o-table-column>
              </o-table>
            </client-only>
          </div>
        </div>
      </div>
      <div
        v-if="index === 2 || index === 4"
        :key="`${name}-${index}-ad`"
        class="column is-12"
      >
        <adsbygoogle
          class="adsbygoogle"
          ad-style="display: block"
          ad-slot="1918786408"
          ad-format="auto"
        >
        </adsbygoogle>
      </div>
    </template>
  </div>
</template>
<script>
  import needlesTables from '~/data/suggestedNeedles.json';

  export default defineComponent({
    data() {
      return {
        pagination: {},
        tables: needlesTables,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
