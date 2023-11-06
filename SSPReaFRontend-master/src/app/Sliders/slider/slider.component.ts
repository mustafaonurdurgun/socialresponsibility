
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input() imagePath: any;
  @Input() title: any;
  @Input() text: any;
}
