<template>
  <div class="demand-actuals-grid">
    <b-table
      show-empty
      fixed
      small
      striped
      :items="items"
      :fields="fields"
      thead-class="d-none"
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
        <col v-for="field in scope.fields" :key="field.key" :style="fieldWidthCalc(field.key)" />
      </template>

      <template v-slot:cell(col1)="row">
        <div class="row-header">{{ row.value }}</div>
      </template>

      <!-- <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>-->

      <template v-slot:cell(actions)="row">
        <span></span>
      </template>

      <!-- Bind individual month data to v-text-fields -->

      <template v-slot:cell(entryForm)="row">
        <slot v-bind:row="row"></slot>

        <!-- <DemandActualsEntryForm 
          :show-headers="true"
          :items="row.item.data" 
          :local-currency="localCurrency"
          :field-width-calc="fieldWidthCalc"
          class="grid3" /> -->
      </template>

      <!-- end of text-field binding -->

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(col1)="data">
        <span class="text-danger">Total</span>
      </template>

      <template v-slot:foot(defBacklog)="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span>{{ defCount }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span class="sr-only"></span>
      </template>
    </b-table>
  </div>
</template>

<style>
.demand-actuals-grid .grid3 > .table.b-table.fixed-rowheader > tbody > tr > td:nth-child(1),
.demand-actuals-grid .grid3 > .table.b-table.fixed-rowheader > tfoot > tr > th:nth-child(1){
  left: 160px;
  z-index: 1;
  background-color: #eee;
  vertical-align: middle;
}
.demand-actuals-grid tr.row-class > td {
  padding: 0px;
}
.demand-actuals-grid tr.row-class > td:nth-child(1) {
  background-color: #ddd;
  /* background-color: orange; */
}

/* .demand-actuals-grid tr.row-class > td {
  border: 1px solid #eee;
} */

</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'DemandActualsGrid',
  mixins: [mixin],
  props: {
    showHeaders: {
      type: Boolean,
      default: true,
    },
    filter: String,
    Currency: {
      type: String,
      default: '',
    },
    siteinfo: {
      type: Object,
      default: null,
    },
    localCurrency: {
      type:Boolean,
      default: false
    },
    fieldWidthCalc: {
      type: Function,
      default: (key) =>
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),
    }
  },
  components: {
    DemandActualsEntryGrid: () => import('./DemandActualsEntryGrid.vue'),
  },
  data: () => ({
    loading: false,
    defCount: null,
    filterOn: [
      'site',
      'businessLine',
      'productLine',
      'productFamily',
      'poNo',
      'partNo',
      'comments',
      'reason',
      'customerName',
      'partDescription',
    ],
    fields: [
      { key: 'col1', label: '' },
      { key: 'entryForm', label: '' },
    ],
    items: [],
  }),
  methods: {
    GetDemandActualsForecastEntries(){
      var _this = this
      this.loading = true
      //this.$http.post(`demandactuals/products/${this.siteinfo.siteId}/${this.localCurrency}`, this.periodFilters)
      this.$http.post(this.siteinfo.dataAPI, this.periodFilters)
        .then((response) => {
          if (response.data !== ''){
            //console.log('GetBookingsForecastEntries', response.data)
            _this.items = [...response.data.result]
            _this.dirty = false
          }          
        })
        .catch((error) => {
          console.error(error)
        }).then(() =>{
          _this.loading = false
        })
    },
    saveEntries() {
      console.log('saving entries');
    }
  },
  // watch:{
  //   filter: (newVal, oldVal) => {
  //     console.log(newVal, oldVal);
  //   }
  // },
  computed: {
    ...mapGetters({
      fields1: 'getBookForecastFields',
      periodFilters: 'getPeriodFilters'
    }),
  },
  updated() {
    // console.log("BookingsForecastGrid updated");
  },
  mounted() {
    console.log("BookingsForecastGrid mounted", this.siteinfo);
    this.GetDemandActualsForecastEntries()
  },
  beforeDestroy() {
    // console.log("BookingsForecastGrid beforeDestroy");
  },
};
</script>
