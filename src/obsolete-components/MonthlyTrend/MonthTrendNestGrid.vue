<template>
  <div class="month-trend-nest-grid">
    <b-table
      ref="thisTable"
      show-empty
      small
      fixed
      sticky-header="calc(100vh - 140px)"
      responsive
      :items="items"
      :fields="fields"
      thead-class="head-class"
      tbody-tr-class="row-class"
      foot-clone tfoot-class="foot-class"
      class="fixed-rowheader"
      style="height:calc(100vh - 140px)"
      @refresh="tableRefreshed"
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

      <template v-slot:cell(q1)="row">
        <span>{{ calcQuarter(row, 1) }}</span>
      </template>

      <template v-slot:cell(q2)="row">
        <span>{{ calcQuarter(row, 2) }}</span>
      </template>

      <template v-slot:cell(q3)="row">
        <span>{{ calcQuarter(row, 3) }}</span>
      </template>

      <template v-slot:cell(q4)="row">
        <span>{{ calcQuarter(row, 4) }}</span>
      </template>

      <template v-slot:cell(total)="row">
        <span>{{ calcRowTotal(row) }}</span>
      </template>


      <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>

      <template v-slot:head(col1)="row">
        <span class="text-info"></span>
      </template>

      <template v-slot:row-details="row">
        <MonthTrendGrid :fields="fields" :dataAPI="row.item.childAPI" class="grid2" />
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="footer-total">Total</span>
      </template>

      <template v-slot:foot(Currency)="data">
        <span class="text-danger"></span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <span>{{ calcItems(data.column) }}</span>
      </template>
    </b-table>
  </div>
</template>

<style scoped>

</style>
<style>

/* nested grid cell value colors */
.month-trend-nest-grid .foot-class span,
.month-trend-nest-grid .table.b-table > tbody > tr > td > span{
  color: blue;
}
.month-trend-nest-grid .grid2 .foot-class span,
.month-trend-nest-grid .grid2 .table.b-table > tbody > tr > td > span{
  color: red;
}
.month-trend-nest-grid .grid3 .foot-class span,
.month-trend-nest-grid .grid3 .table.b-table > tbody > tr > td > span{
  color: orangered;
}
.month-trend-nest-grid .grid4 .foot-class span,
.month-trend-nest-grid .grid4 .table.b-table > tbody > tr > td > span{
  color: green;
}
.month-trend-nest-grid .grid5 .foot-class span,
.month-trend-nest-grid .grid5 .table.b-table > tbody > tr > td > span{
  color: darkgreen;
}

/* .month-trend-nest-grid .foot-class span{
  font-size: 0.8rem;
  font-weight: bold;
} */


.table.b-table > tbody > tr.b-table-details > td {
    padding:0px;
}

.row-header{
  cursor:pointer;
}

.footer-total{
  margin-left: 26px;
}
.grid2 .footer-total{
  margin-left: 59px;
}
.grid3 .footer-total{
  margin-left: 91px;
}
.grid4 .footer-total{
  margin-left: 123px;
}
.grid5 .footer-total{
  margin-left: 142px;
}

.month-trend-nest-grid .grid2 .row-header{
  margin-left: 60px;
}
.grid3 .row-header{
  margin-left: 64px;
}
.grid4 .row-header{
  margin-left: 96px;
}
.grid5 .row-header{
  margin-left: 142px;
}

/* row headers version 2 - bundled cell*/
/* .table.b-table > thead > tr > th:nth-child(1),
.table.b-table > tbody > tr > td:nth-child(1),
.table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left;
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
} */

.month-trend-nest-grid .table.b-table > thead > tr > th:nth-child(5),
.month-trend-nest-grid .table.b-table > tbody > tr > td:nth-child(5),
.month-trend-nest-grid .table.b-table > tfoot > tr > th:nth-child(5),
.month-trend-nest-grid .table.b-table > thead > tr > th:nth-child(9),
.month-trend-nest-grid .table.b-table > tbody > tr > td:nth-child(9),
.month-trend-nest-grid .table.b-table > tfoot > tr > th:nth-child(9),
.month-trend-nest-grid .table.b-table > thead > tr > th:nth-child(13),
.month-trend-nest-grid .table.b-table > tbody > tr > td:nth-child(13),
.month-trend-nest-grid .table.b-table > tfoot > tr > th:nth-child(13),
.month-trend-nest-grid .table.b-table > thead > tr > th:nth-child(17),
.month-trend-nest-grid .table.b-table > tbody > tr > td:nth-child(17),
.month-trend-nest-grid .table.b-table > tfoot > tr > th:nth-child(17) {
    background-color: #eee;
}
.month-trend-nest-grid .table.b-table > thead > tr > th:nth-child(18),
.month-trend-nest-grid .table.b-table > tbody > tr > td:nth-child(18),
.month-trend-nest-grid .table.b-table > tfoot > tr > th:nth-child(18) {
    background-color: #e6e6e6;
}

/* .row-class{
  font-size: 0.8em;
}
.table td{
  vertical-align: middle;
} */
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import nestedgridfx from '../../mixin/nested-table-functions.js';
import mtmixin from './mt-mixin.js';

export default {
  name: 'MonthTrendNestGrid',
  mixins: [mixin, nestedgridfx, mtmixin],
  components: {
    MonthTrendGrid: () => import('./MonthTrendGrid.vue'),
  },
  props: {
    items1: Array,
    reportType: Number,
  },
  data: () => ({
    calcQ1: null,
    calcQ2: null,
    calcQ3: null,
    calcQ4: null,
    items: [
      {
        id: 1,
        col1: 'Commercial',
        jan: 100,
        feb: 500,
        mar: 23555,
        apr: 3452,
        may: 123,
        jun: 123,
        jul: 123,
        aug: 123,
        sep: 123,
        oct: 123,
        nov: 123,
        dec: 123,
        q1: 5,
        q2: null,
        q3: null,
        q4: null,
        total: null,
      },
      {
        id: 2,
        col1: 'Defense and Aerospace',
        jan: 1,
        feb: 1,
        mar: 1,
        apr: 1,
        may: 1,
        jun: 1,
        jul: 1,
        aug: 1,
        sep: 1,
        oct: 1,
        nov: 1,
        dec: 1,
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        total: null,
      },
    ],
  }),
  methods: {
    toggleRow(row) {
      console.log(row);
      row.toggleDetails();
    },
    checkToogleRow(row) {
      console.log(row);
      if (row.item.childAPI) {
        row.toggleDetails();
      }
    },
    tableRefreshed() {
      console.log('tableRefreshed');
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getMonthlyTrendFields',
      autoDrill: 'getAutoExpand',
    }),
  },
  mounted() {
    console.log('mounted', this, this.$refs);
    if (this.autoDrill) {
      this.collapseExpand();
    }
  },
  updated() {
    console.log('updated');
  },
};
</script>
