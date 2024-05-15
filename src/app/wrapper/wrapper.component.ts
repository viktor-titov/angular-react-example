import { Component } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {
  // @ViewChild(containerElementRef, { static: true }) containerRef!: ElementRef;

  // @Input() public counter = 10;
  // @Output() public componentClick = new EventEmitter<void>();

  // private root = createRoot(inject(ElementRef).nativeElement)
  
  // ngOnChanges() {
  //   this.root.render(createElement(CustomReactButton))
  // }

  // ngOnDestroy() {
  //   this.root.unmount();
  // }
}



