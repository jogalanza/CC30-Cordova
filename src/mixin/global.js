export default {
  data: () => ({
    viewScale: 1000,
  }),
  methods: {
    scaleDownNumber(num, decimalPlace = 1, key){
      console.log(key, num)
      let _num = Number(num);
      if (!isNaN(_num)) {
        if (num === null || num === '') return '';
        console.log(_num, _num / this.viewScale )

        _num = _num / this.viewScale; // scale view default by 1000        
        
        _num = _num.toFixed(decimalPlace);
        console.log(_num)
        return _num;
        
      } 
      return num;
    },
    formatNumber(num, scaled = true, decimalPlace = 0, unformatted = false) {
      // console.log('formatNumber',num)
      // VERSION 1
      // var hasDecimal = num % 1 !== 0

      // if (decimalPlace > -1){
      //   if (forceDecimal) { num = num.toFixed(decimalPlace)}
      //   else if (hasDecimal) { num = num.toFixed(decimalPlace)}
      // }
      // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

      // VERSION 2
      //console.log('formatNumber')
      let _num = Number(num);
      if (!isNaN(_num)) {
        if (num === null || num === '') return '';

        if (scaled) _num /= this.viewScale; // scale view default by 1000

        // if (_num % 1 === 0 && !forceDecimal && decimalPlace !== undefined){
        //   decimalPlace = 0
        // }
        
        if (decimalPlace !== undefined) {
          _num = _num.toFixed(decimalPlace);
        }

        if (_num * -1 === 0) _num *= -1; // removed signed zero

        if (!unformatted) return _num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
        else return _num
        // _num.toFixed(decimalPlaces);
      } return num;
    },
    isStickySupported() {
      const prop = 'position:';
      const value = 'sticky';
      const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

      const el = document.createElement('a');
      const mStyle = el.style;
      mStyle.cssText = prop + prefixes.join(`${value};${prop}`).slice(0, -prop.length);

      // console.log('Check Sticky support', mStyle.position.indexOf(value));

      return mStyle.position.indexOf(value) !== -1;
    },
    configurePeriodDialog(_selectedTypes, _showPeriodSelect, _showWOW = []) {
      const payload = {
        selectedTypes: _selectedTypes,
        showPeriodSelect: _showPeriodSelect,
        showWOW: [..._showWOW],
        showDialogButton: true
      };
      this.$store.commit('configPeriodDialog', payload);
    },
    HidePeriodSelector(){
      this.$store.state.periodFilters.showDialogButton = false
    },
    registerHubID(id) {
      console.log(`Registering hub ${id}`);
      const _this = this;

      this.$http.post(`registerhub/${id}`)
        .then((response) => {
          // handle success
          console.log(response);
        })
        .catch((error) => {
          // handle error
          console.warn(error);
        })
        .then(() => {
        });
    },
    SetObjectKeyValue(arr, key, value){
      arr.forEach(element => {
        element[key] = value       
      });
    },
    ConfirmDelete(target, callback, message, title){
      console.log('ConfirmDelete', target, callback, message, title)
      if (target && callback){
        var caller = {
          Target: target,
          message: message || 'Do you really want to delete this item?',
          title: title || 'Delete',
          callback: callback
        }
        this.$eventHub.$emit('show-confirm-dialog', caller)
      }      
    },
    NotifyRequestError(_message){
      var result = {
        success: false,
        message: _message
      }
      this.$eventHub.$emit('show-alert', result)
    }
  },
};
