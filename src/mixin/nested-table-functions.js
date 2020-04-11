export default {
  methods: {
    collapseExpand(expand = true) {
      /**
             * thisTable - the name of the table with row details
             * Please observe component structure and object names
             */
      // console.log('collapseExpand', this.$refs)
      // this.$refs.thisTable
      if (this.$refs.thisTable && this.$refs.thisTable.$refs.itemRows) {
        const rows = this.$refs.thisTable.$refs.itemRows;
        // console.log(_this.$refs.thisTable.$refs.itemRows);
        rows.forEach((element) => {
          // console.log(element.$attrs)
          //console.log(element, element.$el.firstChild.firstElementChild)
          const x = element.$el.firstChild.firstElementChild; // i.e. div.row-header
          if (!element.$attrs['aria-details'] && expand) {
            x.click();
          } else if (element.$attrs['aria-details'] && !expand) {
            x.click();
          }
        });
      }
    },
  },
};
