<template>
  <div class="demand-actuals-nest-grid">
    <b-table
      ref="thisTable"
      show-empty
      small
      fixed
      sticky-header="calc(100vh - 165px)"
      responsive
      :items="items"
      :fields="fields"
      :thead-class=" showHeader ? 'head-class' : 'd-none'"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      class="fixed-rowheader"
      >

      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="colwidthCalc(field.key)"
        >
      </template>

      <!-- <template v-slot:cell(actions)="row">
        <v-btn icon small @click="row.toggleDetails" max-width="24px" max-height="24px">
          <v-icon small v-if="!row.detailsShowing">mdi-chevron-right</v-icon>
          <v-icon small v-else>mdi-chevron-down</v-icon>
        </v-btn>
      </template> -->

      <template v-slot:cell(col1)="row">
        <div @click="toggleRow(row)" class="row-header">
          <v-icon>{{ row.detailsShowing ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
          {{ row.value }}
        </div>
      </template>

      <template v-slot:cell(actions)="row">
        <!-- <v-btn icon small v-if="row.detailsShowing">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>    -->
        <v-tooltip bottom v-if="row.detailsShowing">
          <template v-slot:activator="{ on }">
              <v-btn small icon v-on="on" @click="saveEntries(row.item)">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>{{ `Save ${row.item.col1}` }}</span>
        </v-tooltip>
      </template>

      <template v-slot:cell()="row">
        <!-- <span>{{ formatNumber(row.value) }}</span>    -->
        <div @click="toggleRow(row)" class="row-header" style="width:100%;height:40px">
        </div>
      </template>

      <template v-slot:head(col1)="row">
        <span class="text-info"></span>
      </template>

      <template v-slot:row-details="row">
        <DemandActualsGrid :ref="`bookforecast${row.item.siteid}`" :showHeaders="showHeader" :siteinfo="row.item" class="grid2" />
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="footer-total">Total</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <div>{{ calcItems(data.column) }}</div>
      </template>
    </b-table>
  </div>
</template>

<style scoped>

</style>
<style>
.demand-actuals-nest-grid .row-class{
  /* background-color: #aaa; */
  background-color: #aad4b4;
  color:black;
  font-weight: bold;
}
.demand-actuals-nest-grid .grid2 .row-class{
  font-weight: normal;
}
.demand-actuals-nest-grid .row-class td{
  padding: 0px;
}
.demand-actuals-nest-grid .grid2 .row-class{
  background-color: white;
  color:black;
  border-bottom: 2px solid #bbb;
}
.demand-actuals-nest-grid .grid2 .row-class:last-child{
  border-bottom: 1px solid #bbb;
}
.demand-actuals-nest-grid .grid3 .row-class{
  border-bottom: 1px solid green;
}
/* .demand-actuals-nest-grid .grid2 .row-class:nth-child(even){
  background-color: red;
} */
/* nested grid cell value colors */
.demand-actuals-nest-grid .foot-class span,
.demand-actuals-nest-grid .table.b-table > tbody > tr > td > span{
  color: blue;
  color: #555;
}
/* .demand-actuals-nest-grid .grid2 .foot-class span,
.demand-actuals-nest-grid .grid2 .table.b-table > tbody > tr > td > span{
  color: red;
} */
.demand-actuals-nest-grid .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.demand-actuals-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.demand-actuals-nest-grid .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left !important;
}
.demand-actuals-nest-grid .grid2 .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.demand-actuals-nest-grid .grid2 .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.demand-actuals-nest-grid .grid2 .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left !important;
}
/* .demand-actuals-nest-grid .grid3 .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.demand-actuals-nest-grid .grid3 .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.demand-actuals-nest-grid .grid3 .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: center !important;
} */
.demand-actuals-nest-grid .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(2),
.demand-actuals-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row:nth-child(2){
  left: 200px;
  z-index: 5 !important;
}
.demand-actuals-nest-grid .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(1),
.demand-actuals-nest-grid .b-table-sticky-header > .table.b-table > thead > tr > th:nth-child(2){
  background-color: white;
  z-index: 5 !important;
}
.demand-actuals-nest-grid .grid3 > .table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.demand-actuals-nest-grid .grid3 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.demand-actuals-nest-grid .grid3 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1){
  left: 200px;
  z-index: 5;
  background-color: #eee;
  text-align: center !important;
}
.demand-actuals-nest-grid .grid3 > .table.b-table.fixed-rowheader > tfoot > tr > th{
  text-align: center !important;
}

/* .demand-actuals-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td.fixed-sub-header {
    position: -webkit-sticky;
    position: sticky;
    top: 38px;
    z-index: 2;
    background-color: #aad4b4;
} */
.demand-actuals-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row {
    background-color: #aad4b4;
}

.demand-actuals-nest-grid tr.row-class > td:nth-child(9) {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    right: 0px;
}
/* .demand-actuals-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row:nth-child(1) {
    background-color: red;
} */
.footer-total{
  margin-left: 26px;
}
.demand-actuals-nest-grid .grid2 .footer-total{
  margin-left: 59px;
}

.demand-actuals-nest-grid .grid3 .row-header{
  text-align: center;
  margin-left: 0px !important;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import nestedgridfx from '../../mixin/nested-table-functions.js';

export default {
  name: 'DemandActualsNestGrid',
  mixins: [mixin, nestedgridfx],
  components: {
    DemandActualsGrid: () => import('./DemandActualsGrid.vue'),
  },
  props: {
    items1: Array,
  },
  data: () => ({
    showHeader: false,
    items: [
      {
        siteid: 1,
        col1: 'Asslar',
      },
      {
        siteid: 2,
        userid: 300,
        col1: 'Batam',
      },
      {
        siteid: 3,
        userid: 300,
        col1: 'Shenzhen',
      },
      {
        siteid: 4,
        userid: 300,
        col1: 'Manila',
      },
      {
        siteid: 5,
        userid: 300,
        col1: 'Singapore',
      },
      {
        siteid: 6,
        userid: 300,
        col1: 'Montreal',
      },
      {
        siteid: 7,
        userid: 300,
        col1: 'St. Asaph',
      },
    ],
  }),
  methods: {
    saveEntries(obj) {
      try {
        if (obj.siteid) {
          const x = `bookforecast${obj.siteid}`;
          console.log('saveEntries', obj, x, this.$refs[x]);
          if (this.$refs[x]) {
            this.$refs[x].saveEntries();
          }
        }
      } catch (er) {
        console.error('BookingsForecastNestGrid.saveEntries', er);
      }
    },
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '200px'
          : (key === 'entryForm') ? '680px'
            : (key === 'actions') ? '40px'
              : (key === 'month') ? '80px'
                : '100px',
      };
    },
    toggleRow(row) {
      // console.log(row);
      row.toggleDetails();
    },
    checkToogleRow(row) {
      console.log(row);
      if (row.item.childAPI) {
        row.toggleDetails();
      }
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getDemandActualFields',
      autoDrill: 'getAutoExpand',
    }),
  },
  mounted() {
    console.log('mounted', this, this.$refs);
    this.showHeader = this.isStickySupported();
  },
};
</script>
