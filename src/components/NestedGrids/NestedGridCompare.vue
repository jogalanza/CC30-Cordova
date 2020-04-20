<template>
   <b-table
      ref="thisTable"
      show-empty
      small
      :busy="isBusy"
      fixed
      :foot-clone="footClone"
      :hover="hover"
      :sticky-header="getStickyHeader"
      :responsive="getReponsive"
      :items="comp_items"
      :fields="fields"
      :thead-class="getHeadClass"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      class="fixed-rowheader"
      >

      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" style="margin-right:10px;width:20px;height:20px"></b-spinner>
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

      <!-- <template v-slot:head(col1)="row">
        <span class="text-info"></span>
      </template> -->

      <template v-slot:cell(col1)="row">
        <div @click="checkToggleRow(row)" :class="row.item.childAPI ? 'row-header' : 'row-header no-link'" :style="`margin-left:${getHeaderMarginLeft}`">
          <v-icon v-if="row.item.childAPI" :color="row.item.childAPI ? '' : 'transparent'">{{ row.detailsShowing ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
          {{ getColValue(row) }}
        </div>
      </template>

      <template v-slot:cell(DeferredBacklog)="row">
        <template v-if="typeof row.value === 'object' && row.value.length == 2">
          <div @click="$eventHub.$emit('deferred-backlog-clicked', row, parentLevel, alias)" style="cursor:pointer">
            <div :class="numberValStyle(row.value[0])">{{ formatNumber(row.value[0]) }}</div>
            <div :class="numberValStyle(row.value[1])">{{ formatNumber(row.value[1]) }}</div>
            <div :class="numberValStyle(calcVariance(row.value[0], row.value[1], false))">{{ calcVariance(row.value[0], row.value[1]) }}</div>
          </div>
        </template>
        <template v-else>
          <span @click="$eventHub.$emit('deferred-backlog-clicked', row, parentLevel, alias)" style="cursor:pointer" :class="numberValStyle(row.value)">{{ formatNumber(row.value) }}</span>
        </template>
      </template>

      <template v-slot:cell(VYoy)="row">
        <template v-if="typeof row.value === 'object' && row.value.length == 2">
          <div :class="numberValStyle(row.value[0])">{{ row.value[0] ? `${formatNumber(row.value[0], false, 0)}%` : '0%' }}</div>
          <div :class="numberValStyle(row.value[1])">{{ row.value[1] ? `${formatNumber(row.value[1], false, 0)}%` : '0%' }}</div>
          <div :class="numberValStyle(calcVariance(row.value[0], row.value[1], false))">{{ `${calcVariance(row.value[0], row.value[1], false).toFixed(0)}%` }}</div>
        </template>
        <template v-else>
          <span :class="numberValStyle(row.item.VYoy)">{{ row.item.VYoy ? `${formatNumber(row.item.VYoy, false, 0)}%` : '0%' }}</span>
        </template>
      </template>

      <template v-slot:cell(VSeq)="row">
        <template v-if="typeof row.value === 'object' && row.value.length == 2">
          <div :class="numberValStyle(row.value[0])">{{ row.value[0] ? `${formatNumber(row.value[0], false, 0)}%` : '0%' }}</div>
          <div :class="numberValStyle(row.value[1])">{{ row.value[1] ? `${formatNumber(row.value[1], false, 0)}%` : '0%' }}</div>
          <div :class="numberValStyle(calcVariance(row.value[0], row.value[1], false))">{{ `${formatNumber(calcVariance(row.value[0], row.value[1], false), false, 0)}%` }}</div>
        </template>
        <template v-else>
          <span :class="numberValStyle(row.item.VSeq)">{{ row.item.VSeq ? `${formatNumber(row.item.VSeq, false, 0)}%` : '0%' }}</span>
        </template>
      </template>

      <template v-slot:cell(OrgVyoy)="row">
        <span :class="numberValStyle(row.item.OrgVyoy)">{{ row.item.OrgVyoy ? `${formatNumber(row.item.OrgVyoy, false, 0)}%` : '' }}</span>
      </template>

      <template v-slot:cell(VAOP)="row">
        <span :class="numberValStyle(row.item.VAOP)">{{ row.item.VAOP ? `${formatNumber(row.item.VAOP, false, 0)}%` : '' }}</span>
      </template>

      <template v-slot:cell(VAOPOrg)="row">
        <span :class="numberValStyle(row.item.VAOPOrg)">{{ row.item.VAOP ? `${formatNumber(row.item.VAOPOrg, false, 0)}%` : '' }}</span>
      </template>

      <template v-slot:cell(BookToBill)="row">
        <span>{{ formatNumber(row.item.BookToBill, false, 2) }}</span>
      </template>

      <template v-slot:cell(Currency)="row">
        <span>{{ setCurrencyFooterLabel(row) }}</span>
      </template>

      <template v-slot:cell(wowLabel)="row">
        <div class="wow-label">{{ `WW${periodFilters.selectedWW1}` }}</div>
        <div class="wow-label">{{ `WW${periodFilters.selectedWW2}` }}</div>
        <div class="wow-label">Variance</div>
      </template>

      <template v-slot:cell()="row">
        <template v-if="typeof row.value === 'object' && row.value.length == 2">
          <div :class="numberValStyle(row.value[0])">{{ formatNumber(row.value[0]) }}</div>
          <div :class="numberValStyle(row.value[1])">{{ formatNumber(row.value[1]) }}</div>
          <div :class="numberValStyle(calcVariance(row.value[0], row.value[1], false))">{{ calcVariance(row.value[0], row.value[1]) }}</div>
        </template>
        <template v-else>
          <span>{{ formatNumber(row.value) }}</span>
        </template>
      </template>

      <template v-slot:row-details="row">
        <NestedGrid2
          :foot-clone="footClone"
          :hover="hover"
          :fields="fields"
          :parent-level="level"
          :field-width-calc="fieldWidthCalc"
          :totals-footer-func="TotalsFooterFunc"
          :show-child-header="showChildHeader"
          :footer-variance-mode="footerVarianceMode"
          :dataAPI="row.item.childAPI"
          :text-offset-level="textOffsetLevel"
          :local-currency="localCurrency"
          :class="generateClassId"
          :auto-expand="autoExpand" />
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="footer-total" :style="`margin-left:${getHeaderMarginLeft}`">{{ TotalsFooterFunc(data) }}</span>
      </template>

      <template v-slot:foot(Currency)="data">
        <span>{{ checkCurrencyFooterLabel(data) }}</span>
      </template>

      <template v-slot:foot(VYoy)="row">
        <template v-if="footerVarianceMode">
          <div :class="numberValStyle(calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 0, false))">
            {{ `${formatNumber(calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 0, false), false, 1)}%` }}
          </div>
          <div :class="numberValStyle(calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 1, false))">
            {{ `${formatNumber(calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 1, false), false, 1)}%` }}
          </div>
          <div :class="numberValStyle(calcVariance(
              calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 0, false),
              calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 1, false), false))">
            {{ formatNumber(calcVariance(
              calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 0, false),
              calcVYoy_ItemArrayPlus(comp_items, 'salesForecast_lastYr', 1, false), false), false, 1) }}
          </div>
        </template>
        <template v-else>
           <span :class="numberValStyle(calcVYoy(calcItemsPlus('SalesForecast', comp_items, false), calcItemsPlus('salesForecast_lastYr', comp_items, false), false))">
              {{ `${calcVYoy(calcItemsPlus('SalesForecast', comp_items, false), calcItemsPlus('salesForecast_lastYr', comp_items, false))}%` }}
           </span>
        </template>
      </template>

      <template v-slot:foot(VSeq)="row">
        <template v-if="footerVarianceMode">
          <div :class="numberValStyle(calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 0, false))">
            {{ `${formatNumber(calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 0, false), false, 1)}%` }}
          </div>
          <div :class="numberValStyle(calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 1, false))">
            {{ `${formatNumber(calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 1, false), false, 1)}%` }}
          </div>
          <div :class="numberValStyle(calcVariance(
              calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 0, false),
              calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 1, false), false))">
            {{ formatNumber(calcVariance(
              calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 0, false),
              calcVYoy_ItemArrayPlus(comp_items, 'SalesForecast_LastMoQtr', 1, false), false), false, 1) }}
          </div>
        </template>
        <template v-else>
           <span :class="numberValStyle(calcVYoy(calcItemsPlus('SalesForecast', comp_items, false), calcItemsPlus('salesForecast_lastYr', comp_items, false), false))">
              {{ `${calcVYoy(calcItemsPlus('SalesForecast', comp_items, false), calcItemsPlus('SalesForecast_LastMoQtr', comp_items, false))}%` }}
           </span>
        </template>
      </template>

      <template v-slot:foot(OrgVyoy)="row">
        <span :class="numberValStyle(calcOrgVYoy(calcItemsPlus('SalesForecast', comp_items, false), calcItemsPlus('salesForecast_lastYr', comp_items, false), calcItemsPlus('yoyIndex', comp_items, false), false))">
          {{ `${calcOrgVYoy(calcItemsPlus('SalesForecast', comp_items, false), calcItemsPlus('salesForecast_lastYr', comp_items, false), calcItemsPlus('yoyIndex', comp_items, false))}%` }}
        </span>
      </template>

      <template v-slot:foot(BookToBill)="row">
        <span :class="numberValStyle(calcItemsPlus('BookToBill', comp_items, false))">
          {{ calcBookToBillTotal(calcItemsPlus('BookingsForecast', comp_items, false), calcItemsPlus('SalesForecast', comp_items, false)) }}
        </span>
      </template>

      <template v-slot:foot(wowLabel)="data">
        <div class="wow-label">{{ `WW${periodFilters.selectedWW1}` }}</div>
        <div class="wow-label">{{ `WW${periodFilters.selectedWW2}` }}</div>
        <div class="wow-label">Variance</div>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <template v-if="footerVarianceMode">
          <div :class="numberValStyle(calcItemsArrayPlus(data.column, comp_items, 0, false))">{{ calcItemsArrayPlus(data.column, comp_items, 0) }}</div>
          <div :class="numberValStyle(calcItemsArrayPlus(data.column, comp_items, 1, false))">{{ calcItemsArrayPlus(data.column, comp_items, 1) }}</div>
          <div :class="numberValStyle(calcVariance(calcItemsArrayPlus(data.column, comp_items, 0, false), calcItemsArrayPlus(data.column, comp_items, 1, false),false))">
            {{ calcVariance(calcItemsArrayPlus(data.column, comp_items, 0, false), calcItemsArrayPlus(data.column, comp_items, 1, false)) }}
          </div>
        </template>
        <template v-else>
          <span :class="numberValStyle(calcItemsPlus(data.column, comp_items, false))">{{ calcItemsPlus(data.column, comp_items) }}</span>
        </template>
      </template>
    </b-table>
</template>

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
  margin-left: 169px;
}

/* .grid2 .row-header{
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
} */

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
import reportMixin from '../../mixin/report-functions.js';

export default {
  name: 'NestedGridCompare',
  mixins: [mixin, nestedgridfx, reportMixin],
  components: {
    NestedGrid2: () => import('./NestedGridCompare.vue'),
  },
  props: {
    alias: {
      type:String,
      default: 'default'
    },
    dataAPI: {
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
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),
    },
    TotalsFooterFunc: {
      type: Function,
      default: (data) => {
        return 'Totals'
      },
    },
    parentLevel: {
      type: Number,
      default: 1,
    },
    showChildHeader: {
      type: Boolean,
      default: true,
    },
    calcReverse: {
      // in Compare-Field mode, take the second parameter as minuend
      type: Boolean,
      default: false,
    },
    footerVarianceMode: {
      // set footer to Compare-Field
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    footClone: {
      type: Boolean,
      default: true,
    },
    textOffsetLevel: {
      type: Number,
      default: 0,
    },
    localCurrency: {
      type: Boolean,
      default: false,
    },
    autoExpand: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    uid: 1,
    isBusy: false,
    local_items: [],
  }),
  methods: {
    getColValue(row){
      //Special for Organic Growth: capture the parent category (e.g. SBU) into row data scope - to be retrieved later at footer rendering
      if (row.item.parentCategory) row.field.parentCategory = row.item.parentCategory
      //console.log('getColValue', row)
      return row.value
    },    
    toggleRow(row) {
      console.log(row);
      row.toggleDetails();
    },
    checkToggleRow(row) {
      // console.log(row);
      if (row.item.childAPI) {
        row.toggleDetails();
      }
    },
    checkCurrencyFooterLabel(data) {
      //console.log('testFooterData', data, this.parentLevel, this.localCurrency)
      return data.field.footerLabel && this.parentLevel === 2 && this.localCurrency ? data.field.footerLabel : 'USD';
    },
    setCurrencyFooterLabel(data) {
      // console.log('setCurrencyFooterLabel', data)
      data.field.footerLabel = data.item.Currency;
      return data.item.Currency;
    },
    refreshData() {
      // console.log('refreshData', this.dataAPI, this.autoExpand)
      const _this = this;
      this.isBusy = true;

      this.$http.post(_this.dataAPI, this.periodFilters)
        .then((response) => {
          //console.log(response);
          if (response.data !== ""){
            _this.local_items = [...response.data.result];
          }else{
            console.log("Session Timed Out", response)
            this.$eventHub.$emit('session-timeout')
          }
        })
        .catch((error) => {
          console.warn(error);
          this.NotifyRequestError(error)
        })
        .then(() => {
          _this.isBusy = false;
        });
    },
    toggleExpandCollapse(expand) {
      this.collapseExpand(expand);
    },
  },
  computed: {
    ...mapGetters({
      fields1: 'getSABFields',
      periodFilters: 'getPeriodFilters',
    }),
    level() {
      return this.parentLevel + 1;
    },
    getTableRefName() {
      return `thisTable-${this.uid}`;
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
      return (this.parentLevel === 1);
    },
    getHeaderMarginLeft(footer = false) {
      const offset = (this.textOffsetLevel > 0 && this.textOffsetLevel === this.parentLevel) ? 24 : 0;
      // console.log('getHeaderMarginLeft', ((this.parentLevel - 1) * 24) + offset)
      return `${((this.parentLevel - 1) * 24) + offset}px`;
    },
  },
  mounted() {
    // console.log('mounted', this.parentLevel, this.level, this.dataAPI);
    // if (this.autoDrill){
    //   this.collapseExpand();
    // }
    this.uid = this._uid;
    this.$eventHub.$emit('table-mounted', this.parentLevel)

    this.refreshData();
  },
  updated() {
    if (this.autoExpand) {
      // console.log('table compare updated', this.$refs, this.$refs[this.getTableRefName])
      // Method 1: set item._showDetails to TRUE. CON: cannot toggle row details
      // this.local_items.forEach(item => {
      //   //console.log(item, _this.dataAPI, _this.parentLevel);
      //   if (this.parentLevel < this.textOffsetLevel) item._showDetails = true
      // })
      // end of Method 1

      // Method 2: global function, preferred
      // if (this.$refs[this.getTableRefName]){
      this.collapseExpand();
      // }
    }
  },
  beforeDestroy() {
    // console.log('before destroy', this.level, this.dataAPI);
    this.$eventHub.$emit('table-destroyed', this.parentLevel)
  },
};
</script>
