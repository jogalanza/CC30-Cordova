import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    autoExpand: false,

    // App Navigation options
    report_data: [
      {
        action: 'mdi-table',
        title: 'Business To Site',
        route: {
          name: 'StartBusiness',
        },
      },
      {
        action: 'mdi-table',
        title: 'Site To Product Family',
        route: {
          name: 'StartSite',
        },
      },
      {
        action: 'mdi-table',
        title: 'divider',
      },
      {
        action: 'mdi-table',
        title: 'Monthly Trend',
        route: {
          name: 'MonthlyTrend',
        },
      },
      {
        action: 'mdi-table',
        title: 'divider',
      },
      {
        action: 'mdi-table',
        title: 'Business To Site Prior Week',
        route: {
          name: 'BusinessToSitePrior',
        },
      },
      {
        action: 'mdi-table',
        title: 'Site To Product Line Prior Week',
        route: {
          name: 'SiteToBusinessPrior',
        },
      },
      {
        action: 'mdi-table',
        title: 'divider',
      },
      {
        action: 'mdi-calendar-week',
        title: 'Business To Site Week over Week',
        route: {
          name: 'BusinessToSiteWOW',
        },
      },
      {
        action: 'mdi-calendar-week',
        title: 'Site To Product Line Week over Week',
        route: {
          name: 'SiteToBusinessWOW',
        },
      },
      {
        action: 'mdi-chart-line',
        title: 'divider',
      },
      {
        action: 'mdi-chart-line',
        title: 'Organic Growth',
        route: {
          name: 'OrganicGrowth',
        },
      },
    ],
    entry_data: [
      {
        action: 'mdi-table',
        title: 'Bookings Forecast',
        route: {
          name: 'BookingsForecast',
        },
      },
      {
        action: 'mdi-table',
        title: 'Demand Actuals and Forecast',
        route: {
          name: 'DemandActuals',
        },
      },
      {
        action: 'mdi-table',
        title: 'Sales Targets',
        route: {
          name: 'SalesTarget',
        },
      },
      {
        action: 'mdi-table',
        title: 'Deferred Backlog',
        route: {
          name: 'DeferredBacklog',
        },
      },
    ],
    misc_data: [
      {
        action: 'mdi-table',
        title: 'FX Rates',
        route: {
          name: 'FXRates',
        },
      },
      {
        action: 'mdi-table',
        title: 'Definitions and Training',
        route: {
          name: 'DefinitionsTraining',
        },
      },
      {
        action: 'mdi-account-check',
        title: 'Transaction Audit',
        route: {
          name: 'TransactionAudit',
        },
      },
    ],
    admin_data: [
      {
        action: 'mdi-account',
        title: 'User Maintenance',
        route: {
          name: 'UserMaintenance',
        },
      },
      {
        action: 'mdi-account',
        title: 'Site Maintenance',
        route: {
          name: 'SiteMaintenance',
        },
      },
      {
        action: 'mdi-account',
        title: 'Product Configuration',
        route: {
          name: 'ProductMaintenance',
        },
      },
    ],
    period_type: [
      { value: 1, text: 'Month' },
      { value: 2, text: 'Quarter' },
      { value: 3, text: 'Annual' },
      { value: 4, text: 'LTM' },
    ],
    dataNotice: 'All values entered/displayed are in 000\'s',
    // Period Filter settings
    calc_periodTypes: [],    
    current_period: {
      fiscalDate: null,
      weekOfYear: null,
      month: null,
      quarter: null,
      year: null,
    },
    periodFilters: {
      selectedPeriod: { value: 1, text: 'Annual' },
      selectedMonth: { value: 1, text: 'January' },
      selectedYear: 2019,
      selectedWW1: 1,
      selectedWW2: 1,
      selectedQtr: 1,
      showWOW: [],
      showOneWeek: false,
      showPeriodSelect: true,
      periodDescription: ''
    },

    // Report and Data entry fields
    SAB_fields: [
      {
        key: 'col1',
        label: '',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'z-index': '5 !important', 'vertical-align': 'middle' },
        class: 'fixed-rowheader-color white-header',
      },
      { key: 'wowLabel', label: '', sortable: false, class: 'text-center'},
      {
        key: 'Currency', label: 'Currency', sortable: false, class: 'text-center',
      },
      {
        key: 'ActualSales', label: 'Actual Sales', sortable: false, class: 'text-center',
      },
      {
        key: 'BacklogCRD', label: 'Backlog per CRD', sortable: false, class: 'text-center',
      },
      {
        key: 'ContractRelease', label: 'Contract Releases', sortable: false, class: 'text-center',
      },
      {
        key: 'BookShip', label: 'Book & Ship', sortable: false, class: 'text-center',
      },
      {
        key: 'TotalDemandForecast', label: 'Total Demand Forecast', sortable: false, class: 'text-center',
      },
      {
        key: 'DeferredBacklog', label: 'Deferred Backlog', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast', label: 'Sales Forecast', sortable: false, class: 'text-center',
      },
      {
        key: 'Target', label: 'Target', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast_LastMoQtr', label: 'Last Qtr', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast_LastYear', label: 'Last Yr', sortable: false, class: 'text-center',
      },
      {
        key: 'VSeq', label: 'VSeq%', sortable: false, class: 'text-center',
      },
      {
        key: 'VYoy', label: 'VYoy%', sortable: false, class: 'text-center',
      },
      {
        key: 'OrgVyoy', label: 'Org V% YoY', sortable: false, class: 'text-center',
      },
      {
        key: 'ActualBookings', label: 'Actual Bookings', sortable: false, class: 'text-center',
      },
      {
        key: 'BookingsForecast', label: 'Bookings Forecast', sortable: false, class: 'text-center',
      },
      {
        key: 'BookToBill', label: 'Book-to-Bill', sortable: false, class: 'text-center', scaled: false,
      },
    ],
    PriorWeek_fields: [
      {
        key: 'col1',
        label: '',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'min-width': '230px', 'z-index': '5 !important' },
        class: 'fixed-rowheader-color',
      },
      {
        key: 'ActualSales', label: 'Actual Sales', sortable: false, class: 'text-center',
      },
      {
        key: 'BacklogCRD', label: 'Backlog per CRD', sortable: false, class: 'text-center',
      },
      {
        key: 'ContractRelease', label: 'Contract Releases', sortable: false, class: 'text-center',
      },
      {
        key: 'BookShip', label: 'Book & Ship', sortable: false, class: 'text-center',
      },
      {
        key: 'DemandForecast', label: 'Total Demand Forecast', sortable: false, class: 'text-center',
      },
      {
        key: 'DeferredBacklog', label: 'Deferred Backlog', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast', label: 'Sales Forecast', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast_LastMoQtr', label: 'Last Qtr', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast_LastYear', label: 'Last Yr', sortable: false, class: 'text-center',
      },
      {
        key: 'VSeq', label: 'VSeq%', sortable: false, class: 'text-center',
      },
      {
        key: 'VYoy', label: 'VYoy%', sortable: false, class: 'text-center',
      },
    ],
    OrgGrowth_fields: [
      {
        key: 'col1',
        label: '',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'min-width': '230px', 'z-index': '5 !important' },
        class: 'fixed-rowheader-color',
      },
      {
        key: 'SalesForecast', label: 'Current Forecast', sortable: false, class: 'text-center',
      },
      {
        key: 'SalesForecast_LastYear', label: 'Last Year', sortable: false, class: 'text-center',
      },
      {
        key: 'YoY', label: 'Last Year at Current Year FX', sortable: false, class: 'text-center',
      },
      {
        key: 'Target', label: 'AOP Target', sortable: false, class: 'text-center',
      },
      {
        key: 'AOP', label: 'AOP Target at Current Year FX', sortable: false, class: 'text-center',
      },
      {
        key: 'VYoy', label: 'V% YoY Reported', sortable: false, class: 'text-center',
      },
      {
        key: 'OrgVyoy', label: 'V% YoY Organic', sortable: false, class: 'text-center',
      },
      {
        key: 'VAOP', label: 'V% AOP Reported', sortable: false, class: 'text-center',
      },
      {
        key: 'VAOPOrg', label: 'V% AOP Organic', sortable: false, class: 'text-center',
      },
    ],
    BackLog_fields: [
      {
        key: 'action', label: '', sortable: false, class: 'text-center',
      },
      {
        key: 'ProductFamily',
        label: 'Product Family',
        sortable: true,
        sortDirection: 'desc',
        thStyle: { 'min-width': '230px', 'z-index': 5 },
        class: 'text-center',

      },
      // {
      //   key: 'businessLine', label: 'Business Line', sortable: true, class: 'text-center',
      // },
      // {
      //   key: 'productLine', label: 'Product Line', sortable: true, class: 'text-center',
      // },
      // {
      //   key: 'productFamily', label: 'Product Family', sortable: true, class: 'text-center',
      // },
      {
        key: 'SiteName', label: 'Site', sortable: true, class: 'text-center',
      },
      {
        key: 'Year', label: 'Year', sortable: true, class: 'text-center',
      },
      {
        key: 'MonthName', label: 'Month', sortable: true, class: 'text-center',
      },
      {
        key: 'DeferredBacklog', label: 'Deferred Backlog Amount', sortable: true, class: 'text-center',
      },
      {
        key: 'PONumber', label: 'PO No.', sortable: true, class: 'text-center',
      },
      {
        key: 'PartNo', label: 'Part No.', sortable: true, class: 'text-center',
      },
      {
        key: 'Comments', label: 'Comments', sortable: true, class: 'text-center',
      },
      {
        key: 'Reason', label: 'Reason', sortable: true, class: 'text-center',
      },
      {
        key: 'CustomerName', label: 'Customer Name', sortable: true, class: 'text-center',
      },
      {
        key: 'PartDescription', label: 'Part Description', sortable: true, class: 'text-center',
      },
    ],
    BackLogEntry_fields: [
      {
        key: 'actions', label: 'Site', sortable: false, class: 'text-center',
      },
      {
        key: 'siteid', label: 'Site', sortable: false, class: 'text-center',
      },
      {
        key: 'productid', label: 'Product Family', sortable: false, class: 'text-center',
      },
      {
        key: 'year', label: 'Year', sortable: false, class: 'text-center',
      },
      {
        key: 'month', label: 'Month', sortable: false, class: 'text-center',
      },
      {
        key: 'defBacklog', label: 'Deferred Backlog Amount', sortable: false, class: 'text-center',
      },
      {
        key: 'poNo', label: 'PO No.', sortable: false, class: 'text-center',
      },
      {
        key: 'partNo', label: 'Part No.', sortable: false, class: 'text-center',
      },
      {
        key: 'comments', label: 'Comments', sortable: false, class: 'text-center',
      },
      {
        key: 'reason', label: 'Reason', sortable: false, class: 'text-center',
      },
      {
        key: 'customerName', label: 'Customer Name', sortable: false, class: 'text-center',
      },
      {
        key: 'partDescription', label: 'Part Description', sortable: false, class: 'text-center',
      },
    ],
    BookForecast_fields: [
      {
        key: 'col1',
        label: 'Product Family',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'min-width': '230px', 'z-index': '5 !important', height: '40px' },
        class: 'text-center sticky-row',

      },
      {
        key: 'Jan', label: 'Jan', index: 1, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Feb', label: 'Feb', index: 2, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Mar', label: 'Mar', index: 3, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Apr', label: 'Apr', index: 4, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'May', label: 'May', index: 5, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Jun', label: 'Jun', index: 6, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Jul', label: 'Jul', index: 7, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Aug', label: 'Aug', index: 8, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Sep', label: 'Sep', index: 9, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Oct', label: 'Oct', index: 10, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Nov', label: 'Nov', index: 11, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Dec', label: 'Dec', index: 12, sortable: false, class: 'text-center sticky-row',
      },
      // {
      //   key: 'actions', label: '', index: 13, sortable: false, class: 'text-center sticky-row',
      // },
    ],
    DemandActuals_fields: [
      {
        key: 'col1',
        label: 'Product Family',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'z-index': '5 !important', height: '55px' },
        class: 'text-center sticky-row',

      },
      {
        key: 'MonthName', label: 'Month', index: 1, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'ActualBookings', label: 'Actual Bookings', index: 2, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'BookingsForecast', label: 'Bookings Forecast', index: 2, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'ActualSales', label: 'Actual Sales', index: 3, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'BacklogCRD', label: 'Backlog per CRD', index: 4, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'ContractRelease', label: 'Contract Releases', index: 5, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'POC', label: 'POC', index: 7, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'BookShip', label: 'Book Ship', index: 6, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'DemandForecast', label: 'Total Demand Forecast', index: 7, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'DeferredBacklog', label: 'Deferred Backlog', index: 7, sortable: false, class: 'text-center sticky-row',
      },
  
    ],
    SalesTarget_fields: [
      {
        key: 'col1',
        label: 'Product Family',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'z-index': '5 !important', height: '40px' },
        class: 'text-center sticky-row',

      },
      {
        key: 'MonthName', label: 'Month', index: 1, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Q1', label: 'Q1', index: 1, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Q2', label: 'Q2', index: 1, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Q3', label: 'Q3', index: 1, sortable: false, class: 'text-center sticky-row',
      },
      {
        key: 'Q4', label: 'Q4', index: 1, sortable: false, class: 'text-center sticky-row',
      },
    ],
    MonthlyTrend_fields: [
      {
        key: 'col1',
        label: '',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'height': '50px', 'z-index': '5 !important' },
        class: 'fixed-rowheader-color',
      },
      {
        key: 'Jan', label: 'Jan', sortable: false, class: 'text-center',
      },
      {
        key: 'Feb', label: 'Feb', sortable: false, class: 'text-center',
      },
      {
        key: 'Mar', label: 'Mar', sortable: false, class: 'text-center',
      },
      {
        key: 'Q1', label: 'Q1', sortable: false, class: 'text-center',
      },
      {
        key: 'Apr', label: 'Apr', sortable: false, class: 'text-center',
      },
      {
        key: 'May', label: 'May', sortable: false, class: 'text-center',
      },
      {
        key: 'Jun', label: 'Jun', sortable: false, class: 'text-center',
      },
      {
        key: 'Q2', label: 'Q2', sortable: false, class: 'text-center',
      },
      {
        key: 'Jul', label: 'Jul', sortable: false, class: 'text-center',
      },
      {
        key: 'Aug', label: 'Aug', sortable: false, class: 'text-center',
      },
      {
        key: 'Sep', label: 'Sep', sortable: false, class: 'text-center',
      },
      {
        key: 'Q3', label: 'Q3', sortable: false, class: 'text-center',
      },
      {
        key: 'Oct', label: 'Oct', sortable: false, class: 'text-center',
      },
      {
        key: 'Nov', label: 'Nov', sortable: false, class: 'text-center',
      },
      {
        key: 'Dec', label: 'Dec', sortable: false, class: 'text-center',
      },
      {
        key: 'Q4', label: 'Q4', sortable: false, class: 'text-center',
      },
      {
        key: 'Total', label: 'Total', sortable: false, class: 'text-center',
      },
    ],
    TxAudit_fields: [
      {
        key: 'col1',
        label: 'Site Name',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'z-index': '5 !important' },
        class: 'text-center',

      },
      {
        key: 'id', label: 'Trans ID', index: 1, sortable: false, class: 'text-center',
      },
      {
        key: 'account', label: 'Actual', index: 2, sortable: false, class: 'text-center',
      },
      {
        key: 'businessLine', label: 'Business Line', index: 3, sortable: false, class: 'text-center',
      },
      {
        key: 'productLine', label: 'Product Line', index: 4, sortable: false, class: 'text-center',
      },
      {
        key: 'productFamily', label: 'Product Family', index: 5, sortable: false, class: 'text-center',
      },
      {
        key: 'monthQtr', label: 'Month / Quarter', index: 6, sortable: false, class: 'text-center',
      },
      {
        key: 'year', label: 'Year', index: 7, sortable: false, class: 'text-center',
      },
      {
        key: 'prevAmt', label: 'Previous Amount', index: 13, sortable: false, class: 'text-center',
      },
      {
        key: 'newAmt', label: 'Amount Entered', index: 13, sortable: false, class: 'text-center',
      },
      {
        key: 'user', label: 'Transacted By', index: 13, sortable: false, class: 'text-center',
      },
      {
        key: 'transDate', label: 'Trans Date', index: 13, sortable: false, class: 'text-center',
      },
    ],
    UserMaintenance_fields: [
      {
        key: 'adLogin',
        name: 'adLogin',
        field: 'adLogin',
        label: 'AD Login',
        align: 'left',
        sortable: true,
        sortDirection: 'desc',
        thStyle: { 'min-width': '230px', 'z-index': '5 !important' },
        class: 'text-left'
      },
      {
        key: 'roleDescription', name: 'roleDescription', field: 'roleDescription', label: 'Account Type', align: 'left', sortable: false, class: 'text-left',
      },
      {
        key: 'name', name: 'name', field: 'name', label: 'Name', align: 'left', sortable: false, class: 'text-left', headStyle: { 'min-width': '330px' },
      },
      {
        key: 'siteAccess', name: 'siteAccess', field: 'siteAccess', label: 'Site Access', align: 'left', sortable: false, class: 'text-left',
      },
      {
        key: 'productAccess', name: 'productAccess', field: 'productAccess', label: 'Product Access', align: 'left', sortable: false, class: 'text-left', thStyle: { 'max-width': '230px' }
      },
      {
        key: 'action', name: 'action', field: 'action', label: 'Actions', align: 'left', sortable: false, class: 'text-center', headerStyle:'text-align:center !important'
      },
    ],

    // References
    sites: [
      { siteid: 1, siteName: 'Asslar' },
      { siteid: 2, siteName: 'Batam' },
      { siteid: 3, siteName: 'Munich' },
      { siteid: 4, siteName: 'Manila' },
      { siteid: 5, siteName: 'Shenzhen' },
      { siteid: 6, siteName: 'Singapore' },
      { siteid: 7, siteName: 'St. Asaph' },
    ],
    months: [
      { index: 1, name: 'Jan' },
      { index: 2, name: 'Feb' },
      { index: 3, name: 'Mar' },
      { index: 4, name: 'Apr' },
      { index: 5, name: 'May' },
      { index: 6, name: 'Jun' },
      { index: 7, name: 'Jul' },
      { index: 8, name: 'Aug' },
      { index: 9, name: 'Sep' },
      { index: 10, name: 'Oct' },
      { index: 11, name: 'Nov' },
      { index: 12, name: 'Dec' },

    ],
    currencies: [
      {
        key: 'col1',
        label: '',
        sortable: false,
        sortDirection: 'desc',
        thStyle: { 'z-index': '5 !important' },
        class: 'fixed-rowheader-color',
      },
      { key: 'gbp', label: 'GBP', class: 'text-center' },
      { key: 'gbp', label: 'GBP', class: 'text-center' },
      { key: 'chf', label: 'CHF', class: 'text-center' },
      { key: 'eur', label: 'EUR', class: 'text-center' },
      { key: 'cad', label: 'CAD', class: 'text-center' },
      { key: 'cny', label: 'CNY', class: 'text-center' },
      { key: 'hkd', label: 'HKD', class: 'text-center' },
      { key: 'idr', label: 'IDR', class: 'text-center' },
      { key: 'jpy', label: 'JPY', class: 'text-center' },
      { key: 'php', label: 'PHP', class: 'text-center' },
      { key: 'sgd', label: 'SGD', class: 'text-center' },
      { key: 'aud', label: 'AUD', class: 'text-center' },
      { key: 'myr', label: 'MYR', class: 'text-center' },
      { key: 'usd', label: 'USD', class: 'text-center' },
    ],
    userInfo:{
      userId: 0,
      adLogin: '',
      roleDescription: '',
      restriction: '',
      roleId: 3
    }
  },
  mutations: {
    setUserInfo(state, payload){
      state.userInfo = {...payload}
    },
    configPeriodDialog(state, payload) {
      // console.log('store.configPeriodDialog', payload)
      if (payload.selectedTypes && payload.selectedTypes.length > 0) {
        state.calc_periodTypes = state.period_type.filter((item) => payload.selectedTypes.indexOf(item.value) > -1);
        if (payload.selectedTypes.length === 1) {
          state.periodFilters.selectedPeriod.value = payload.selectedTypes[0];
        }
      } else {
        state.calc_periodTypes = state.period_type;
      }

      state.periodFilters.showPeriodSelect = payload.showPeriodSelect;
      state.periodFilters.showWOW = [...payload.showWOW];
    },
    setPeriodFilterToCurrent(state) {
      state.periodFilters.selectedMonth.value = state.current_period.month;
      state.periodFilters.selectedYear = state.current_period.year;
      state.periodFilters.selectedQtr = state.current_period.quarter;
      state.periodFilters.selectedWW1 = state.current_period.weekOfYear > 1 ? state.current_period.weekOfYear - 1 : state.current_period.weekOfYear;
      state.periodFilters.selectedWW2 = state.current_period.weekOfYear > 1 ? state.current_period.weekOfYear - 1 : state.current_period.weekOfYear;
    },
    setSelectedPeriodType(state, value) {
      state.periodFilters.selectedPeriod = value;
    },
    setSelectedMonth(state, value) {
      state.periodFilters.selectedMonth = value;
    },
    setSelectedYear(state, value) {
      state.periodFilters.selectedYear = value;
    },
    setSelectedQtr(state, value) {
      state.periodFilters.selectedQtr = value;
    },
    setSelectedWW1(state, value) {
      state.periodFilters.selectedWW1 = value;
    },
    setSelectedWW2(state, value) {
      state.periodFilters.selectedWW2 = value;
    },
    setPeriodFilters(state, value) {
      const x = { ...state.periodFilters, ...value };
      state.periodFilters = x;
    },
    setCurrentPeriod(state, value) {
      const x = { ...value };
      state.current_period = x;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getPeriodTypes: (state) => state.calc_periodTypes,
    getPeriodDescription: (state) => {
      state.periodFilters.periodDescription = ''

      if (state.periodFilters.selectedPeriod.value === 1) {
        state.periodFilters.periodDescription = `${state.periodFilters.selectedMonth.text} ${state.periodFilters.selectedYear.toString()}`;
      } if (state.periodFilters.selectedPeriod.value === 2) {
        state.periodFilters.periodDescription = `Q${state.periodFilters.selectedQtr.toString()} ${state.periodFilters.selectedYear.toString()}`;
      } if (state.periodFilters.selectedPeriod.value === 3) {
        state.periodFilters.periodDescription = state.periodFilters.selectedYear.toString();
      } if (state.periodFilters.selectedPeriod.value === 4) {
        state.periodFilters.periodDescription = `LTM from ${state.periodFilters.selectedMonth.text} ${state.periodFilters.selectedYear.toString()}`;
      }

      return state.periodFilters.periodDescription;
    },
    getPeriodFilters: (state) => state.periodFilters,
    getTxAuditFields: (state) => state.TxAudit_fields,
    getReportDataMenu: (state) => state.report_data,
    getDataEntryMenu: (state) => state.entry_data,
    getMiscMenu: (state) => state.misc_data,
    getAdminMenu: (state) => state.admin_data,
    getSABFields: (state) => {
      const periodIndex = state.periodFilters.selectedPeriod.value;

      const result = state.SAB_fields.filter((item, index) => {
        if (periodIndex === 1 && (item.key === 'SalesForecast_LastMoQtr')) {
          item.label = 'Last Month';
        } else if (periodIndex === 2 && (item.key === 'SalesForecast_LastMoQtr')) {
          item.label = 'Last Qtr';
        }

        if (item.key === 'wowLabel') return false

        if (periodIndex > 2 && (item.key === 'VSeq' || item.key === 'SalesForecast_LastMoQtr')) {
          // exclude these fields on Annual, LTM
          return false;
        }
        if ([2, 3].indexOf(periodIndex) === -1 && item.key === 'OrgVyoy') {
          // only availale in Quarter and Annual Report
          return false;
        }
        return true;
      });
      return [...result];
    },
    getSASFields: (state) => {
      const periodIndex = state.periodFilters.selectedPeriod.value;

      const result = state.SAB_fields.filter((item, index) => {
        if (item.key === 'OrgVyoy') return false;

        if (periodIndex === 1 && (item.key === 'SalesForecast_LastMoQtr')) {
          item.label = 'Last Month';
        } else if (periodIndex === 2 && (item.key === 'SalesForecast_LastMoQtr')) {
          item.label = 'Last Qtr';
        }

        if (item.key === 'wowLabel') return false

        if (periodIndex > 2 && (item.key === 'VSeq' || item.key === 'SalesForecast_LastMoQtr')) {
          // exclude these fields on Annual, LTM
          return false;
        } 
        if ([2, 3].indexOf(periodIndex) === -1 && item.key === 'OrgVyoy') {
          // only availale in Quarter and Annual Report
          return false;
        }
        return true;
      });
      return [...result];
    },
    getPriorWeekFields: (state) => {
      // return state.PriorWeek_fields
      const result = state.SAB_fields.filter((item, index) => {
        if (item.key === 'OrgVyoy'
          || item.key === 'Currency'
          || item.key === 'Target'
          || item.key === 'ActualBookings'
          || item.key === 'BookingsForecast'
          || item.key === 'BookToBill'
          || item.key === 'wowLabel') return false;

        return true;
      });
      return [...result];
    },
    getWOWFields: (state) => {
      // return state.PriorWeek_fields
      const result = state.SAB_fields.filter((item, index) => {
        if (item.key === 'OrgVyoy'
          || item.key === 'Currency'
          || item.key === 'Target'
          || item.key === 'ActualBookings'
          || item.key === 'BookingsForecast'
          || item.key === 'BookToBill') return false;

        return true;
      });
      return [...result];
    },
    getOrganicGrowthFields: (state) => state.OrgGrowth_fields,
    getBackLogFields: (state) => state.BackLog_fields,
    getBackLogEntryFields: (state) => state.BackLogEntry_fields,
    getBookForecastFields: (state) => state.BookForecast_fields,
    getDemandActualFields: (state) => state.DemandActuals_fields,
    getDemandActualEntryFields: (state) => {
      const x = state.DemandActuals_fields.filter((field) => field.key !== 'col1');
      return [...x];
    },
    getSalesTargetFields: (state) => state.SalesTarget_fields,
    getSalesTargetEntryFields: (state) => {
      const x = state.SalesTarget_fields.filter((field) => field.key !== 'col1');
      return [...x];
    },
    getMonthlyTrendFields: (state) => state.MonthlyTrend_fields,
    getAutoExpand: (state) => state.autoExpand,
    getSites: (state) => state.sites,
    getMonths: (state) => state.months,
    getFXRateFields: (state) => state.currencies,
    getUserMaintenanceFields: (state) => state.UserMaintenance_fields,
  },
});
