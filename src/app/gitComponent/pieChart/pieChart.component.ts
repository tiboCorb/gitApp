import {Component, Input} from '@angular/core';
import {Stats} from '../stats/stats.component';

@Component({selector: 'app-pieChart',
            templateUrl: './pieChart.component.html',
            styleUrls: ['./pieChart.component.css']})

/**
 * PieChart classe use an external libary
 * it implment a piechart as we need it in
 * the current app
 * @input user is the array of label
 * @input value is the array of value
 * note that each square that share the same index are related
 */
export class PieChart {
  @Input()user : Array < string >;
  @Input()value : Array < number >;
  public color : Array < any >;

  constructor() {

    this.color = [
      {
        backgroundColor: [
          '#ef5350',
          '#ab47bc',
          '#ec407a',
          '#7e57c2',
          '#26c6da',
          '#5c6bc0',
          '#26a69a',
          '#29b6f6',
          '#66bb6a',
          '#d4e157',
          '#ffee58'
        ]
      }
    ];
  }

}