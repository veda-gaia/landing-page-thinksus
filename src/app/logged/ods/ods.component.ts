import { Component } from '@angular/core';

@Component({
  selector: 'app-ods',
  templateUrl: './ods.component.html',
  styleUrls: ['./ods.component.scss']
})
export class OdsComponent {
  seeMore = false
  first10 = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
    {number: 8},
    {number: 9},
    {number: 10}
  ]

  last7 = [
    {number: 11},
    {number: 12},
    {number: 13},
    {number: 14},
    {number: 15},
    {number: 16},
    {number: 17},
  ]

  toggleSeeMore() {
    this.seeMore = !this.seeMore
  }
}
