<template>
  <!-- <div class="nested-grid">

  </div> -->

   <b-table
      ref="thisTable"
      show-empty
      small
      hover
      :busy="isBusy"
      fixed
      :sticky-header="getStickyHeader"
      :responsive="getReponsive"
      :items="comp_items"
      :fields="fields"
      :thead-class="getHeadClass"
      tbody-tr-class="row-class"
      foot-clone tfoot-class="foot-class"
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
          :style="fieldWidthCalc(field.key)"
        >
      </template>

      <template v-slot:head(col1)="row">
        <span class="text-info"></span>
      </template>

      <template v-slot:cell(col1)="row">
        <div @click="checkToogleRow(row)" class="row-header">
          <v-icon>{{ row.detailsShowing ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
          {{ row.value }}
        </div>
      </template>

      <!-- <template v-slot:cell(defBacklog)="row">
        <span @click="$eventHub.$emit('defbacklog-clicked', row, parentLevel)" style="cursor:pointer">{{ formatNumber(row.value) }}</span>
      </template>       -->

<!-- <slot v-slot:cell()="row" :row="row" :parentLevel="parentLevel" name="customcell">{{ formatNumber(row.value) }}</slot>  -->
      <template v-slot:cell()="row">
       <!-- <span>{{ formatNumber(row.value) }}</span>     -->
       <slot :row="row" :parentLevel="parentLevel" name="customcell">{{ formatNumber(row.value) }}</slot>
      </template>

      <template v-slot:row-details="row">
        <NestedGrid2
          :fields="fields"
          :parent-level="level"
          :field-width-calc="fieldWidthCalc"
          :show-child-header="showChildHeader"
          :dataAPI="row.item.childAPI"
          :class="generateClassId"
          >
          <template slot="customcell" slot-scope="scope" >
            <slot :row="row" :parentLevel="parentLevel" name="customcell">ok</slot>
          </template>

        </NestedGrid2>
      </template>

      <!-- Footer templates v-on:defbacklog-clicked="defbacklogClicked" -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="footer-total">Total</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <span>{{ calcItemsPlus(data.column, comp_items) }}</span>
      </template>


    </b-table>
</template>

<style scoped>

</style>
<style>
.table.b-table.fixed-rowheader > thead > tr > th:nth-child(1),
.table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1){
  position: -webkit-sticky;
  position:sticky;
  left: 0px;
}
/* nested grid cell value colors */
.nested-grid .foot-class span,
.nested-grid .table.b-table > tbody > tr > td > span{
  color: blue;
}
.nested-grid .grid2 .foot-class span,
.nested-grid .grid2 .table.b-table > tbody > tr > td > span{
  color: red;
}
.nested-grid .grid3 .foot-class span,
.nested-grid .grid3 .table.b-table > tbody > tr > td > span{
  color: orangered;
}
.nested-grid .grid4 .foot-class span,
.nested-grid .grid4 .table.b-table > tbody > tr > td > span{
  color: green;
}
.nested-grid .grid5 .foot-class span,
.nested-grid .grid5 .table.b-table > tbody > tr > td > span{
  color: darkgreen;
}

.head-class.hidden-header{
  display:none;
}

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
.grid5 .footer-total{
  margin-left: 161px;
}

.grid2 .row-header{
  margin-left: 32px;
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
.nested-grid.grid2 .table.b-table > thead > tr > th:nth-child(1),
.nested-grid.grid2 .table.b-table > tbody > tr > td:nth-child(1),
.nested-grid.grid2 .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left;
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
}

.nested-grid .table.b-table > thead > tr > th:nth-child(7),
.nested-grid .table.b-table > tbody > tr > td:nth-child(7),
.nested-grid .table.b-table > tfoot > tr > th:nth-child(7),
.nested-grid .table.b-table > thead > tr > th:nth-child(9),
.nested-grid .table.b-table > tbody > tr > td:nth-child(9),
.nested-grid .table.b-table > tfoot > tr > th:nth-child(9) {
    background-color: #eee;
}

.grid2 .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1){
  position: sticky;
  left:0px;
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
  name: 'NestedGridSlot',
  mixins: [mixin, nestedgridfx],
  components: {
    NestedGrid2: () => import('./NestedGridSlot.vue'),
  },
  props: {
    dataApi: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    fields: Array,
    fieldWidthCalc: {
      type: Function,
      default: (key) =>
        // console.log("local calc level ")
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),

    },
    parentLevel: {
      type: Number,
      default: 1,
    },
    showChildHeader: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    isBusy: false,
    local_items: [
      {
        id: 1,
        col1: 'Detection Slot',
        Currency: 'USD',
        actSales: 500,
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
        childAPI: '/startbusiness/root/1',
      },
      {
        id: 2,
        col1: 'Defense & Aerospace',
        Currency: 'USD',
        actSales: 51000,
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
    defbacklogClicked(_row, _level) {
      this.$emit('defbacklog-clicked', _row, _level);
    },
  },
  computed: {
    ...mapGetters({
      fields1: 'getSABFields',
    }),
    level() {
      return this.parentLevel + 1;
    },
    generateClassId() {
      return `grid${this.level}`;
    },
    comp_items() {
      // return this.local_items || this.items

      if (this.items.length > 0) return this.items;
      return this.local_items;
    },
    getHeadClass() {
      return (this.parentLevel > 1 && !this.showChildHeader) ? 'head-class hidden-header' : 'head-class';
    },
    getReponsive() {
      return (this.parentLevel === 1);
    },
    getStickyHeader() {
      // calc(100vh - 140px)
      return (this.parentLevel === 1) ? 'calc(100vh - 140px)' : false;
    },
  },
  mounted() {
    console.log('mounted', this.$slots, this.$refs.thisTable.$slots, this.$refs.thisTable.$scopedSlots);
    if (this.autoDrill) {
      this.collapseExpand();
    }
  },
  beforeDestroy() {
    console.log('before destroy', this.level);
  },
};
</script>
