<template>
  <v-layout wrap class="electrical">
    <v-flex xs12 sm8 class="pb-5">
      <v-flex xs12>
        <h2 class="headline pl-4 pt-4 mb-0">Wiring Diagrams</h2>
        <aside class="subheading pl-4 py-0 my-0 subheader">Documents redrawn by Mike L on The Mini Forum</aside>
        <aside class="subheading pl-4 py-0">
          <v-btn href="http://www.theminiforum.co.uk/forums/topic/324929-wire-diagrams-redrawn/" primary tag="a" target="_blank" dark class="ml-0">Source</v-btn>
        </aside>
      </v-flex>
      <!-- POSITIVE GROUND SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">Positive Ground</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.positiveGround">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <!-- NEGATIVE GROUND SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">Negative Ground</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.negativeGround">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <!-- BRITISH LEYLAND SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">From British Leyland AKD 4935 (9th edition)</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.britishLeyland">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <!-- EARLY ROVER SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">From Rover Repair Manual AKM 6353</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.earlyRover">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <!-- LATER ROVER SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">From Rover repair manual AKM 7169</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.laterRover">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <!-- HORNET ELF SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">BMC Hornet and Elf  AKM 4062D</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.hornetElf">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <!-- AUS MINI SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">Australian Workshop Manual Supplement Publication TP 759 A</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.ausMinis">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">
                  {{diagram.from}} to {{diagram.to}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-flex>
    <v-flex xs12 sm3 class="pt-5">
      <v-card>
        <v-card-text>
          <!-- CMDIY - Electrical Diagrams -->
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-0523971861051053"
               data-ad-slot="2859974597"
               data-ad-format="auto"></ins>
          <script>
          /* eslint-disable */
          (adsbygoogle = window.adsbygoogle || []).push({});
          /* eslint-enable */
          </script>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style lang="scss" src="./electricaldocs.scss"></style>

<script>
export default {
  data: function () {
    return {
      diagrams: {
        positiveGround: [
          {
            name: 'Mini Super/Super Deluxe/Countryman/Traveller/Cooper',
            from: 1959,
            to: 1964,
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSMlI3VW9LY1ZPNE0'
          },
          {
            name: 'Mini Standard and Deluxe',
            from: 1959,
            to: 1964,
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSRmpWS2ZrcFpiR0k'
          },
          {
            name: 'Mini Saloon/Van/Pickup',
            from: 1964,
            to: 1967,
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSeWJhUlljU3pNdG8'
          },
          {
            name: 'Mini Cooper/Cooper S/Countryman/Traveller/Super Deluxe',
            from: 1964,
            to: 1967,
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSdzNGX3hLWldRaEE'
          },
          {
            name: 'Mini Super Deluxe/Countryman/Traveller/Cooper/Cooper S Mk2',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSeFlmQUdEd21ER1E'
          },
          {
            name: 'Mini Standard Saloon/Van/Pickup Mk2',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSX0V4Q1A2aXlPRzg'
          },
          {
            name: 'Mini Moke',
            from: '1959',
            to: '1967',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSNlQ0X1VJeFBBcDA'
          },
          {
            name: 'Mini Moke Mk2',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSc1VXMXpYNjNfX2c'
          }
        ],
        negativeGround: [
          {
            name: 'Mini 850 Deluxe Saloon/Van/Pickup',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSMlR3eXp4N3hETUU'
          },
          {
            name: 'Mini 1000 Special Deluxe Saloon/Cooper S Mk3',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSZUJGREV6bllUc0U'
          },
          {
            name: 'Mini 1275 GT',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSUUJRdmJKWjg3YVU'
          },
          {
            name: 'Mini Clubman Saloon/Estate',
            from: '',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSRVlJMkJyUFltdGs'
          }
        ],
        britishLeyland: [
          {
            name: 'Mini 1000 Saloon(Canada)',
            from: '',
            to: '1976',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSYmlGa0VTM2lhbjg'
          },
          {
            name: 'Mini 850 Deluxe/Van/Pickup with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSSFFqc0RPWHNfQ0U'
          },
          {
            name: 'Mini 1000 Special Deluxe with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSR1YtYnhObjROS3M'
          },
          {
            name: 'Mini Clubman Saloon/Estate with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSMW9GY0hSekxMQmM'
          },
          {
            name: 'Mini 1275 GT with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSLTZtN3RScHk3STQ'
          }
        ],
        earlyRover: [
          {
            name: 'Mini 850 Saloon/Van/Pickup',
            from: '1976',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSbzUyZ2RtRVM1aUk'
          },
          {
            name: 'Mini 1000 - Mini Special',
            from: '1976',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSMEwtcVNzN3A4cnc'
          },
          {
            name: 'Mini Clubman/Estate/1275GT',
            from: '1976',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSUUFqU29kbDk1djg'
          },
          {
            name: 'Mini Special',
            from: '1977',
            to: '1978',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSdjc0aVR2ZE9uN3c'
          },
          {
            name: 'Mini Single Instrument Pack',
            from: '1984',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQScEp5eXBiaFRlNm8'
          },
          {
            name: 'Mini Multi-Instrument Pack',
            from: '1984',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSUjN5bW43RXZuTEk'
          },
          {
            name: 'Mini',
            from: '1988',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSZjlWQzYxTnZrMlE'
          },
          {
            name: 'Twin Gauge Instrument Pack With Integral Voltage Stabilizer',
            from: '',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSelFYYnQ2bEVDaFU'
          },
          {
            name: 'Triple Gauge Instrument Pack With Intergral Voltage Stabilizer',
            from: '',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSQk11anBCVVY2bHc'
          },
          {
            name: 'Mini Turbo Model',
            from: '',
            to: '1989',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSSGY3d3hPWnRZVmc'
          }
        ],
        laterRover: [
          {
            name: 'Power Distribution - Carburetter Models',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSMGtpM3k4QTBTOG8'
          },
          {
            name: 'Power Distribution - SPI Models',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSbmp0VnZpTXpvV2c'
          },
          {
            name: 'Exterior Lamps and Horn',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQScm51N2Nkc3lZWUE'
          },
          {
            name: 'Driving and Fog Lamps',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSV0xVdmdtZE9UTGM'
          },
          {
            name: 'Reverse Lamps/Brake Lamps/Heated Rear Window Circuit',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSX3dlcnFpY3pndUk'
          },
          {
            name: 'Direction Indicator and Hazard Warning',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSVGpzbGZCUDFLaXc'
          },
          {
            name: 'Instruments',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSaVAxakpkcWpnQ1U'
          },
          {
            name: 'Interior Lamp Circuit',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSNHA2bHhkLVVObVk'
          },
          {
            name: 'Heater & Automatic Gearbox Selector Illumination Circuitsheater & Automatic Gearbox Selector Illumination Circuits',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSVGdNNXVxZmlhZ0U'
          },
          {
            name: 'Engine Management',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSQ3BHUEUzUW9CeFU'
          },
          {
            name: 'Anti-Theft Alarm',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSOU10LW1CZHZGa2M'
          },
          {
            name: 'Wash Wipe Circuit',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSOW4wUG9lN1RQOXc'
          },
          {
            name: 'Auxiliary Cooling Fan and Brake Test Circuits',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSRVVCVnVZUko5NGM'
          },
          {
            name: 'Radio Cassette Player',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSMkRxMFg0T0h2eG8'
          },
          {
            name: 'Sunroof Circuit',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSUlhrc2xjT29Gb2M'
          },
          {
            name: 'Headlamp Levelling Circuit(Germany)',
            from: '1992',
            to: '1996',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSZElQLUpJVU1QRTA'
          }
        ],
        hornetElf: [
          {
            name: 'Hornet and Elf',
            from: '1961',
            to: '1964',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSVGRzanpHWG1aR2c'
          },
          {
            name: 'Hornet and Elf',
            from: '1964',
            to: '1967',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSVGFYcDZSd0sxaW8'
          },
          {
            name: 'Hornet and Elf',
            from: '1967',
            to: 'onwards',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSS3E2MmpHa2F0aUE'
          }
        ],
        ausMinis: [
          {
            name: 'Australian Standard Saloon/Van',
            from: '1969',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSZ1BZdi1aYXg3Q28'
          },
          {
            name: 'Australian BMC Moke with Alternator',
            from: '1969',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSVHZRYUNHb2FFTGs'
          },
          {
            name: 'Australian Mini and BMC Moke with Generator',
            from: '1969',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSSzEtMEhZY3RTa2M'
          },
          {
            name: 'Australian Mini 1000k/1100STD/Van/Mini Matic(1100)/Cooper S(Alternator)',
            from: '1969',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSQnpqeHBGeEhzMm8'
          },
          {
            name: 'Australian Mini Cooper S with Generator',
            from: '1969',
            to: '',
            link: 'https://drive.google.com/open?id=0Bw6fNSzkJtQSOW44empPZndCYlE'
          }
        ]
      }
    };
  }
};
</script>