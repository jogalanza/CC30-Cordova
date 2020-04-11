<template>
  <div id="demand-actuals-entry-form">
    <b-table
      show-empty
      fixed
      small
      :busy="loading"
      :items="items"
      :fields="fields"
      foot-clone
      :thead-class=" isStickySupported ? 'd-none' : 'head-class'"
      tbody-tr-class="row-class"
      tfoot-class="foot-class"
      class="fixed-rowheader"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" style="margin-right:10px;width:20px;height:20px"></b-spinner>
          <strong>{{ saving ? 'Saving...' : 'Loading...'}}</strong>
        </div>
      </template>
      <template v-slot:table-colgroup="scope">
        <col v-for="field in scope.fields" :key="field.key" :style="fieldWidthCalc(field.key)" />
      </template>

      <!-- <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>-->

      <template v-slot:cell(actions)="row">
        <span></span>
      </template>

      <!-- Bind individual month data to v-text-fields -->

      <template v-slot:cell(MonthName)="row">
        <div class="month-label">{{ row.value }}</div>
      </template>

      <template v-slot:cell(BookShip)="row">
        <v-text-field
          :prefix="localCurrency ? row.item.Symbol : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="calcBookShip(row)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:cell(DeferredBacklog)="row">
        <v-text-field
          :prefix="localCurrency ? row.item.Symbol : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="formatNumber(row.item.DeferredBacklog, false, 0)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:cell(BookingsForecast)="row">
        <v-text-field
          :prefix="localCurrency ? row.item.Symbol : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="formatNumber(row.item[row.field.key], false, 0)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:cell()="row">
        <v-text-field
          type="number"
          :prefix="localCurrency ? row.item.Symbol : '$'"
          :flat="false"
          solo
          single-line
          dense
          hide-details
          :value="formatNumber(row.item[row.field.key], false, 0, true)"
          class="cc-input"
          @change="valueChanged($event, row)"
        ></v-text-field>
      </template>

       <!-- v-model="row.item[row.field.key]" -->

      <template v-slot:head(actions)="row">
        <span class="text-info"></span>
      </template>

      <!-- Footer templates -->
      <template v-slot:foot(actions)="data">
        <span class="text-danger"></span>
      </template>

      <template v-slot:foot(MonthName)="data">
        <div class="month-label" style="text-align:center">Totals</div>
      </template>

      <template v-slot:foot(actions)="data">
        <span class="sr-only"></span>
      </template>

  <!--  -->
      <template v-slot:foot(BacklogCRD)="data">
        <v-text-field
          :prefix="localCurrency ? checkCurrency(data) : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="formatNumber(calcBacklogTotal('BacklogCRD'), false, 0)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:foot(DeferredBacklog)="data">
        <v-text-field
          :prefix="localCurrency ? checkCurrency(data) : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="formatNumber(calcBacklogTotal('DeferredBacklog'), false, 0)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:foot(DemandForecast)="data">
        <v-text-field
          :prefix="localCurrency ? checkCurrency(data) : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="formatNumber(calcTotalDemandForecast(), false, 0)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

      <template v-slot:foot()="data">
        <v-text-field
          :prefix="localCurrency ? checkCurrency(data) : '$'"
          :flat="false"
          solo
          single-line
          dense
          disabled
          hide-details
          :value="calcTotals(data.column)"
          class="cc-input cc-input-disabled"
        ></v-text-field>
      </template>

    </b-table>
  </div>
</template>
<style scoped>
.month-label{
  text-align: center;
}

</style>

<style>
#demand-actuals-entry-form tr.row-class > td,
#demand-actuals-entry-form tfoot > tr > th {
  padding: 0px;
}
#demand-actuals-entry-form tr.row-class > td:nth-child(1) {
  background-color: #eee;
}


#demand-actuals-entry-form tr.row-class > td,
#demand-actuals-entry-form tfoot > tr > th {
  border: 1px solid #eee;
}
#demand-actuals-entry-form .footer-calcs{
  margin-left: 8px;
}

</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'DemandActualsEntryGrid',
  mixins: [mixin],
  props: {
    items: Array,
    showHeaders: {
      type: Boolean,
      default: true,
    },
    filter: String,
    Currency: {
      type: String,
      default: '$',
    },
    localCurrency: {
      type:Boolean,
      default: false
    },
    siteinfo: {
      type: Object,
      default: null,
    },
    fieldWidthCalc: {
      type: Function,
      default: (key) =>
        ({
          width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
        }),
    },
  },
  components: {},
  data: () => ({
    loading: false,
    dirty: false,
    saving: false,
    items1: [],
  }),
  methods: {
    calcBacklogTotal(data){
      //console.log(data, this.items)
      var total = 0
      this.items.forEach(element => {
        if (element.includeInCalc){
          total += parseFloat(element[data]) || 0
        }
      });
      return total  // this.formatNumber(total, false, 0)
    },
    calcTotalDemandForecast(){
      var sales = parseFloat(this.calcTotals('ActualSales', false)) || 0
      var backlogCRD = parseFloat(this.calcBacklogTotal('BacklogCRD')) || 0
      var contractRelease = parseFloat(this.calcTotals('ContractRelease', false)) || 0
      var bookShip = parseFloat(this.calcTotals('BookShip', false)) || 0
      var poc = parseFloat(this.calcTotals('POC', false)) || 0
      //console.log('calcTotalDemandForecast',sales, backlogCRD,contractRelease,poc, sales + backlogCRD + contractRelease + poc + bookShip)
      return sales + backlogCRD + contractRelease + poc + bookShip
    },
    checkCurrency(data){      
      if (data.column && this.items[0] && this.items[0].Symbol){
        //console.log('checkData', data, this.items[0])
        return this.items[0].Symbol
      }
      return null
    },
    calcBookShip(row){
      //console.log(row)
      var sales = parseFloat(row.item.ActualSales) || 0
      var backlog = parseFloat(row.item.BacklogCRD) || 0
      var contract = parseFloat(row.item.ContractRelease) || 0
      var demandforecast = parseFloat(row.item.DemandForecast) || 0
      row.item.BookShip = demandforecast - (sales + backlog + contract) 
      return this.formatNumber(row.item.BookShip, false, 0)
    },
    calcTotals(field, format = true){
      //console.log('calcTotals', field)
      var total = 0
      this.items.forEach(element => {
        if (field === 'ActualBookings') console.log(element)
        total += parseFloat(element[field]) || 0
      });
      if (format) return this.formatNumber(total, false, 0)
      else return total
    },
    valueChanged(event, row){
      console.log(event, row)
      row.item[row.field.key] = parseInt(event) //i.e. no decimals
      this.dirty = true
    },
    SaveEntries() {
      console.log('saving entries');
      if (this.dirty){
        var _this = this
        this.saving = true
        this.loading = true

        this.$http.post(`demandactualsforecast/save/${this.localCurrency}`, 
          { periodFilter: this.periodFilters, items: _this.items})
          .then((response) => {
            if (response.data !== ''){
              console.log(response.data)
              // if (response.data.result.payload){
              //   _this.items = [...response.data.result.payload]
              // }
            }
          })
          .catch((error) => { console.error(error) })
          .then(() => {
            _this.saving = false
            _this.loading = false
            _this.dirty = false
          })
        }   
    }
  },
  // watch:{
  //   filter: (newVal, oldVal) => {
  //     console.log(newVal, oldVal);
  //   }
  // },
  computed: {
    ...mapGetters({
      fields: 'getDemandActualEntryFields',
    }),
  },
  updated() {
    // console.log("BookingsForecastGrid updated");
  },
  mounted() {
    this.$eventHub.$on('save-all', this.SaveEntries)
  },
  beforeDestroy() {
    // console.log("BookingsForecastGrid beforeDestroy");
    this.$eventHub.$off('save-all', this.SaveEntries)
  },
};
</script>
