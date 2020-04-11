<template>

  <b-table
      ref="thisTable"
      :busy="loading"
      show-empty
      small
      fixed
      :sticky-header="true"
      responsive
      :items="items"
      :fields="fields"
      thead-class="head-class"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      class="data-entry-nested-grid-parent fixed-rowheader"
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

      <template v-slot:cell(col1)="row">
        <div @click="toggleRow(row)" class="row-header">
          <v-icon color="white">{{ row.detailsShowing ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
          {{ row.value }}
        </div>
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
        <slot v-bind:row="row"></slot>
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
    
  <!-- <div class="data-entry-nested-grid-parent1">
  
  </div> -->
</template>

<style scoped>

</style>
<style>
.data-entry-nested-grid-parent .row-class{
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
.data-entry-nested-grid-parent .grid2 .row-class{
  font-weight: normal;
}
.data-entry-nested-grid-parent .row-class td{
  padding: 0px;
}
.data-entry-nested-grid-parent .grid2 .row-class{
  background-color: white;
  color:black;
}
/* nested grid cell value colors */
.data-entry-nested-grid-parent .foot-class span,
.data-entry-nested-grid-parent .table.b-table > tbody > tr > td > span{
  color: blue;
}
.data-entry-nested-grid-parent .grid2 .foot-class span,
.data-entry-nested-grid-parent .grid2 .table.b-table > tbody > tr > td > span{
  color: red;
}
.data-entry-nested-grid-parent.fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.data-entry-nested-grid-parent.fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.data-entry-nested-grid-parent.fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left !important;
}
.data-entry-nested-grid-parent .grid2 .fixed-rowheader > .table.b-table > thead > tr > th:nth-child(1),
.data-entry-nested-grid-parent .grid2 .fixed-rowheader > .table.b-table > tbody > tr > td:nth-child(1),
.data-entry-nested-grid-parent .grid2 .fixed-rowheader > .table.b-table > tfoot > tr > th:nth-child(1) {
    text-align: left !important;
}
.data-entry-nested-grid-parent tr.row-class > td:nth-child(14) {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    right: 0px;
}
.data-entry-nested-grid-parent.fixed-rowheader > .table.b-table > tbody > tr > td.sticky-row {
    background-color: #aad4b4;
    background-color: #333333;
    letter-spacing: 0.2rem;
}
.footer-total{
  margin-left: 26px;
}
.data-entry-nested-grid-parent .grid2 .footer-total{
  margin-left: 59px;
}

.data-entry-nested-grid-parent .grid2 .row-header{
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
  name: 'DataEntryNestedGridParent',
  mixins: [mixin, nestedgridfx],
  components: {
  },
  props: {
    items: Array,
    fields: Array,
    localCurrency: {
      type: Boolean,
      default: false
    },
    fieldWidthCalc: {
      type: Function,
      default: (key) =>
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),
    },
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
      fields1: 'getBookForecastFields',
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
