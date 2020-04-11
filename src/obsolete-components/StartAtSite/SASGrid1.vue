<template>
  <div class="sas-net-grid">
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


      <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>

      <!-- <template v-slot:head(col1)="row">
        <span class="text-info"></span>
      </template> -->

      <template v-slot:row-details="row">
        <SASGrid2 :fields="fields" :dataAPI="row.item.childAPI" class="grid2" />
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
/* .sas-net-grid .foot-class span,
.sas-net-grid .table.b-table > tbody > tr > td > span{
  color: blue;
}
.sas-net-grid .grid2 .foot-class span,
.sas-net-grid .grid2 .table.b-table > tbody > tr > td > span{
  color: red;
}
.sas-net-grid .grid3 .foot-class span,
.sas-net-grid .grid3 .table.b-table > tbody > tr > td > span{
  color: orangered;
}
.sas-net-grid .grid4 .foot-class span,
.sas-net-grid .grid4 .table.b-table > tbody > tr > td > span{
  color: green;
}
.sas-net-grid .grid5 .foot-class span,
.sas-net-grid .grid5 .table.b-table > tbody > tr > td > span{
  color: darkgreen;
} */

/* .sas-net-grid .foot-class span{
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

.sas-net-grid .grid2 .row-header{
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

.sas-net-grid .table.b-table > thead > tr > th:nth-child(7),
.sas-net-grid .table.b-table > tbody > tr > td:nth-child(7),
.sas-net-grid .table.b-table > tfoot > tr > th:nth-child(7),
.sas-net-grid .table.b-table > thead > tr > th:nth-child(9),
.sas-net-grid .table.b-table > tbody > tr > td:nth-child(9),
.sas-net-grid .table.b-table > tfoot > tr > th:nth-child(9){
    background-color: #eee;
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

export default {
  name: 'SASGrid1',
  mixins: [mixin, nestedgridfx],
  components: {
    SASGrid2: () => import('./SASGrid2.vue'),
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
        col1: 'Asslar',
        Currency: 'USD',
        actSales: 10,
        BacklogCRD: 23555,
        ContractRelease: null,
        BookShip: 3452,
        DemandForecast: 123,
        defBacklog: 123,
        SalesForecast: 123,
        Target: 123,
        lastQtr: 123,
        lastYr: 123,
        VSeq: 123,
        VYoy: 123,
        OrgVyoy: 123,
        actBookings: 123,
        BookingsForecast: 123,
        BookToBill: 123,
      },
      {
        id: 2,
        col1: 'Batam',
        Currency: 'USD',
        actSales: 30,
        BacklogCRD: 23555,
        ContractRelease: null,
        BookShip: 3452,
        DemandForecast: 123,
        defBacklog: 123,
        SalesForecast: 123,
        Target: 123,
        lastQtr: 123,
        lastYr: 123,
        VSeq: 123,
        VYoy: 123,
        OrgVyoy: 123,
        actBookings: 123,
        BookingsForecast: 123,
        BookToBill: 123,
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
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '250px' : key === 'actions' ? '32px' : '70px',
      };
    },
    calcQuarter(row, qtr) {
      if (qtr === 1) {
        row.item.q1 = this.sumRowItems(['jan', 'feb', 'mar'], row, false);
        return this.formatNumber(row.item.q1);
      }
      if (qtr === 2) {
        row.item.q2 = this.sumRowItems(['apr', 'may', 'jun'], row, false);
        return this.formatNumber(row.item.q2);
      }
      if (qtr === 3) {
        row.item.q3 = this.sumRowItems(['jul', 'aug', 'sep'], row, false);
        return this.formatNumber(row.item.q3);
      }
      if (qtr === 4) {
        row.item.q4 = this.sumRowItems(['oct', 'nov', 'dec'], row, false);
        return this.formatNumber(row.item.q4);
      }
    },
    calcRowTotal(row) {
      row.item.total = this.sumRowItems(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'], row, false);
      return this.formatNumber(row.item.total);
    },
    tableRefreshed() {
      console.log('tableRefreshed');
    },
  },
  computed: {
    ...mapGetters({
      fields: 'getSABFields',
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
