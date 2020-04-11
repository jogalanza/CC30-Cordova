export default {
  methods: {
    calcBookToBillTotal(BookingsForecast, SalesForecast, formatted = true) {
      // console.log(key);
      let result = 0;
      if (SalesForecast && SalesForecast > 0) result = BookingsForecast / SalesForecast;

      if (formatted) {
        return this.formatNumber(result, false, 2);
      } return result;
    },
    calcVYoy(SalesForecast, salesForecast_lastPeriod, formatted = true, decimal = 0) {
      // same formula as VSeq
      let result = 0;
      if (salesForecast_lastPeriod && salesForecast_lastPeriod > 0) result = ((SalesForecast / salesForecast_lastPeriod) - 1) * 100;

      if (formatted) {
        return this.formatNumber(result, false, decimal);
      } return result;
    },
    calcVYoy_ItemArrayPlus(items, field, index, formatted = true) {
      // same formula as VSeq
      return this.calcVYoy(this.calcItemsArrayPlus('SalesForecast', items, index, false), this.calcItemsArrayPlus(field, items, index, false), formatted);
    },
    calcOrgVYoy(SalesForecast, salesForecast_lastYr, yoyIndex, formatted = true, decimal = 0) {
      // console.log(key);
      let result = 0;
      if (salesForecast_lastYr && yoyIndex && salesForecast_lastYr > 0) result = ((SalesForecast - salesForecast_lastYr - (yoyIndex * 1000)) / salesForecast_lastYr) * 100;

      if (formatted) {
        return this.formatNumber(result, false, decimal);
      } return result;
    },
  },
};
