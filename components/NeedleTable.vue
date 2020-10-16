<template>
  <div class="column is-12">
    <template v-for="(table, name, index) in tables">
      <div :key="index" class="column is-12">
        <b-collapse
          animation="slide"
          :open="index > 0 ? false : true"
          class="card"
          aria-id="contentIdForA11y3"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <h2 class="card-header-title">
              <i :class="table.icon"></i>
              <span class="pl-2">{{ table.title }}</span>
            </h2>
            <a href="#" class="card-header-icon" aria-label="more options">
              <b-icon
                pack="fas"
                :icon="props.open ? 'chevron-down' : 'chevron-up'"
              />
            </a>
          </div>
          <div class="card-content">
            <b-table
              :data="table.items"
              :columns="table.columns"
              :narrowed="true"
              :hoverable="true"
              :paginated="table.items.length >= 14 ? true : false"
              :per-page="10"
              icon-pack="fas"
              :mobile-cards="false"
            />
          </div>
        </b-collapse>
      </div>
    </template>
  </div>
</template>
<script>
import needlesTables from '~/static/data/suggestedNeedles.json';

export default {
  data () {
    return {
      pagination: {},
      tables: needlesTables
    };
  }
};
</script>
<style lang="scss" scoped>
.card-header {
  background-color: whitesmoke;
}
</style>
