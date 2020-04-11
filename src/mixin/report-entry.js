/**
 * Use this mixin only at Report Entry/Portal (e.g. Start At Business, etc) and not at component level
 */
export default {
    data: () => ({
        openTables: [],
        localCurrency: false
    }),
    methods: {
        tableMounted(level){
            //console.log('tableMounted', level)
            if (this.openTables.length < level){
                this.openTables.push(1)
                return
            }       
            var x = this.openTables[level - 1] + 1
            this.$set(this.openTables, level - 1, x)
        },
        tableDestroyed(level){
            //console.log('tableDestroyed', level)
            if (level <= this.openTables.length){
                var x = this.openTables[level - 1] - 1
                this.$set(this.openTables, level - 1, x)
            }
        },
        ExportLevel(){
            this.exportReport(this.reportDepth)
        },
        ExportAll(){
            this.exportReport(this.offsetLevel)
        }
    },
    computed: {
        reportDepth(){
            var x = 0
            this.openTables.forEach((item, index)=>{
                if (item > 0) x = index
            })
            return x + 1
        }
    },
    mounted(){
        this.$eventHub.$on('table-mounted', this.tableMounted)
        this.$eventHub.$on('table-destroyed', this.tableDestroyed)
        this.$eventHub.$on('export-level', this.ExportLevel)
        this.$eventHub.$on('export-all', this.ExportAll)
    },
    beforeDestroy(){
        this.$eventHub.$off('table-mounted', this.tableMounted)
        this.$eventHub.$off('table-destroyed', this.tableDestroyed)
        this.$eventHub.$off('export-level', this.ExportLevel)
        this.$eventHub.$off('export-all', this.ExportAll)
    }
  };
  