<template>
  <div class="bookings-forecast-grid">
    <b-table
       ref="thisTable"
      show-empty
      :busy="loading"
      fixed
      small
      :items="items"
      :fields="fields"
      :thead-class=" !showHeaders ? 'd-none' : ''"
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

      <template v-slot:cell(col1)="row">
        <div class="row-header">
          <!-- <span><v-icon>mdi-music-note-whole</v-icon></span> -->
          <span>{{ row.value }}</span>
        </div>
      </template>

      <!-- <template v-slot:cell()="row">
        <span>{{ formatNumber(row.value) }}</span>
      </template>-->

      <template v-slot:cell(actions)="row">
        <span style="color:#eee"></span>
      </template>

      <!-- Bind individual month data to v-text-fields -->

      <template v-slot:cell()="row">
        <v-text-field
          type="number"
          :prefix="localCurrency ? row.item[row.field.key].Symbol : '$'"
          :flat="flat"
          solo
          single-line
          dense
          hide-details
          v-model="row.item[row.field.key].value"
          class="cc-input"
          @change="valueChanged(row)"
        ></v-text-field>
      </template>

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


      <!-- Default fall-back custom formatted footer cell -->
      <template v-slot:foot()="data">
        <!-- <span>{{ calcItems(data.column) }}</span> -->
        <span class="sr-only"></span>
      </template>
    </b-table>
  </div>
</template>

<style>

.bookings-forecast-grid tr.row-class > td {
  padding: 0px;
}
.bookings-forecast-grid tr.row-class > td:nth-child(1) {
  background-color: #eee;
}

.bookings-forecast-grid tr.row-class > td {
  border: 1px solid #eee;
}

</style>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import mixin from '../../mixin/mixin.js';

export default {
  name: 'BookingsForecastEntryGrid',
  mixins: [mixin],
  props: {
    showHeaders: {
      type: Boolean,
      default: true,
    },
    filter: String,
    localCurrency: {
      type: Boolean,
      default: false,
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
    saving: false,
    dirty: false,
    flat: false,
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
    items: [],
  }),
  methods: {
    SaveEntries() {
      console.log('saving entries');
      if (this.dirty){
        var _this = this
      this.saving = true
      this.loading = true

      this.$http.post(`bookingsforecast/save/${this.siteinfo.siteId}/${this.localCurrency}`, 
        { periodFilter: this.periodFilters, items: this.items})
        .then((response) => {
          if (response.data !== ''){
            console.log(response.data)
            if (response.data.result.payload){
              _this.items = [...response.data.result.payload]
            }
          }
        })
        .catch((error) => { console.error(error) })
        .then(() => {
          _this.saving = false
          _this.loading = false
          _this.dirty = false
        })
      }      
    },
    valueChanged(row) {
      console.log('value changed', row);
      this.dirty = true
    },
    GetBookingsForecastEntries(){
      var _this = this
      this.loading = true
      //this.$http.post(`bookingsforecast/products/${this.siteinfo.siteId}/${this.localCurrency}`, this.periodFilters)
      this.$http.post(this.siteinfo.dataAPI, this.periodFilters)
        .then((response) => {
          if (response.data !== ''){
            console.log('GetBookingsForecastEntries', response.data)
            _this.items = [...response.data.result]
            _this.dirty = false
          }          
        })
        .catch((error) => {
          console.error(error)
        }).then(() =>{
          _this.loading = false
        })
    }
  },
  // watch:{
  //   filter: (newVal, oldVal) => {
  //     console.log(newVal, oldVal);
  //   }
  // },
  computed: {
    ...mapGetters({
      fields2: 'getBookForecastFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
    fields(){
      console.log(this.fields2)
      var x = this.fields2.filter((field, index) => {
        //console.log(field, index)
        return true //field.key !== 'col1'
      })
      return x
    }
  },
  updated() {
    // console.log("BookingsForecastGrid updated");
  },
  mounted() {
    //console.log('bookings forecast grid', this.siteinfo)
    this.$eventHub.$on('save-all', this.SaveEntries)
    this.GetBookingsForecastEntries()
  },
  beforeDestroy() {
    // console.log("BookingsForecastGrid beforeDestroy");
    this.$eventHub.$off('save-all', this.SaveEntries)
  },
};
</script>
