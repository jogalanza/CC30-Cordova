export default {
  methods: {
    calcItems(key) {
      // console.log(key);
      let result = 0;
      if (key && this.items) {
        this.items.forEach((item, index) => {
          if (item[key]) {
            if (Number(item[key])) {
              // console.log(item[key]);
              result += Number(item[key]);
            }
          }
        });
      }
      return this.formatNumber(result);
    },
    calcItemsPlus(key, _items, formatted = true, scaled = true, decimalPlace) {
      // console.log(key);
      let result = 0;
      if (key && _items) {
        _items.forEach((_item, index) => {
          if (_item[key]) {
            if (Number(_item[key])) {
              // console.log(item[key]);
              result += Number(_item[key]);
            }
          }
        });
      }
      if (formatted) {
        return this.formatNumber(result, scaled, decimalPlace);
      } return result;
    },
    calcItemsArrayPlus(key, _items, index, formatted = true) {
      // console.log(key);
      let result = 0;
      if (key && _items) {
        _items.forEach((_item, i) => {
          if (_item[key] && index < _item[key].length) {
            if (Number(_item[key][index])) {
              // console.log('calcItemsArrayPlus', result, _item[key][index]);
              result += Number(_item[key][index]);
            }
          }
        });
      }
      if (formatted) {
        return this.formatNumber(result);
      } return result;
    },
    sumRowItems(keyArray, rowData, formatted = true) {
      let result = 0;
      // console.log('sumRowItems',keyArray, rowData)
      if (keyArray && rowData) {
        keyArray.forEach((key, i) => {
          if (rowData.item[key]) {
            if (Number(rowData.item[key])) {
              result += Number(rowData.item[key]);
            }
          }
        });
      }
      if (formatted) {
        return this.formatNumber(result);
      } return result;
    },
    colwidthCalc(key) {
      // console.log('mixin.colwidthCalc')
      return {
        width: key === 'col1' ? '280px' : key === 'actions' ? '32px' : '70px',
      };
    },
    numberValStyle(val) {
      if (val && Number(val)) {
        if (Number(val) < 0) return 'row-text row-text-negative';
      }
      return 'row-text';
    },
    calcVariance(val1, val2, formatted = true) {
      let result = 0;
      if (this.calcReverse) {
        result = (val2 === null ? 0 : val2) - (val1 === null ? 0 : val1);
      } else {
        result = (val1 === null ? 0 : val1) - (val2 === null ? 0 : val2);
      }

      if (formatted) {
        return this.formatNumber(result);
      } return result;
    },
    calcQuarter(row, qtr) {
      if (qtr === 1) {
        row.item.Q1 = this.sumRowItems(['Jan', 'Feb', 'Mar'], row, false);
        return this.formatNumber(row.item.Q1);
      }
      if (qtr === 2) {
        row.item.Q2 = this.sumRowItems(['Apr', 'May', 'Jun'], row, false);
        return this.formatNumber(row.item.Q2);
      }
      if (qtr === 3) {
        row.item.Q3 = this.sumRowItems(['Jul', 'Aug', 'Sep'], row, false);
        return this.formatNumber(row.item.Q3);
      }
      if (qtr === 4) {
        row.item.Q4 = this.sumRowItems(['Oct', 'Nov', 'Dec'], row, false);
        return this.formatNumber(row.item.Q4);
      }
    },
    calcRowTotal(row) {
      row.item.Total = this.sumRowItems(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], row, false);
      return this.formatNumber(row.item.Total);
    },
  },
};
