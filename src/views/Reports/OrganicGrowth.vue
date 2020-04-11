<template>
  <v-card class="organic-growth">
    <v-toolbar color="green" dense>

      <v-toolbar-title style="color:white">
        Organic Growth
        <span class="v-toolbar__title" style="color:white" v-if="periodDescription !== ''">{{ ` ${periodDescription}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>
    <div style="padding:10px;height:100vh">
      <!-- <NestedGrid1 id="organicGrowth" ref="organicGrowth"
        :items="items"
        :fields="fields"
        :field-width-calc="colwidthCalc"
        :show-child-header="false"
        v-on:defbacklog-clicked="defbacklogClicked" /> -->

      <NestGrid
        id="organicGrowth"
        ref="organicGrowth"
        :fields="fields"
        :show-child-header="false"
        :footer-variance-mode="false"
        :field-width-calc="colwidthCalc"
        :totals-footer-func="getFooterTotalLabel"
        :text-offset-level="offsetLevel"
        :dataAPI="dataAPI"
        :auto-expand="true"
      />
    </div>
  </v-card>
</template>
<style>
#organicGrowth {
    max-width: 1050px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#organicGrowth {
  max-height: calc(100vh - 160px);
  /* height: calc(100vh - 160px); */
}
#organicGrowth .table.b-table > thead > tr > th:nth-child(8),
#organicGrowth .table.b-table > tbody > tr > td:nth-child(8),
#organicGrowth .table.b-table > tfoot > tr > th:nth-child(8),
#organicGrowth .table.b-table > thead > tr > th:nth-child(10),
#organicGrowth .table.b-table > tbody > tr > td:nth-child(10),
#organicGrowth .table.b-table > tfoot > tr > th:nth-child(10){
  background-color: #eee;
}

/* SPECIAL GRID CONFIGURATION FOR ORGANIC GROWTH REPORT. DO NOT ALTER */
#organicGrowth .table.b-table.grid2 tbody > tr {
  background: white;
  color:inherit;
  font-size: 0.8rem;
}
#organicGrowth .table.b-table.grid2 tbody > tr > td > div.row-header{
  display: block;
}

#organicGrowth .table.b-table.grid2 tbody > tr > td {
  display: table-cell;
}
#organicGrowth .table.b-table.grid3 > tfoot > tr,
#organicGrowth .table.b-table.grid4 > tfoot > tr {
  background: green;
  display: none;
}
#organicGrowth .table.b-table tbody > tr {
  background: #eee;
  color: transparent;
  font-size: 0.001rem;
}
#organicGrowth .table.b-table tbody > tr > td > div.row-header{
  display: none;
}
#organicGrowth .table.b-table.grid2 > tfoot > tr{
  background: white;
}
#organicGrowth .table.b-table tfoot > tr {
  background: white;
}
/* END OF SPECIAL CONFIGURATION */


</style>
<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'OrganicGrowth',
  components: {
    NestGrid: () => import('../../components/NestedGrids/NestedGridCompare.vue'),
  },
  mixins: [mixin],
  data: () => ({
    expand: true,
    dataAPI: '/organicgrowth/1/1',
    offsetLevel: 4,
    items: [],
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '300px' : key === 'actions' ? '32px' : '70px',
      };
    },
    getFooterTotalLabel(data){
      if (data.field.parentCategory) return `${data.field.parentCategory} Totals`
      return 'Totals'
    },
    toggleExpand() {
      this.expand = !this.expand;
      this.$refs.organicGrowth.refreshData();
    },
    updateTable() {
      if (this.$refs.organicGrowth) this.$refs.organicGrowth.refreshData();
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getOrganicGrowthFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters',
    }),
  },
  mounted() {
    this.$eventHub.$on('period-changed', this.updateTable);
    this.$eventHub.$on('refresh', this.updateTable)
    this.configurePeriodDialog([2], false);
  },
  beforeDestroy() {
    this.$eventHub.$off('period-changed', this.updateTable);
    this.$eventHub.$off('refresh', this.updateTable)
  },
  updated() {
  },
};
</script>
