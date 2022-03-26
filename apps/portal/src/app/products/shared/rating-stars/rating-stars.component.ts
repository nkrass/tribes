import { Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent {
  @Input() public rating!: number;
  @Input() public size!: string;}
