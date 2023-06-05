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
        </div>
      </div>
      <!-- <div
        v-if="index === 2 || index === 4"
        :key="`${name}-${index}-ad`"
        class="column is-12"
      >
        <Adsense
          class="adsbygoogle"
          style="display: block"
          data-ad-client="ca-pub-0523971861051053"
          data-ad-slot="1918786408"
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
        </Adsense>
      </div> -->
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
