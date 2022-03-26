import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
