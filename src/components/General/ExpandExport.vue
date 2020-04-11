<template>
  <div>
    <v-tooltip bottom v-if="!hideSaveAll">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('save-all')">
            <v-icon color="white">mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Save All (Open Items)</span>
      </v-tooltip>

    <v-tooltip bottom v-if="!hideRefresh">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('refresh')">
            <v-icon color="white">mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh</span>
      </v-tooltip>

    <v-tooltip bottom v-if="!hideCurrency">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="white" icon small elevation="0" @click.stop="$eventHub.$emit('toggle-currency')">
            <v-icon>{{ localCurrency ? 'mdi-currency-usd-off' : 'mdi-currency-usd' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ localCurrency ? 'Local Currency: ON' : 'Local Currency: OFF'}}</span>
      </v-tooltip>

    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('toggle-expand')">
            <v-icon color="white">{{ expand ? 'mdi-collapse-all' : 'mdi-expand-all' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ `Auto Expand: ${ expand ? 'ON' : 'OFF'}`}}</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideExportLevel">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('export-level')">
            <v-icon color="white">mdi-table-eye</v-icon>
          </v-btn>
        </template>
        <span>Export Expanded Level To Excel</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideExportAll">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('export-all')">
            <v-icon color="white">mdi-microsoft-excel</v-icon>
          </v-btn>
        </template>
        <span>Export All To Excel</span>
      </v-tooltip>

      <v-menu :close-on-content-click="true" bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="white" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list style="min-width:230px" class="cc-menu-list">

          <v-list-item @click="$eventHub.$emit('refresh')" no-action>
            <v-list-item-action>
              <v-icon color="white">mdi-refresh</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Refresh</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


        </v-list>
      </v-menu>
  </div>
</template>

<script>
//import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ExpandExport',
  props: {
    expand: {
      type: Boolean,
      default: false
    },
    target:{
      type:String,
      default: 'default'
    },
    hideExportLevel: {
      type:Boolean,
      default: false
    },
    hideExportAll: {
      type:Boolean,
      default: false
    },
    hideSaveAll: {
      type: Boolean,
      default: true
    },
    hideCurrency:{
      type:Boolean,
      default: true
    },
    hideRefresh:{
      type:Boolean,
      default:false
    },
    localCurrency: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  computed: {
  },  
  methods: {    
  },
  mounted() {
  },
  beforeDestroy(){
  }
};
</script>
