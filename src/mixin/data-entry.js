/**
 * Use this mixin only at Report Entry/Portal (e.g. Start At Business, etc) and not at component level
 */
export default {
    data: () => ({
        localCurrency: false,
        expand: false
    }),
    methods: {
        GetDataEntrySites(){
            console.log('Data Entry mixin GetDataEntrySites')
            var _this  = this
            this.$http.post(`dataentry/sites`, this.periodFilters)
              .then((response) => {
                if (response.data !== ''){
                  _this.items = [...response.data.result]
                }
              })
              .catch((error) => {
                console.error(error)
              })
        },
        ToggleCurrency(){
            this.localCurrency = !this.localCurrency
            this.GetDataEntrySites()
        }
    },
    computed: {
    },
    mounted(){
        this.$eventHub.$on('period-changed', this.GetDataEntrySites)
        this.$eventHub.$on('toggle-currency', this.ToggleCurrency)
        this.$eventHub.$on('refresh', this.GetDataEntrySites)
    },
    beforeDestroy(){
        this.$eventHub.$off('period-changed', this.GetDataEntrySites)
        this.$eventHub.$off('toggle-currency', this.ToggleCurrency)
        this.$eventHub.$off('refresh', this.GetDataEntrySites)
    }
  };
  