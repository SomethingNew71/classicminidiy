<template>
   <!-- TODO: REVIST THIS ENGINE SECTION OR CREATE ITS OWN SECTION? -->
</template>


<style lang="scss" src="./engines.scss"></style>

<script>
export default {
  // TODO:
  data: function () {
    return {
      engines: {
        '850a': {
          Name: '850cc',
          'Production Years': '1959 - 1980',
          Displacement: 850,
          Power: {
            metric: 25,
            imperial: 34
          },
          Torque: {
            metric: 60,
            imperial: 44
          }
        },
        '998a': {
          Name: '998cc',
          'Production Years': '1959 - 1980',
          Displacement: 998,
          Power: {
            metric: 31,
            imperial: 41
          },
          Torque: {
            metric: 71,
            imperial: 52
          }
        },
        '998a+': {
          Name: 'A+ 998cc',
          'Production Years': '1980 - 1992',
          Displacement: 998,
          Power: {
            metric: 33,
            imperial: 44
          },
          Torque: {
            metric: 71,
            imperial: 52
          }
        },
        '1071a': {
          Name: '1071cc',
          'Production Years': '1963 - 1964',
          Displacement: 1071,
          Power: {
            metric: 52,
            imperial: 70
          },
          Torque: {
            metric: 84,
            imperial: 62
          }
        },
        '1098a': {
          Name: '1100/1098cc',
          'Production Years': '1969 - 1980',
          Displacement: 1098,
          Power: {
            metric: 34,
            imperial: 45
          },
          Torque: {
            metric: 76,
            imperial: 56
          }
        },
        '1275a': {
          Name: '1275cc',
          'Production Years': '1964 - 1980',
          Displacement: 1275,
          Power: {
            metric: 57,
            imperial: 76
          },
          'Torque': {
            metric: 107,
            imperial: 79
          }
        },
        '1275+': {
          Name: 'A+ 1275cc',
          'Production Years': '1980 - 1996',
          Displacement: 1275,
          Power: {
            metric: 58,
            imperial: 78
          },
          'Torque': {
            metric: 106,
            imperial: 78
          }
        },
        '1275mpi+': {
          Name: 'MPI A+ 1275cc',
          'Production Years': '1997 - 2000',
          Displacement: 1275,
          Power: {
            metric: 47,
            imperial: 63
          },
          Torque: {
            metric: 95,
            imperial: 70
          }
        }
      }
    };
  }
};
</script>
