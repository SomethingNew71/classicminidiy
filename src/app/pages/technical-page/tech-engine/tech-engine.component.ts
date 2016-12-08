import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-engine',
  templateUrl: './tech-engine.component.html',
  styleUrls: ['./tech-engine.component.scss']
})
export class TechEngineComponent implements OnInit {
  title = 'Engine';
  engines = {
    engine850a: {
      displacement: 850,
      powerHp: 34,
      powerKw: 25,
      torqueLbft: 44,
      torqueNm: 60,
      prodYears: '1959 - 1980'
    },
    engine998a: {
      displacement: 998,
      powerHp: 41,
      powerKw: 31,
      torqueLbft: 52,
      torqueNm: 71,
      prodYears: '1959 - 1980'
    },
    engine1071a: {
      displacement: 1071,
      powerHp: 70,
      powerKw: 52,
      torqueLbft: 62,
      torqueNm: 84,
      prodYears: '1963 - 1964'
    },
    engine1098a: {
      displacement: 1098,
      powerHp: 45,
      powerKw: 34,
      torqueLbft: 56,
      torqueNm: 76,
      prodYears: '1969 - 1980'
    },
    engine1275a: {
      displacement: 1275,
      powerHp: 76,
      powerKw: 57,
      torqueLbft: 79,
      torqueNm: 107,
      prodYears: '1964 - 1980'
    },
    engine998plus: {
      displacement: 1275,
      powerHp: 44,
      powerKw: 33,
      torqueLbft: 52,
      torqueNm: 71,
      prodYears: '1980 - 1992'
    },
    engine1275plus: {
      displacement: 1275,
      powerHp: 78,
      powerKw: 58,
      torqueLbft: 78,
      torqueNm: 106,
      prodYears: '1980 - 1996'
    },
    engine1275MPIplus: {
      displacement: 1275,
      powerHp: 63,
      powerKw: 47,
      torqueLbft: 70,
      torqueNm: 95,
      prodYears: '1997 - 2000'
    },
  };
  constructor() { }

  ngOnInit() {
  }

}
