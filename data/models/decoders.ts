/*
  Engine ID Info: https://www.minimania.com/Engine___Identification_Data_UPDATED
  Metro Engine ID Info: https://www.minimania.com/Engine___Metro_engine_identification_data
  Chassis Info: https://www.minimania.com/Mini_Chassis_VIN_and_Commission_Numbers__Part_I__Revised_
  Chassis Info 2: https://www.minimania.com/Mini_Chassis_VIN_and_Commission_Numbers__Part_II
*/

export interface ChasisRanges {
  '59-69': ChasisRange;
  '69-74': ChasisRange;
  '74-80': ChasisRange;
  '80': ChasisRange;
  '80-85': ChasisRange;
  '85-90': ChasisRange;
  '90-on': ChasisRange;
}
export interface ChasisRange {
  PrimaryExample: string;
  MutlipleExamples: { name: string; desc: string }[];
  first: { value: string; name: string }[];
  second: { value: string; name: string }[];
  third: { value: string; name: string }[];
  fourth: { value: string; name: string }[];
  number: string;
  fifth: { value: string; name: string }[];
  sixth?: { value: string; name: string }[];
  seventh?: { value: string; name: string }[];
  eighth?: { value: string; name: string }[];
  ninth?: { value: string; name: string }[];
  tenth?: { value: string; name: string }[];
  eleventh?: { value: string; name: string }[];
  last?: { value: string; name: string }[];
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

export const chasisRanges: ChasisRanges = {
  '59-69': {
    PrimaryExample: 'A-A2S7L-###A',
    MutlipleExamples: [
      {
        name: 'A-A2S7-123456 (or A-A2S7-123456A)',
        desc: 'A right-hand drive, Mk1, Austin Mini Saloon built at Longbridge',
      },
      {
        name: 'M-A2S6-1234567 (or M-A2S6-1234567M)',
        desc: 'A right-hand drive, Mk2, Morris Mini Saloon built at Cowley',
      },
      { name: 'C-A2S7L-123456', desc: 'A left-hand drive, Mk1, Austin Cooper or Cooper S' },
      { name: 'R-A2S2-123456', desc: 'A right-hand drive, Mk2, Riley Elf' },
      { name: 'A-AB1L-123456', desc: 'A left-hand drive, Austin Moke' },
      { name: 'M-AU4-123456', desc: 'A right-hand drive, Mk1 Morris Pickup' },
    ],
    // Manufacturer
    first: [
      { value: 'A', name: ' Austin (other than Cooper and S)' },
      { value: 'C', name: ' Austin Cooper or Austin Cooper S' },
      { value: 'K', name: ' Morris Cooper or Cooper S' },
      { value: 'M', name: 'Morris' },
      { value: 'R', name: ' Riley' },
      { value: 'W', name: ' Wolseley' },
    ],
    second: [{ value: 'A', name: 'All Engine Types' }],
    // Body Type
    third: [
      {
        value: '2S',
        name: '2-door saloon/sedan. Caution: bureaucratic bungles often interpret this as 25 (twenty-five)',
      },
      { value: 'B', name: 'Moke (“Buckboard”!)' },
      { value: 'U', name: 'Pick-up. Caution: "U" and "V" can be mistaken one for the other' },
      { value: 'V', name: 'Panel van. Caution: "U" and "V" can be mistaken one for the other' },
      { value: 'W', name: 'Estate (with or without wood). Officially, “Dual-purpose”' },
    ],
    // Series of Austin, or Morris
    fourth: [
      { value: '1', name: 'Mk1 Riley Elf, Wolseley Hornet, and Austin/Morris Moke' },
      { value: '2', name: 'Mk2 Riley Elf or Wolseley Hornet' },
      { value: '3', name: 'Mk3 Riley Elf or Wolseley Hornet' },
      { value: '4', name: 'Mk1 Morris' },
      { value: '6', name: 'Mk2 Morris' },
      { value: '7', name: 'Mk1 Austin' },
      { value: 'B', name: 'Mk2 Austin' },
    ],
    // Trim
    fifth: [
      { value: 'D', name: 'De-Luxe' },
      { value: 'L', name: 'Left-hand drive. Right-hand drive was not designated' },
      { value: 'S', name: 'Super De-Luxe' },
    ],
    // Sequential Build Number
    number: '###',
    // Assembly Plant
    last: [
      { value: 'A', name: 'Longbridge' },
      { value: 'M', name: 'Cowley' },
    ],
  },
  '69-74': {
    PrimaryExample: 'X-A2S1N-###-A',
    MutlipleExamples: [],
    first: [{ value: 'X', name: 'This is simply dismissed by the factory as "non-significant"!' }],
    second: [{ value: 'A', name: 'All Engine Types' }],
    third: [
      {
        value: '2S',
        name: '2-door saloon/sedan (except Mk3 Cooper S and 1275GT). Caution: bureaucratic bungles often misinterpret this as 25 (twenty-five)',
      },
      { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
      { value: 'D', name: '2-door saloon (Mk3 Cooper S and 1275GT only)' },
      { value: 'U', name: 'Pick-up. Caution: "U" and "V" can be mistaken one for the other' },
      { value: 'V', name: 'Panel van. Caution: "U" and "V" can be mistaken one for the other' },
    ],
    fourth: [
      { value: '', name: 'Mini 850. Produced only in the “round nose” style' },
      {
        value: '1',
        name: 'Round nose, traditional Mini body style. Includes: Mini 1000, Mk3 Cooper S, Van, and Pick-up',
      },
      { value: '2', name: 'Clubman, square nose style. Includes: Clubman saloon, Clubman Estate, and 1275GT' },
    ],
    fifth: [{ value: 'N', name: 'Mini 1000' }],
    number: '###',
    last: [{ value: 'A', name: 'Longbridge' }],
  },
  '74-80': {
    PrimaryExample: 'X-K2S1N-###-A',
    MutlipleExamples: [],
    first: [{ value: 'X', name: 'This is simply dismissed by the factory as "non-significant"!' }],
    second: [
      {
        value: 'A',
        name: '[Unknown if this was used. If so, it indicated any of the A-series engines still in production at that time]',
      },
      { value: 'C', name: '1098cc' },
      { value: 'E', name: '1275cc' },
      { value: 'K', name: '848cc' },
      { value: 'L', name: '998cc' },
    ],
    third: [
      {
        value: '2D',
        name: 'The factory microfiche does not list a designator for the 1275GT. This would imply there wasn’t one; however, it is likely the 2D designator was still used. The microfiche shows 2D used for the 1980 model year. If no designator is listed, the Commission number must be used to identify the 1275GT.',
      },
      {
        value: '2S',
        name: '2-door saloon/sedan (except 1275GT). Caution: bureaucratic bungles often interpret this as 25 (twenty-five)',
      },
      { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
      { value: 'U', name: 'Pick-up. Caution: "U" and "V" can be mistaken one for the other' },
      { value: 'V', name: 'Panel van. Caution: "U" and "V" can be mistaken one for the other' },
    ],
    fourth: [
      {
        value: '1',
        name: 'Round nose, traditional Mini body style. Includes: Mini 850, Mini 850 City, Mini 850 Special Deluxe, Mini 1000, Van (848cc and 998cc), Mini Special 1098cc, and Pick-up (850cc and 998cc).',
      },
      {
        value: '2',
        name: 'Clubman, square nose style. Includes: Clubman Saloon (998cc Automatic and 1098cc Manual), Clubman Estate (998cc Automatic and 1098cc Manual), and 1275GT.',
      },
    ],
    fifth: [
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
    number: '###',
    last: [{ value: 'A', name: 'Longbridge' }],
  },
  '80': {
    PrimaryExample: 'X-K2S1N-###-A',
    MutlipleExamples: [],
    first: [{ value: 'X', name: 'This is simply dismissed by the factory as "non-significant"!' }],
    second: [
      { value: 'C', name: '1098cc' },
      { value: 'E', name: '1275cc' },
      { value: 'K', name: '848cc' },
      { value: 'L', name: '998cc' },
    ],
    third: [
      { value: '2D', name: '1275GT' },
      {
        value: '2S',
        name: '2-door saloon/sedan (except 1275GT). Caution: bureaucratic bungles often interpret this as 25 (twenty-five)',
      },
      { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
      { value: 'U', name: 'Pick-up. Caution: "U" and "V" can be mistaken one for the other.' },
      { value: 'V', name: 'Panel van. Caution: "U" and "V" can be mistaken one for the other.' },
    ],
    fourth: [
      { value: '1', name: 'Round nose, traditional Mini body style.' },
      { value: '2', name: 'Clubman, square nose style.' },
    ],
    fifth: [{ value: 'N', name: 'Special Deluxe' }],
    number: '###',
    last: [{ value: 'A', name: 'Longbridge' }],
  },
  '80-85': {
    PrimaryExample: 'SAX-X-K2S1N-###-A',
    MutlipleExamples: [],
    first: [{ value: 'SAX', name: 'MG - Rover' }],
    second: [],
    third: [],
    fourth: [],
    fifth: [
      { value: 'C', name: '1098cc' },
      { value: 'K', name: '848cc' },
      { value: 'L', name: '998cc' },
    ],
    sixth: [
      {
        value: '2S',
        name: ' 2-door saloon/sedan (except 1275GT). Caution: bureaucratic bungles often interpret this as 25 (twenty-five)',
      },
      { value: '2W', name: 'Estate (“2-door Dual Purpose”)' },
      { value: 'G', name: 'P.O. Mail Van' },
      { value: 'U', name: 'Pick-up. Caution: "U" and "V" can be mistaken one for the other.' },
      { value: 'V', name: 'Panel van. Caution: "U" and "V" can be mistaken one for the other.' },
    ],
    seventh: [
      { value: '1', name: 'Round nose, traditional Mini body style.' },
      { value: '2', name: 'Clubman, square nose style.' },
    ],
    eighth: [
      { value: 'N', name: 'HL, Special, HLE, or Mayfair' },
      { value: 'R', name: 'Mini 25' },
      { value: 'S', name: 'Mayfair (left-hand drive - France only)' },
    ],
    number: '###',
    last: [{ value: 'A', name: 'Longbridge' }],
  },
  '85-90': {
    PrimaryExample: 'SAX-X-L2S1N20-###-A',
    MutlipleExamples: [],
    first: [{ value: 'SAX', name: 'MG - Rover' }],
    second: [],
    third: [],
    fourth: [],
    fifth: [{ value: 'L', name: '998cc' }],
    sixth: [
      {
        value: '2S',
        name: '2-door saloon/sedan. Caution: bureaucratic bungles often interpret this as 25 (twenty-five)',
      },
    ],
    seventh: [],
    eighth: [{ value: '1', name: 'Round nose, traditional Mini body style.' }],
    ninth: [
      { value: 'N', name: 'HLE, or Mayfair (right-hand drive)' },
      { value: 'O', name: 'E, City E' },
      { value: 'S', name: 'Mayfair (left-hand drive)' },
    ],
    tenth: [
      {
        value: '2',
        name: '1984-on (This conflicts with the microfiche indicating this position was used starting in November 1985)',
      },
    ],
    eleventh: [
      { value: '0', name: 'Right-hand drive (RHD)' },
      { value: '1', name: 'Left-hand drive (LHD)' },
    ],
    number: '###',
    last: [{ value: 'A', name: 'Longbridge' }],
  },
  '90-on': {
    PrimaryExample: 'SAX-XN-N-A-Y-B-B-D-######',
    MutlipleExamples: [],
    first: [{ value: 'SAX', name: 'MG - Rover' }],
    second: [],
    third: [],
    fourth: [{ value: 'XN', name: 'Mini 1300' }],
    fifth: [],
    sixth: [
      { value: 'N', name: 'Sport, Cooper, Cabriolet' },
      { value: 'V', name: 'Kensington' },
      { value: 'W', name: 'HLS, Mayfair' },
      { value: 'Y', name: 'City, Sprite' },
    ],
    seventh: [
      { value: 'A', name: '2-door saloon/sedan' },
      { value: 'B', name: 'Cabriolet' },
    ],
    eighth: [
      { value: 'D', name: '1300 Carb' },
      { value: 'M', name: '1300 Carb' },
      { value: 'X', name: '1300 SPi (standard compression ratio, 9.4:1)' },
      { value: 'Y', name: '1300 SPi (high compression ratio, 10.1:1)' },
      { value: 'Z', name: '1300 MPi (high compression ratio, 10.1:1)' },
    ],
    ninth: [
      { value: 'B', name: 'RHD, Manual, 3.105' },
      { value: 'C', name: 'RHD, Manual, 3.21' },
      { value: 'E', name: 'RHD, Manual, 2.76' },
      { value: 'K', name: 'RHD, Automatic' },
      { value: 'M', name: 'LHD, Manual, 3.105' },
      { value: 'N', name: 'LHD, Manual, 3.21' },
      { value: 'R', name: 'LHD, Manual, 2.76' },
      { value: 'Y', name: 'LHD, Automatic' },
    ],
    tenth: [
      { value: 'A', name: '1300 Special Edition' },
      { value: 'B', name: '1300' },
    ],
    eleventh: [{ value: 'A', name: 'Longbridge' }],
    number: '###',
  },
};
