<template>
  <section>
    <div class="container specs">
      <div class="columns header">
        <div class="column is-10">
          <h1 class="title">
            Specifications
          </h1>
        </div>
        <div class="column">
          <div class="tabs is-toggle">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small"><i class="fa fa-thumbs-down"></i></span>
                  <span>Imperial</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small"><i class="fa fa-thumbs-up"></i></span>
                  <span>Metric</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2 class="title">Body</h2>
      <div class="tabs">
        <ul>
          <li class="is-active">
            <a>
              <span class="icon is-small"><i class="fa fa-black-tie"></i></span>
              <span>Saloon</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fa fa-users"></i></span>
              <span>Estate</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fa fa-question"></i></span>
              <span>Elf</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fa fa-hand-peace-o"></i></span>
              <span>Moke</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <div class="card-content">
              <h3 class="title">
                Classic Mini Saloon
              </h3>
              <p class="subtitle">
                The most iconic of the Classic mini body styles, the Saloon is what most people attribute to the Classic Mini Cooper.
              </p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half aside-value">
              <h3 class="title">{{ body.weight.saloonLb}}lbs</h3>
              <p>Weight</p>
              <hr>
            </div>
            <div class="column is-half aside-value">
              <h3 class="title">{{ body.wheelbase.saloonIn}}in</h3>
              <p>Wheelbase</p>
              <hr>
            </div>
          </div>
        </div>
        <div class="column">
          Second column
        </div>
      </div>
      <h2 class="title">Engine</h2>
      <div class="tabs">
        <ul>
          <li class="is-active">
            <a>
              <span class="icon is-small"><i class="fa fa-black-tie"></i></span>
              <span>Saloon</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fa fa-users"></i></span>
              <span>Estate</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fa fa-question"></i></span>
              <span>Elf</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fa fa-hand-peace-o"></i></span>
              <span>Moke</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./specs.scss"></style>
<script>
export default {
  data: function () {
    return {
      'unit': {
        'weight': {
          'metric': 'kg',
          'imperial': 'lbs'
        },
        'length': {
          'metric': 'mm',
          'imperial': 'in'
        },
        'power': {
          'metric': 'kw',
          'imperial': 'hp'
        },
        'torque': {
          'metric': 'nm',
          'imperial': 'lb/ft'
        }
      },
      'body': {
        'wheelbase': {
          'metric': {
            'saloon': 2036,
            'estate': 2138
          },
          'imperial': {
            'saloon': 80.2,
            'estate': 84.2
          }
        },
        'length': {
          'metric': {
            'saloon': 3054,
            'estate': 3299,
            'hornet': 3300
          },
          'imperial': {
            'saloon': 120.2,
            'estate': 129.9,
            'hornet': 130
          }
        },
        'width': {
          'metric': {
            'saloon': 1397,
            'estate': 1397,
            'hornet': 1397
          },
          'imperial': {
            'saloon': 55,
            'estate': 55,
            'hornet': 55
          }
        },
        'height': {
          'metric': {
            'saloon': 1346,
            'estate': 1346,
            'hornet': 1346
          },
          'imperial': {
            'saloon': 53,
            'estate': 53,
            'hornet': 53
          }
        },
        'weight': {
          'metric': {
            'saloon': 617,
            'estate': 686,
            'hornet': 617
          },
          'imperial': {
            'saloon': 1360,
            'estate': 1512,
            'hornet': 1360
          }
        }
      },
      'engines': {
        'engine850a': {
          'prodYears': '1959 - 1980',
          'displacement': 850,
          'power': {
            'metric': 25,
            'imperial': 34
          },
          'torque': {
            'metric': 60,
            'imperial': 44
          }
        },
        'engine998a': {
          'prodYears': '1959 - 1980',
          'displacement': 998,
          'power': {
            'metric': 31,
            'imperial': 41
          },
          'torque': {
            'metric': 71,
            'imperial': 52
          }
        },
        'engine1071a': {
          'prodYears': '1963 - 1964',
          'displacement': 1071,
          'power': {
            'metric': 52,
            'imperial': 70
          },
          'torque': {
            'metric': 84,
            'imperial': 62
          }
        },
        'engine1098a': {
          'prodYears': '1969 - 1980',
          'displacement': 1098,
          'power': {
            'metric': 34,
            'imperial': 45
          },
          'torque': {
            'metric': 76,
            'imperial': 56
          }
        },
        'engine1275a': {
          'prodYears': '1964 - 1980',
          'displacement': 1275,
          'power': {
            'metric': 57,
            'imperial': 76
          },
          'torque': {
            'metric': 107,
            'imperial': 79
          }
        },
        'engine998plus': {
          'prodYears': '1980 - 1992',
          'displacement': 998,
          'power': {
            'metric': 33,
            'imperial': 44
          },
          'torque': {
            'metric': 71,
            'imperial': 52
          }
        },
        'engine1275plus': {
          'prodYears': '1980 - 1996',
          'displacement': 1275,
          'power': {
            'metric': 58,
            'imperial': 78
          },
          'torque': {
            'metric': 106,
            'imperial': 78
          }
        },
        'engine1275MPIplus': {
          'prodYears': '1997 - 2000',
          'displacement': 1275,
          'power': {
            'metric': 47,
            'imperial': 63
          },
          'torque': {
            'metric': 95,
            'imperial': 70
          }
        }
      }
    };
  },
  methods: {

  }
};
</script>
