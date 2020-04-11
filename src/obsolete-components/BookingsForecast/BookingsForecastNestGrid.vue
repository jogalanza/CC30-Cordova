<template>
  <div class="bookings-forecast-nest-grid">
    <b-table
      ref="thisTable"
      :busy="loading"
      show-empty
      small
      fixed
      sticky-header="calc(100vh - 160px)"
      responsive
      :items="items"
      :fields="fields"
      thead-class="head-class"
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
          <v-icon color="white">{{ row.detailsShowing ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
          {{ row.value }}
        </div>
      </template>

      <!-- <template v-slot:cell(actions)="row">
        <v-tooltip bottom v-if="row.detailsShowing">
          <template v-slot:activator="{ on }">
              <v-btn small icon v-on="on" @click="saveEntries(row.item)">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>{{ `Save ${row.item.col1}` }}</span>
        </v-tooltip>
      </template> -->

      <template v-slot:cell()="row">
        <!-- <span>{{ formatNumber(row.value) }}</span>    -->
        <div @click="toggleRow(row)" class="row-header" style="width:100%;height:40px">
        </div>
      </template>

      <template v-slot:head(col1)="row">
        <span class="text-info"></span>
      </template>

      <template v-slot:row-details="row">
        <BookingsForecastEntryGrid 
          :ref="`bookforecast${row.item.siteid}`" 
          :showHeaders="showHeader" 
          :siteinfo="row.item" 
          :local-currency="localCurrency"
          class="grid2" />
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
        <span>{{ calcItems(data.column) }}</span>
      </template>
    </b-table>
  </div>
</template>

<style scoped>

</style>
<style>
.bookings-forecast-nest-grid .row-class{
  /* background-color: #aaa; */
  background-color: #aad4b4;  
  color:black;
  color:white;
  text-shadow: none;
  font-weight: normal;
  text-transform: uppercase;
}
.grid2 .row-class{
  text-transform: none;
}
.bookings-forecast-nest-grid .grid2 .row-class{
  font-weight: normal;
}
.bookings-forecast-nest-grid .row-class td{
  padding: 0px;
}
.bookings-forecast-nest-grid .grid2 .row-class{
  background-color: white;
  color:black;
}
/* nested grid cell value colors */
.bookings-forecast-nest-grid .foot-class span,
.bookings-forecast-nest-grid .table.b-table > tbody > tr > td > span{
  color: blue;
}
.bookings-forecast-nest-grid .grid2 .foot-class span,
.bookings-forecast-nest-grid .grid2 .table.b-table > tbody > tr > td > span{
  color: red;
}
.bookings-forecast-nest-grid .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.bookings-forecast-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.bookings-forecast-nest-grid .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left !important;
}
.bookings-forecast-nest-grid .grid2 .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.bookings-forecast-nest-grid .grid2 .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.bookings-forecast-nest-grid .grid2 .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left !important;
}
.bookings-forecast-nest-grid tr.row-class > td:nth-child(14) {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    right: 0px;
}
.bookings-forecast-nest-grid .fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row {
    background-color: #aad4b4;
    background-color: #333333;
    letter-spacing: 0.2rem;
}
.footer-total{
  margin-left: 26px;
}
.bookings-forecast-nest-grid .grid2 .footer-total{
  margin-left: 59px;
}

.bookings-forecast-nest-grid .grid2 .row-header{
  margin-left: 24px;
  text-transform: none;
}
</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';
import nestedgridfx from '../../mixin/nested-table-functions.js';

export default {
  name: 'BookingsForecastNestGrid',
  mixins: [mixin, nestedgridfx],
  components: {
    BookingsForecastEntryGrid: () => import('./BookingsForecastEntryGrid.vue'),
  },
  props: {
    items: Array,
    localCurrency: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    showHeader: false,
    items1: [
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
        col1: 'Batam',
      },
      {
        siteid: 4,
        userid: 300,
        col1: 'Batam',
      },
      {
        siteid: 5,
        userid: 300,
        col1: 'Batam',
      },
      {
        siteid: 6,
        userid: 300,
        col1: 'Batam',
      },
      {
        siteid: 7,
        userid: 300,
        col1: 'Batam',
      },
    ],
  }),
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '200px'
          : (key === 'comments' || key === 'customerName' || key === 'reason' || key === 'partDescription') ? '120px'
            : (key === 'month' || key === 'year') ? '60px'
              : (key === 'actions') ? '40px'
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
      fields: 'getBookForecastFields',
      autoDrill: 'getAutoExpand',
    }),
  },
  updated(){
    // if (this.$refs.thisTable.$refs.itemRows && this.$refs.thisTable.$refs.itemRows.length === this.items.length){
    //   console.log('updated',this.$refs.thisTable.$refs)
    //   var _this = this
    //   this.$nextTick(() => {
    //     _this.collapseExpand();
    //   })      
    // }      
  },
  mounted() {
    console.log('mounted', this, this.$refs);
    // if (this.autoDrill){
    //this.collapseExpand();
    // }
  },
};
</script>
