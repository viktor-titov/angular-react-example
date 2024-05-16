import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';

import type { Root, createRoot } from "react-dom/client"
import type { createElement } from "react"
import type { CounterProps } from "../react-components/counter/counter"
import  { Counter } from "../react-components/counter/counter"

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  private root?: Root;
  private createElement?: typeof createElement;
  private createRoot?: typeof createRoot;
  protected loading: boolean = false;
  
  @ViewChild('boxForReact') containerRef?: ElementRef;

  

  async ngOnInit() {
    console.log('::ngOnInit');
  }
  
  async ngAfterViewInit() {
    console.log('::ngAfterViewInit');
    await this.load();
    this.loading = true;
    
    
    this.loading = false;

    this.initRoot();
    this.renderReactComponent();
  }

  ngOnChanges() {
    console.log('::ngOnChanges');
    this.renderReactComponent()
  }

  ngOnDestroy() {
    console.log('::ngOnDestroy');
    if (this.root) {
      this.root.unmount();
    }
  }

  public count: number = 0;
  public handleClick() {
    this.count++
    console.log('::handleClick:inAngularWRapper:this', this);
    this.renderReactComponent();
  }

  private async load(): Promise<void> {
    console.group('::load')
    const [react, reactDom] = await Promise.all([
      import('react').then(m => m.default),
      import('react-dom/client').then(m => m.default),
    ]);

    console.log('after await:react:', react);
    console.log('after await:reactDom:', reactDom);

    this.createElement = react.createElement;
    this.createRoot = reactDom.createRoot;

    console.groupEnd()
  }
  
  private async initRoot(): Promise<void> {
    if (this.root) {
      return;
    }

    if (!this.createRoot) {
      console.error('::initRoot:createRoot: ', this.createRoot)
    }

    if (!this.createElement) {
      console.error('::initRoot:createElement:', this.createElement);
    }

    if (!this.containerRef) {
      console.error('::initRoot:containerRef', this.containerRef);
      return
    }
    
    if (!this.root && this.createRoot) {
     this.root = this.createRoot(this.containerRef.nativeElement);
    }
  }
  
  private makeProps(): CounterProps {
    return {
      counter: this.count,
      onClick: this.handleClick.bind(this)
    }
  }

  private renderReactComponent() {
    if (this.root && this.createElement) {
      this.root.render(this.createElement(Counter, this.makeProps()))
    }
  }
}



