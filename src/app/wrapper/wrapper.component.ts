import { AfterViewInit, Component, ElementRef, Host, inject, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Counter } from "../react-components/counter/counter"


@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  private root?: Root;
  
  @ViewChild('boxForReact', { static: true }) containerRef?: ElementRef;
  
  ngOnInit(): void {
    console.log('::ngOnInit');
    this.initRoot()
  }

  ngAfterViewInit() {
    console.log('::ngAfterViewInit');
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

  private initRoot() {
    if (this.root) {
      return;
    }

    if (!this.containerRef) {
      return
    }

    if (!this.root) {
     this.root = createRoot(this.containerRef.nativeElement);
    }
  }
  
  private renderReactComponent() {
    if (this.root) {
      this.root.render(createElement(Counter))
    }
  }
}



