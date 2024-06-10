/*
  Engine ID Info: https://www.minimania.com/Engine___Identification_Data_UPDATED
  Metro Engine ID Info: https://www.minimania.com/Engine___Metro_engine_identification_data
  Chassis Info: https://www.minimania.com/Mini_Chassis_VIN_and_Commission_Numbers__Part_I__Revised_
  Chassis Info 2: https://www.minimania.com/Mini_Chassis_VIN_and_Commission_Numbers__Part_II
*/
export interface ChasisRange {
  title: string;
  value: {
    PrimaryExample: {
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '5': string;
      '6': string;
      '7': string;
      '8': string;
      '9': string;
      '10': string;
      '11': string;
      numbers: string;
      last: string;
    };
    options: {
      '1': { value: string; name: string }[];
      '2': { value: string; name: string }[];
      '3': { value: string; name: string }[];
      '4': { value: string; name: string }[];
      '5': { value: string; name: string }[];
      '6': { value: string; name: string }[];
      '7': { value: string; name: string }[];
      '8': { value: string; name: string }[];
      '9': { value: string; name: string }[];
      '10': { value: string; name: string }[];
      '11': { value: string; name: string }[];
    };
    number: string;
    last: { value: string; name: string }[];
  };
}

// export const options = {
//   start: ['85H', '99H', '10H', '12H', '12A'],
//   code: [
//     '285',
//     '286',
//     '353',
//     '354',
//     '355',
//     '356',
//     '357',
//     '358',
//     '379',
//     '380',
//     '381',
//     '383',
//     '387',
//     '388',
//     '389',
//     '390',
//     '397',
//     '398',
//     '472',
//     '505',
//     '506',
//     '613',
//     '614',
//     '618',
//     '632',
//     '669',
//     '680',
//     '681',
//     '683',
//     '684',
//     '685',
//     '691',
//     '692',
//     '693',
//     '702',
//     '703',
//     '704',
//     '706',
//     '708',
//     '709',
//     '710',
//     '711',
//     '791',
//     '792',
//     '793',
//     '829',
//     '831',
//     '834',
//     '897',
//     '907',
//     '929',
//     '951',
//     '960',
//     '962',
//     '963',
//     '977',
//     '978',
//     '997',
//     '998',
//     'A05',
//     'A06',
//     'A07',
//     'A08',
//     'A19',
//     'A47',
//     'A53',
//     'A64',
//     'A65',
//     'A66',
//     'A67',
//     'A68',
//     'A69',
//     'A70',
//     'A71',
//     'A75',
//     'A94',
//     'A97',
//     'A98',
//     'A99',
//     'B38',
//     'B39',
//     'B81',
//     'B82',
//     'B83',
//     'B84',
//     'B85',
//     'B87',
//     'B88',
//     'B89',
//     'B90',
//     'B91',
//     'B92',
//     'B93',
//     'B94',
//     'B95',
//     'B96',
//     'B97',
//     'B98',
//     'B99',
//     'C20',
//     'D27',
//     'D28',
//     'D29',
//     'D31',
//     'D32',
//     'D33',
//     'D34',
//     'D35',
//     'D76',
//     'D77',
//     'D80',
//     'D81',
//     'D82',
//     'D83',
//     'E20',
//     'E21',
//     'E22',
//     'E35',
//     'E38',
//     'E39',
//     'E67',
//     'E68',
//     'E69',
//     'E70',
//     'F15',
//     'F16',
//     'F32',
//     'G30',
//     'G31',
//     'G32',
//     'G33',
//     'G34',
//     'G39',
//   ],
//   suffix: ['A', 'AA', 'AG', 'AJ', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'P', 'V'],
//   serial: [],
// };

export const chasisRanges: ChasisRange[] = [
  {
    title: '1959-1969',
    value: {
      // A-A2S7L-###A
      PrimaryExample: {
        1: 'A-',
        2: 'A',
        3: '2S',
        4: '7',
        5: 'L-',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        numbers: '###',
        last: 'A',
      },
      options: {
        1: [
          { value: 'A', name: ' Austin (other than Cooper and S)' },
          { value: 'C', name: ' Austin Cooper or Austin Cooper S' },
          { value: 'K', name: ' Morris Cooper or Cooper S' },
          { value: 'M', name: 'Morris' },
          { value: 'R', name: ' Riley' },
          { value: 'W', name: ' Wolseley' },
        ],
        2: [{ value: 'A', name: 'All Engine Types' }],
        // Body Type
        3: [
          {
            value: '2S',
            name: '2-door Saloon. Bureaucratic bungles often interpret this as 25',
          },
          { value: 'B', name: 'Moke (“Buckboard”!)' },
          { value: 'U', name: 'Pick-up. "U" and "V" can be mistaken one for the other' },
          { value: 'V', name: 'Panel van. "U" and "V" can be mistaken one for the other' },
          { value: 'W', name: 'Estate (with or without wood). Officially, “Dual-purpose”' },
        ],
        // Series of Austin, or Morris
        4: [
          { value: '1', name: 'Mk1 Riley Elf, Wolseley Hornet, and Austin/Morris Moke' },
          { value: '2', name: 'Mk2 Riley Elf or Wolseley Hornet' },
          { value: '3', name: 'Mk3 Riley Elf or Wolseley Hornet' },
          { value: '4', name: 'Mk1 Morris' },
          { value: '6', name: 'Mk2 Morris' },
          { value: '7', name: 'Mk1 Austin' },
          { value: 'B', name: 'Mk2 Austin' },
        ],
        // Trim
        5: [
          { value: 'D', name: 'De-Luxe' },
          { value: 'L', name: 'Left-hand drive. Right-hand drive was not designated' },
          { value: 'S', name: 'Super De-Luxe' },
        ],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      },
      number: '###',
      // Assembly Plant
      last: [
        { value: 'A', name: 'Longbridge' },
        { value: 'M', name: 'Cowley' },
      ],
    },
    // Manufacturer
  },
  {
    title: '1969-1974',
    value: {
      // 'X-A2S1N-###-A'
      PrimaryExample: {
        1: 'X-',
        2: 'A',
        3: '2S',
        4: '1',
        5: 'N-',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        numbers: '###-',
        last: 'A',
      },
      options: {
        1: [{ value: 'X', name: 'This is simply dismissed by the factory as "non-significant"!' }],
        2: [{ value: 'A', name: 'All Engine Types' }],
        3: [
          {
            value: '2S',
            name: '2-door S aloon(except Mk3 Cooper S and 1275GT). Bureaucratic bungles often misinterpret this as 25',
          },
          { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
          { value: 'D', name: '2-door saloon (Mk3 Cooper S and 1275GT only)' },
          { value: 'U', name: 'Pick-up. "U" and "V" can be mistaken one for the other' },
          { value: 'V', name: 'Panel van. "U" and "V" can be mistaken one for the other' },
        ],
        4: [
          {
            value: '1',
            name: 'Round nose. Includes: Mini 1000, Mk3 Cooper S, Van, and Pick-up',
          },
          { value: '2', name: 'Clubman, square nose style. Clubman saloon, Clubman Estate, and 1275GT' },
        ],
        5: [{ value: 'N', name: 'Mini 1000' }],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      },
      number: '###',
      last: [{ value: 'A', name: 'Longbridge' }],
    },
  },
  {
    title: '1974-1980',
    value: {
      // 'X-K2S1N-###-A'
      PrimaryExample: {
        1: 'X-',
        2: 'K',
        3: '2S',
        4: '1',
        5: 'N-',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        numbers: '###-',
        last: 'A',
      },
      options: {
        1: [{ value: 'X', name: 'This is simply dismissed by the factory as "non-significant"!' }],
        2: [
          {
            value: 'A',
            name: '[Unknown if this was used. If so, it indicated any of the A-series engines still in production at that time]',
          },
          { value: 'C', name: '1098cc' },
          { value: 'E', name: '1275cc' },
          { value: 'K', name: '848cc' },
          { value: 'L', name: '998cc' },
        ],
        3: [
          {
            value: '2D',
            name: 'Unclear if this was used for chassis numbers in this generation',
          },
          {
            value: '2S',
            name: '2-door Saloon (except 1275GT). Bureaucratic bungles often interpret this as 25',
          },
          { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
          { value: 'U', name: 'Pick-up. "U" and "V" can be mistaken one for the other' },
          { value: 'V', name: 'Panel van. "U" and "V" can be mistaken one for the other' },
        ],
        4: [
          {
            value: '1',
            name: 'Round nose. Includes: Mini 850, Mini 850 City, Mini 850 Special Deluxe, Mini 1000, Van (848cc and 998cc), Mini Special 1098cc, and Pick-up (850cc and 998cc).',
          },
          {
            value: '2',
            name: 'Clubman, square nose style. Includes: Clubman Saloon (998cc Automatic and 1098cc Manual), Clubman Estate (998cc Automatic and 1098cc Manual), and 1275GT.',
          },
        ],
        5: [
          { value: 'A', name: '1970' },
          { value: 'B', name: '1971' },
          { value: 'C', name: '1972' },
          { value: 'D', name: '1973' },
          { value: 'E', name: '1974' },
          { value: 'F', name: '1975' },
          { value: 'G', name: '1976' },
          { value: 'H', name: '1977' },
          { value: 'J', name: '1978' },
          { value: 'L', name: '1979' },
        ],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      },
      number: '###',
      last: [{ value: 'A', name: 'Longbridge' }],
    },
  },
  {
    title: '1980',
    value: {
      // 'X-K2S1N-###-A'
      PrimaryExample: {
        1: 'X-',
        2: 'K',
        3: '2S',
        4: '1',
        5: 'N-',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        numbers: '###-',
        last: 'A',
      },
      options: {
        1: [{ value: 'X', name: 'This is simply dismissed by the factory as "non-significant"!' }],
        2: [
          { value: 'C', name: '1098cc' },
          { value: 'E', name: '1275cc' },
          { value: 'K', name: '848cc' },
          { value: 'L', name: '998cc' },
        ],
        3: [
          { value: '2D', name: '1275GT' },
          {
            value: '2S',
            name: '2-door Saloon (except 1275GT). Bureaucratic bungles often interpret this as 25',
          },
          { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
          { value: 'U', name: 'Pick-up. "U" and "V" can be mistaken one for the other.' },
          { value: 'V', name: 'Panel van. "U" and "V" can be mistaken one for the other.' },
        ],
        4: [
          { value: '1', name: 'Round nose, traditional Mini body style.' },
          { value: '2', name: 'Clubman, square nose style.' },
        ],
        5: [{ value: 'N', name: 'Special Deluxe' }],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      },
      number: '###',
      last: [{ value: 'A', name: 'Longbridge' }],
    },
  },
  {
    title: '1980-1985',
    value: {
      // 'SAX-X-K2S1N-###-A'
      PrimaryExample: {
        1: 'SAX-',
        2: '',
        3: '',
        4: '',
        5: 'K',
        6: '2S',
        7: '',
        8: '1',
        9: 'N-',
        10: '',
        11: '',
        numbers: '###-',
        last: 'A',
      },
      options: {
        1: [{ value: 'SAX', name: 'MG - Rover' }],
        2: [],
        3: [],
        4: [],
        5: [
          { value: 'C', name: '1098cc' },
          { value: 'K', name: '848cc' },
          { value: 'L', name: '998cc' },
        ],
        6: [
          {
            value: '2S',
            name: ' 2-door Saloon (except 1275GT). Bureaucratic bungles often interpret this as 25',
          },
          { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
          { value: 'G', name: 'P.O. Mail Van' },
          { value: 'U', name: 'Pick-up. "U" and "V" can be mistaken one for the other.' },
          { value: 'V', name: 'Panel van. "U" and "V" can be mistaken one for the other.' },
        ],
        7: [],
        8: [
          { value: '1', name: 'Round nose, traditional Mini body style.' },
          { value: '2', name: 'Clubman, square nose style.' },
        ],
        9: [
          { value: 'N', name: 'HL, Special, HLE, or Mayfair' },
          { value: 'R', name: 'Mini 25' },
          { value: 'S', name: 'Mayfair (left-hand drive - France only)' },
        ],
        10: [],
        11: [],
      },
      number: '###',
      last: [{ value: 'A', name: 'Longbridge' }],
    },
  },
  {
    title: '1985-1990',
    value: {
      //'SAX-X-L2S1N20-###-A'
      PrimaryExample: {
        1: 'SAX-',
        2: '',
        3: '',
        4: '',
        5: 'L',
        6: '2S',
        7: '',
        8: '1',
        9: 'N',
        10: '2',
        11: '0-',
        numbers: '###-',
        last: 'A',
      },
      options: {
        1: [{ value: 'SAX', name: 'MG - Rover' }],
        2: [],
        3: [],
        4: [],
        5: [{ value: 'L', name: '998cc' }],
        6: [
          {
            value: '2S',
            name: '2-door Saloon. Bureaucratic bungles often interpret this as 25',
          },
        ],
        7: [],
        8: [{ value: '1', name: 'Round nose, traditional Mini body style.' }],
        9: [
          { value: 'N', name: 'HLE, or Mayfair (right-hand drive)' },
          { value: 'O', name: 'E, City E' },
          { value: 'S', name: 'Mayfair (left-hand drive)' },
        ],
        10: [
          {
            value: '2',
            name: '1984-on',
          },
        ],
        11: [
          { value: '0', name: 'Right-hand drive (RHD)' },
          { value: '1', name: 'Left-hand drive (LHD)' },
        ],
      },
      number: '###',
      last: [{ value: 'A', name: 'Longbridge' }],
    },
  },
  {
    title: '1990-on',
    value: {
      //'SAX-XN-N-A-Y-B-B-D-######'
      PrimaryExample: {
        1: 'SAX-',
        2: '',
        3: '',
        4: 'XN-',
        5: '',
        6: 'N-',
        7: 'A-',
        8: 'Y-',
        9: 'B-',
        10: 'B-',
        11: 'D-',
        numbers: '###',
        last: '',
      },
      options: {
        1: [{ value: 'SAX', name: 'MG - Rover' }],
        2: [],
        3: [],
        4: [{ value: 'XN', name: 'Mini 1300' }],
        5: [],
        6: [
          { value: 'N', name: 'Sport, Cooper, Cabriolet' },
          { value: 'V', name: 'Kensington' },
          { value: 'W', name: 'HLS, Mayfair' },
          { value: 'Y', name: 'City, Sprite' },
        ],
        7: [
          { value: 'A', name: '2-door Saloon' },
          { value: 'B', name: 'Cabriolet' },
        ],
        8: [
          { value: 'D', name: '1300 Carb' },
          { value: 'M', name: '1300 Carb' },
          { value: 'X', name: '1300 SPi (standard compression ratio, 9.4:1)' },
          { value: 'Y', name: '1300 SPi (high compression ratio, 10.1:1)' },
          { value: 'Z', name: '1300 MPi (high compression ratio, 10.1:1)' },
        ],
        9: [
          { value: 'B', name: 'RHD, Manual, 3.105' },
          { value: 'C', name: 'RHD, Manual, 3.21' },
          { value: 'E', name: 'RHD, Manual, 2.76' },
          { value: 'K', name: 'RHD, Automatic' },
          { value: 'M', name: 'LHD, Manual, 3.105' },
          { value: 'N', name: 'LHD, Manual, 3.21' },
          { value: 'R', name: 'LHD, Manual, 2.76' },
          { value: 'Y', name: 'LHD, Automatic' },
        ],
        10: [
          { value: 'A', name: '1300 Special Edition' },
          { value: 'B', name: '1300' },
        ],
        11: [{ value: 'A', name: 'Longbridge' }],
      },
      number: '###',
      last: [],
    },
  },
];
