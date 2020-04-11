export default {
  methods: {
    colwidthCalc(key) {
      return {
        width: key === 'col1' ? '250px' : key === 'actions' ? '32px' : '70px',
      };
    },
  },
};
