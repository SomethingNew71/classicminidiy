<template>
  <div class="column is-12">
    <template v-for="(table, name, index) in tables">
      <div :key="index" class="column is-12">
        <o-collapse
          animation="slide"
          :open="true"
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
              <o-icon
                pack="fas"
                :icon="props.open ? 'chevron-down' : 'chevron-up'"
              />
            </a>
          </div>
          <div class="card-content">
            <o-table
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
        </o-collapse>
      </div>
      <div
        v-if="index === 2 || index === 4"
        :key="`${name}-${index}-ad`"
        class="column is-12"
      >
        <!-- <Adsense
          class="adsbygoogle"
          style="display: block"
          data-ad-client="ca-pub-0523971861051053"
          data-ad-slot="1918786408"
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
        </Adsense> -->
      </div>
    </template>
  </div>
</template>
<script>
  import needlesTables from '~/static/data/suggestedNeedles.json';

  export default {
    data() {
      return {
        pagination: {},
        tables: needlesTables,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
