<template>
  <v-dialog v-model="periodDialog" persistent max-width="300">
        <template v-slot:activator="{ on }">
          <!-- <v-btn icon @click.stop="handleDialog(on)">
            <v-icon>mdi-calendar-month</v-icon>
          </v-btn> -->
          
          <v-tooltip bottom>
            <template v-slot:activator="{ on1 }">
              <v-btn icon v-on="on1" @click.stop="handleDialog(on)">
                <v-icon>mdi-calendar-month</v-icon>
              </v-btn>
            </template>
            <span>Select Period</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title class="headline" style="margin-bottom:12px;background-color:#eee">Select Period</v-card-title>
          <v-card-text style="padding-bottom:0px">
            <v-select ref="periodType" v-if="local_periodFilters.showPeriodSelect" :items="period_type" v-model="local_periodFilters.selectedPeriod" return-object dense label="Period" outlined></v-select>
            <v-select ref="selectMonth" v-if="[1,4].indexOf(local_periodFilters.selectedPeriod.value) > -1" :items="month_type" v-model="local_periodFilters.selectedMonth" return-object dense label="Month" outlined></v-select>
            <v-row v-if="local_periodFilters.showWOW && local_periodFilters.showWOW.length">
              <v-col v-if="local_periodFilters.showWOW && local_periodFilters.showWOW.length >= 1" style="padding-top:0px;padding-bottom:0px">
                  <v-select :items="workWeeks" v-model="local_periodFilters.selectedWW1" dense :label="getWeekLabel1" outlined></v-select>
              </v-col>
              <v-col v-if="local_periodFilters.showWOW && local_periodFilters.showWOW.length >= 2" style="padding-top:0px;padding-bottom:0px">
                  <v-select :items="workWeeks" v-model="local_periodFilters.selectedWW2" dense label="Work Week 2" outlined></v-select>
              </v-col>
            </v-row>
            <v-select ref="selectQtr" v-if="local_periodFilters.selectedPeriod.value === 2" :items="qtr_type" v-model="local_periodFilters.selectedQtr" dense label="Quarter" outlined></v-select>
            <v-select ref="selectYear" :items="yearSelections" v-model="local_periodFilters.selectedYear" dense label="Year" outlined></v-select>

          </v-card-text>
          <v-card-actions style="padding:16px;padding-right:24px">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="periodDialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" dark @click="checkPeriodSelection">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'PeriodSelectDialog',

  data: () => ({
    periodDialog: false,
    month_type: [
      {
        value: 1,
        text: 'January',
      },
      {
        value: 2,
        text: 'February',
      },
      {
        value: 3,
        text: 'March',
      },
      {
        value: 4,
        text: 'April',
      },
      {
        value: 5,
        text: 'May',
      },
      {
        value: 6,
        text: 'June',
      },
      {
        value: 7,
        text: 'July',
      },
      {
        value: 8,
        text: 'August',
      },
      {
        value: 9,
        text: 'September',
      },
      {
        value: 10,
        text: 'October',
      },
      {
        value: 11,
        text: 'November',
      },
      {
        value: 12,
        text: 'December',
      },
    ],
    // selectedPeriod: null,
    qtr_type: [1, 2, 3, 4],
    workWeeks: [],
    weekLabel1: 'Work Week',
    local_periodFilters: {
      selectedPeriod: 0,
      selectedMonth: 0,
      selectedYear: 2019,
      selectedWW1: 0,
      selectedWW2: 0,
      selectedQtr: 0,
    },
  }),
  computed: {
    ...mapGetters({
      report_data: 'getReportDataMenu',
      entry_data: 'getDataEntryMenu',
      misc_data: 'getMiscMenu',
      admin_menu: 'getAdminMenu',
      period_type: 'getPeriodTypes',
      autoDrill: 'getAutoExpand',
    }),
    getWeekLabel1() {
      return this.local_periodFilters.showWOW && this.local_periodFilters.showWOW.length === 1 ? 'Work Week' : 'Work Week 1';
    },
    periodFilters: {
      get() {
        return this.$store.state.periodFilters;
      },
      set(value) {
        this.$store.commit('setPeriodFilters', value);
      },
    },
    selectedPeriod: {
      get() {
        return this.$store.state.periodFilters.selectedPeriod;
      },
      set(value) {
        this.$store.commit('setSelectedPeriodType', value);
      },
    },
    selectedMonth: {
      get() {
        return this.$store.state.periodFilters.selectedMonth;
      },
      set(value) {
        this.$store.commit('setSelectedMonth', value);
      },
    },
    selectedYear: {
      get() {
        return this.$store.state.periodFilters.selectedYear;
      },
      set(value) {
        this.$store.commit('setSelectedYear', value);
      },
    },
    selectedQtr: {
      get() {
        return this.$store.state.periodFilters.selectedQtr;
      },
      set(value) {
        this.$store.commit('setSelectedQtr', value);
      },
    },
    selectedWW1: {
      get() {
        return this.$store.state.periodFilters.selectedWW1;
      },
      set(value) {
        this.$store.commit('setSelectedWW1', value);
      },
    },
    selectedWW2: {
      get() {
        return this.$store.state.periodFilters.selectedWW2;
      },
      set(value) {
        this.$store.commit('setSelectedWW2', value);
      },
    },
    yearSelections:{
      get(){
        return this.$store.state.yearSelections
      },
      set(value){
        this.$store.commit('setYearSelections', value)
      }
    }
  },

  methods: {
    periodChanged(e) {
      console.log(e, this.$refs);
      this.local_periodFilters.selectedPeriod = e;

      if (e.value === 2) {
        this.$refs.selectQtr.$emit('change');
      }
    },
    monthChanged(e) {
      console.log(e);
      this.local_periodFilters.selectedMonth = e;
    },
    qtrChanged(e) {
      console.log('qtrChanged', e);
      this.local_periodFilters.selectedQtr = e;
    },
    yearChanged(e) {
      console.log(e);
      this.local_periodFilters.selectedYear = e;
    },
    ww1Changed(e) {
      console.log(e);
      this.local_periodFilters.selectedWW1 = e;
    },
    ww2Changed(e) {
      console.log(e);
      this.local_periodFilters.selectedWW2 = e;
    },
    handleDialog(on) {
      this.local_periodFilters = { ...this.periodFilters };
      this.periodDialog = true;
    },
    checkPeriodSelection() {
      if (this.local_periodFilters.showWOW && this.local_periodFilters.showWOW.length) {
        this.checkMinWW();
      } else {
        this.invokePeriodChanged();
      }
    },
    invokePeriodChanged() {
      console.log('invokePeriodChanged');
      this.periodFilters = this.local_periodFilters;
      this.$eventHub.$emit('period-changed');
      this.periodDialog = false;
    },
    checkYearRange() {
      const _this = this;
      this.$http.post('svc/getYearRange')
        .then((response) => {
          console.log('checkYearRange', response.data);
          const years = response.data.result;
          _this.yearSelections = [...years];
        })
        .catch((error) => {
          console.warn('PeriodSelectDialog.checkMinWW', error);
        });
    },
    checkMinWW() {
      console.log('checkMinWW');
      const _this = this;
      this.$http.post(`report/snapshotminweek/${this.local_periodFilters.selectedYear}`)
        .then((response) => {
          console.log('checkMinWW', response.data);
          const minWeek = response.data.result;
          if (minWeek > -1) {
            if (_this.local_periodFilters.selectedWW1 < minWeek) _this.local_periodFilters.selectedWW1 = minWeek;
            if (_this.local_periodFilters.selectedWW2 < minWeek) _this.local_periodFilters.selectedWW2 = minWeek;
          }
          _this.invokePeriodChanged();
        })
        .catch((error) => {
          console.warn('PeriodSelectDialog.checkMinWW', error);
        });
    },
  },
  mounted() {
    this.workWeeks = [...Array(53).keys()].map((x) => ++x).reverse();
    this.checkYearRange();
  },
};
</script>
