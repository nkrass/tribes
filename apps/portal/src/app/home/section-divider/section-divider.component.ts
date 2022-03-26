import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-section-divider',
  templateUrl: './section-divider.component.html',
  styleUrls: ['./section-divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionDividerComponent {
  public staticAssetsUrl: string = staticAssetsUrl
  @Input() public section!: string;
  @Input() public h: string = "h4"
}
