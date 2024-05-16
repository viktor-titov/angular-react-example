import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [WrapperComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

}
