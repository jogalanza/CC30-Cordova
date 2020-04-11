<template>
  <v-card id="bookings-forecast">
    <v-toolbar color="green" dense>
      <v-toolbar-title style="color:white">
        Bookings Forecast
        <span v-if="periodDescription !== ''">{{ ` : ${periodDescription} ${localCurrency ? '(Local Currency)' : ''}` }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <ExpandExport 
        :hide-export-level="true" 
        :hide-export-all="true" 
        :hide-save-all="false"
        :hide-currency="false"
        :local-currency="localCurrency"
        :expand="expand"
        />

    </v-toolbar>
    <div style="padding:10px;height:100vh;overflow-y:auto">
      <v-container  style="padding-top:0px">
        <div class="table-data-notice">{{ dataNotice }}</div>
       <DataEntryNestedGridParent
          id='BookingsForecastNestGrid'
          ref='bfnestgrid'
          :fields="fields"
          :items="items"
          :local-currency="localCurrency"
          :field-width-calc="colwidthCalc"
        >
          <template v-slot:default="data">
             <BookingsForecastEntryGrid 
                  :showHeaders="false" 
                  :siteinfo="data.row.item" 
                  :local-currency="localCurrency"
                  :field-width-calc="colwidthCalc"
                  class="grid2" />
          </template>
        </DataEntryNestedGridParent>
      </v-container>       
    </div>
  </v-card>
</template>

<style>
#BookingsForecastNestGrid {
    max-width: 1290px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    border-radius: 4px;
}
#BookingsForecastNestGrid{
  max-height: calc(100vh - 180px);
  /* height: calc(100vh - 170px); */
}
#bookings-forecast .table-data-notice {
    max-width: 1290px;
}
#bookings-forecast .table.b-table > thead > tr > th:nth-child(5),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(5) .v-input__slot,
#bookings-forecast .table.b-table > thead > tr > th:nth-child(6),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(6) .v-input__slot,
#bookings-forecast .table.b-table > thead > tr > th:nth-child(7),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(7) .v-input__slot,
#bookings-forecast .table.b-table > thead > tr > th:nth-child(11),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(11) .v-input__slot,
#bookings-forecast .table.b-table > thead > tr > th:nth-child(12),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(12) .v-input__slot,
#bookings-forecast .table.b-table > thead > tr > th:nth-child(13),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(13) .v-input__slot,
#bookings-forecast .table.b-table > thead > tr > th:nth-child(14),
#bookings-forecast .table.b-table > tbody > tr > td:nth-child(14) .v-input__slot
{
  background-color: #eee;
}
</style>
<script>
import { mapGetters, mapState } from 'vuex';
import mixin from '../../mixin/mixin.js';
import mixinDataEntry from '../../mixin/data-entry.js'

export default {
  name: 'BookingsForecast',
  components: {
    BookingsForecastEntryGrid: () => import('../../components/BookingsForecast/BookingsForecastEntryGrid.vue'),
    DataEntryNestedGridParent: () => import('../../components/NestedGrids/DataEntryNestedGridParent.vue'),
    EntryGridFormParent: () => import('../../components/General/EntryGridFormParent.vue'),
    ExpandExport: () => import('../../components/General/ExpandExport.vue')
  },
  mixins: [mixin, mixinDataEntry],
  data: () => ({
    panel: [],
    localCurrency: false,
    loading:false,
    expand: true,
    items: [
      {siteId: 1, col1: 'Asslar'}
    ],
  }),
  computed: {
    ...mapGetters({
      fields: 'getBookForecastFields',
      periodDescription: 'getPeriodDescription',
      periodFilters: 'getPeriodFilters'
    }),
    dataNotice: {
      get() { return this.$store.state.dataNotice; }
    }
  },
  methods: {
    checkProp(props){
      console.log(props)
    },
    GetDataEntrySites(){
        console.log('Data Entry mixin GetDataEntrySites')
        var _this  = this
        this.$http.post(`bookingsforecast/sites/${this.localCurrency}`, this.periodFilters)
          .then((response) => {
            if (response.data !== ''){
              _this.items = [...response.data.result]
            }
          })
          .catch((error) => {
            console.error(error)
          })
    },
    ToggleExpand() {
      if (this.$refs.bfnestgrid) {
        this.expand = !this.expand
        this.$refs.bfnestgrid.collapseExpand(this.expand);
      }
    },
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '200px'
          : (key === 'entryForm') ? '1080px'
            : (key === 'actions') ? '40px'
              : (key === 'MonthName') ? '90px'
                : '90px',
      };
    },
  },
  mounted() {
    this.$eventHub.$on('toggle-expand', this.ToggleExpand)
    this.configurePeriodDialog([3], false)
    this.GetDataEntrySites()
  },
  beforeDestroy(){
    this.$eventHub.$off('toggle-expand', this.ToggleExpand)
  }
};
</script>
