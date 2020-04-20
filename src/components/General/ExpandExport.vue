<template>
  <div>
    <v-tooltip bottom v-if="!hideRefresh">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('refresh', target)">
            <v-icon :color="iconColor">mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh</span>
      </v-tooltip>

    <v-tooltip bottom v-if="!hideAddNew">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('add-new', target)">
            <v-icon :color="iconColor">mdi-database-plus</v-icon>
          </v-btn>
        </template>
        <span>Add New Entry</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideEdit">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('edit-entry', target)">
            <v-icon :color="iconColor">mdi-file-edit</v-icon>
          </v-btn>
        </template>
        <span>{{ `Edit Mode: ${editMode ? 'ON' : 'OFF'}` }}</span>
      </v-tooltip>

    <v-tooltip bottom v-if="!hideSaveAll">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('save-all', target)">
            <v-icon :color="iconColor">mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Save Changes</span>
      </v-tooltip>

       <v-tooltip bottom v-if="!hidePaste">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('paste', target)">
            <v-icon :color="iconColor">mdi-content-paste</v-icon>
          </v-btn>
        </template>
        <span>Paste (Ctrl + V)</span>
      </v-tooltip>
      
      <v-tooltip bottom v-if="!hideDelete">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('delete-selected', target)">
            <v-icon :color="iconColor">mdi-delete-alert</v-icon>
          </v-btn>
        </template>
        <span>Delete Selected Item(s)</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideWowToggle">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('toggle-compact-view', target)">
            <v-icon :color="iconColor">mdi-table-sync</v-icon>
          </v-btn>
        </template>
        <span>{{ `Compact View: ${integratedMode ? 'ON' : 'OFF'}`}}</span>
      </v-tooltip>

    <v-tooltip bottom v-if="!hideCurrency">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="white" icon small elevation="0" @click.stop="$eventHub.$emit('toggle-currency', target)">
            <v-icon :color="iconColor">{{ localCurrency ? 'mdi-currency-usd-off' : 'mdi-currency-usd' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ localCurrency ? 'Local Currency: ON' : 'Local Currency: OFF'}}</span>
      </v-tooltip>

    <v-tooltip bottom v-if="!hideExpand">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('toggle-expand', target)">
            <v-icon :color="iconColor">{{ expand ? 'mdi-collapse-all' : 'mdi-expand-all' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ `Auto Expand: ${ expand ? 'ON' : 'OFF'}`}}</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideExportLevel">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('export-level', target)">
            <v-icon :color="iconColor">mdi-table-eye</v-icon>
          </v-btn>
        </template>
        <span>Export Expanded Level To Excel</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideExportAll">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('export-all', target)">
            <v-icon :color="iconColor">mdi-microsoft-excel</v-icon>
          </v-btn>
        </template>
        <span>Export All To Excel</span>
      </v-tooltip>

      <v-tooltip bottom v-if="!hideImport">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="$eventHub.$emit('import-file', target)">
            <v-icon :color="iconColor">mdi-application-import</v-icon>
          </v-btn>
        </template>
        <span>Import</span>
      </v-tooltip>

      <v-menu :close-on-content-click="true" bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn :color="iconColor" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list style="min-width:230px" class="cc-menu-list">

          <v-list-item @click="$eventHub.$emit('refresh', target)" no-action>
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
    iconColor: {
      type: String,
      default: 'white'
    },
    expand: {
      type: Boolean,
      default: false
    },
    target:{
      type:String,
      default: 'default'
    },
    hideEdit:{
      type:Boolean,
      default:true
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
    hidePaste: {
      type: Boolean,
      default: true
    },
    hideCurrency:{
      type:Boolean,
      default: true
    },
    hideExpand:{
      type:Boolean,
      default:false
    },
    hideRefresh:{
      type:Boolean,
      default:false
    },
    hideWowToggle: {
      type: Boolean,
      default: true
    },
    integratedMode: {
      type: Boolean,
      default: false
    },
    localCurrency: {
      type: Boolean,
      default: false
    },
    hideDelete:{
      type:Boolean,
      default:true
    },
    hideAddNew:{
      type:Boolean,
      default: true
    },
    hideImport:{
      type:Boolean,
      default: true
    },
    editMode:{
      type:Boolean,
      default:false
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
