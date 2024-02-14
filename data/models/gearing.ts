export const options = {
  tires: [
    {
      label: '145/80r10',
      value: {
        width: 145,
        profile: 80,
        size: 10,
      },
    },
    {
      label: '165/70r10',
      value: {
        width: 165,
        profile: 70,
        size: 10,
      },
    },

    {
      label: '145/70r12',
      value: {
        width: 145,
        profile: 70,
        size: 12,
      },
    },
    {
      label: '145/80r12',
      value: {
        width: 145,
        profile: 80,
        size: 12,
      },
    },
    {
      label: '155/70r12',
      value: {
        width: 155,
        profile: 70,
        size: 12,
      },
    },
    {
      label: '155/80r12',
      value: {
        width: 155,
        profile: 80,
        size: 12,
      },
    },
    {
      label: '160/65r12',
      value: {
        width: 155,
        profile: 80,
        size: 12,
      },
    },
    {
      label: '165/55r12',
      value: {
        width: 165,
        profile: 55,
        size: 12,
      },
    },
    {
      label: '165/60r12',
      value: {
        width: 165,
        profile: 60,
        size: 12,
      },
    },
    {
      label: '150/65r13',
      value: {
        width: 150,
        profile: 65,
        size: 13,
      },
    },
    {
      label: '160/65r13',
      value: {
        width: 160,
        profile: 65,
        size: 13,
      },
    },
    {
      label: '175/50r13',
      value: {
        width: 175,
        profile: 50,
        size: 13,
      },
    },
    {
      label: '185/55r13',
      value: {
        width: 185,
        profile: 55,
        size: 13,
      },
    },
    {
      label: '185/70r13',
      value: {
        width: 185,
        profile: 70,
        size: 13,
      },
    },
    {
      label: '195/45r13',
      value: {
        width: 195,
        profile: 45,
        size: 13,
      },
    },
    {
      label: '195/50r13',
      value: {
        width: 195,
        profile: 50,
        size: 13,
      },
    },
  ],
  diffs: [
    { value: 2.76, label: '2.760:1 21/58 ' },
    { value: 2.95, label: "2.950:1 20/59 ( Metro 1.3 HLE '85 on )" },
    {
      value: 3.105,
      label: "3.105:1 19/59 ( Metro 1.0 HLE and Some 1.3 HLE's )",
    },
    { value: 3.211, label: '3.211:1 19/61 ( MG Metro Turbo )' },
    {
      value: 3.444,
      label: "3.444:1 18/62 ( Most Mini's and post '84 Metro's )",
    },
    {
      value: 3.647,
      label: '3.647:1 17/62 ( Metro City, L and Van ) ',
    },
    {
      value: 3.765,
      label: "3.765:1 17/64 ( MKI Mini, 850's and Vans) ",
    },
    {
      value: 3.939,
      label: '3.939:1 16/63 ( Option on Cooper "S" MKI/II/III )',
    },
    { value: 4.133, label: '4.133:1 15/62' },
    { value: 4.267, label: '4.267:1 15/64' },
    { value: 4.35, label: '4.350:1 15/65' },
    { value: 3.667, label: '3.667:1 15/55 ( Straight Cut )' },
    { value: 3.875, label: '3.875:1 16/62 ( Special )' },
    { value: 4.35, label: '4.307:1 13/56 ( Special )' },
    { value: 4.571, label: '4.571:1 14/64 ( Special )' },
  ],
  speedosRatios: [
    { value: 0.2777, label: '5/18 - 12" Mini / 3.2 diff' },
    { value: 0.2941, label: '5/17 - Metro 1275 / 3.44 diff' },
    { value: 0.375, label: '6/16' },
    { value: 0.3529, label: '6/17 - 10" Mini / 3.44 diff' },
    { value: 0.4667, label: '7/15' },
    { value: 0.4375, label: '7/16 - 12" Mini / 3.105 diff' },
    { value: 0.4117, label: '7/17 - 10" Mini / 2.95 diff' },
    { value: 0.3888, label: '7/18' },
  ],
  dropGears: [
    {
      value: 1,
      label: 'Standard 1:1 (29 tooth)',
    },
    {
      value: 0.967,
      label: 'Overdrive 0.9670:1 (30 tooth)',
    },
    {
      value: 0.9655,
      label: '0.9666:1 (30/29)',
    },
    {
      value: 0.9655,
      label: '0.9655:1 (29/28)',
    },
    {
      value: 0.9333,
      label: '0.9333:1 (30/28)',
    },
    { value: 0.958, label: '0.9580:1 (24/23)' },
    { value: 1.0416, label: '1.0416:1 (24/25)' },
    { value: 1.0435, label: '1.0435:1 (23/24)' },
    { value: 1.045, label: '1.0450:1 (22/23)' },
    { value: 1.0869, label: '1.0869:1 (23/25)' },
    { value: 1.09, label: '1.0900:1 (22/24)' },
    { value: 1.1364, label: '1.1364:1 (22/25)' },
  ],
  gearRatios: [
    {
      value: [3.627, 2.172, 1.412, 1.0],
      label: "MKI Mini Pre '64 (Magic Wand)",
    },
    {
      value: [3.52, 2.21, 1.43, 1.001],
      label: "MKI/II Mini Post '64 (Magic Wand)",
    },
    {
      value: [3.2, 1.916, 1.357, 1.0],
      label: "MkI/II Cooper & MkI/II/III Cooper 'S'",
    },
    {
      value: [2.573, 1.722, 1.255, 1.0],
      label: "MkI/II/III Cooper 'S' (Close Ratio / Straight Cut)",
    },
    {
      value: [3.33, 2.094, 1.353, 1.0],
      label: "MkIII Cooper 'S' & 1275 GT (Close Ratio)",
    },
    {
      value: [3.52, 2.21, 1.43, 1.0],
      label: "MKIII/IV Mini & Metro (pre A+ <'84)",
    },
    {
      value: [3.647, 2.185, 1.425, 1.0],
      label: "MKV/VI/VII Mini, ERA Turbo & Metro (A+ >'84)",
    },
    { value: [4.004, 2.307, 1.435, 1.0], label: 'Metro 1.0 HLE' },
    {
      value: [2.583, 1.644, 1.25, 1.0],
      label: 'Minispares Evolution Helical Heavy Duty Kit - C-STN48',
    },
    {
      value: [2.583, 1.711, 1.25, 1.0],
      label: 'Minispares (Clubman ratios CR/SC) C-STN39 or TRAN-X (Clubman ratios CR/SC)',
    },
    {
      value: [2.544, 1.731, 1.258, 1.0],
      label: 'Minispares (Abingdon ST ratios CR/SC) C-STN77 or GRBMS4014 or TRAN-X (Abingdon ST ratios CR/SC)',
    },
    {
      value: [2.313, 1.567, 1.187, 1.0],
      label: 'Minispares (Metro Challenge CR/SC)',
    },
    {
      value: [2.173, 1.493, 1.197, 1.0],
      label: 'KAD 4 speed Dog Kit (2.173:1 1st)',
    },
    {
      value: [2.239, 1.568, 1.244, 1.0],
      label: 'MED 4 speed Dog Kit (2.239:1 1st)',
    },
    {
      value: [2.309, 1.56, 1.197, 1.0],
      label: 'Quaife 4 speed Dog Kit (2.3:1 1st)',
    },
    {
      value: [2.093, 1.493, 1.197, 1.0],
      label: 'Quaife 4 speed Dog Kit (2.1:1 1st)',
    },
    {
      value: [1.692, 1.441, 1.197, 1.0],
      label: 'Quaife/Swiftune 4 speed Dog Kit (US Spec 1.692:1 1st)',
    },
  ],
  speedos: [
    { tpm: 1440, tpk: 894, kph: 160, mph: 100, name: 'Smiths - Generic' },
    { tpm: 1408, tpk: 874, kph: 177, mph: 110, name: "Smiths central ('60s Cooper)" },
    { tpm: 1376, tpk: 855, kph: 144, mph: 90, name: 'Smiths central (850)' },
    { tpm: 1312, tpk: 815, kph: 144, mph: 90, name: "Smiths Early tri'clock" },
    { tpm: 1300, tpk: 807, kph: 177, mph: 110, name: 'Late Cooper Nippon Seiki' },
    { tpm: 1280, tpk: 795, kph: 193, mph: 120, name: 'Cooper S Smiths central' },
    { tpm: 1280, tpk: 795, kph: 144, mph: 90, name: "Smiths central Pre '84" },
    { tpm: 1248, tpk: 775, kph: 144, mph: 90, name: 'Smiths central' },
    { tpm: 1248, tpk: 775, kph: 160, mph: 100, name: 'Smiths (Austin 1300GT)' },
    {
      tpm: 1248,
      tpk: 775,
      kph: 193,
      mph: 120,
      name: 'Smiths (1275 GT/25/1100 Special)',
    },
    { tpm: 1242, tpk: 771, kph: 144, mph: 90, name: 'Nippon Seike' },
    { tpm: 1216, tpk: 755, kph: 144, mph: 90, name: "Smiths post '84" },
    {
      tpm: 1000,
      tpk: 621,
      kph: 177,
      mph: 110,
      name: "All Metro's and Most modern aftermarket",
    },
  ],
  rpmTicks: {
    6000: '6000',
    6500: '6500',
    7000: '7000',
    7500: '7500',
    8000: '8000',
    8500: '8500',
    9000: '9000',
  },
};

export const tableHeaders = {
  tableHeadersGearing: [
    {
      key: 'gear',
      title: 'Gear',
      sortable: false,
    },
    {
      key: 'ratio',
      title: 'Ratio',
      sortable: false,
    },
    {
      key: 'maxSpeed',
      title: 'Max Speed (mph)',
      sortable: false,
      align: 'center',
    },
  ],
  tableHeadersSpeedos: [
    {
      key: 'mph',
      title: 'MPH',
      sortable: false,
    },
    {
      key: 'kph',
      title: 'KPH',
      sortable: false,
    },
    {
      key: 'speedometer',
      title: 'Speedometer',
      sortable: false,
    },
    {
      key: 'tpm',
      title: 'TPM',
      sortable: false,
    },
    {
      key: 'tpk',
      title: 'TPK',
      sortable: false,
    },
    {
      key: 'result',
      title: 'Result',
      sortable: false,
      align: 'center',
    },
  ],
};

export const chartOptions = {
  chart: { zoomType: 'x' },
  title: { text: 'Speed and RPM' },
  exporting: {
    buttons: {
      contextButton: {
        symbol: 'download',
      },
    },
  },
  // subtitle: {
  //   text: 'Source: <a target="_blank" href="http://www.mintylamb.co.uk/suneedle/">http://www.mintylamb.co.uk/suneedle/</a>',
  // },
  // This is the data decleration
  series: [],
  plotOptions: {
    series: {
      // label: {
      //   connectorAllowed: false,
      // },
      pointStart: 1000,
      pointInterval: 500,
    },
  },
  yAxis: {
    title: { text: 'Speed' },
    labels: {
      enabled: true,
    },
  },
  xAxis: {
    title: { text: 'RPM' },
    labels: {
      enabled: true,
      step: 0.5,
    },
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  tooltip: { headerFormat: 'Speed:<br>', shared: true },
  responsive: {
    rules: [
      {
        condition: { maxWidth: 500 },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
};
