import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * Panel component
 */
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  animations: [trigger('toggle', [
    state('true', style({
      'height': '0',
      'opacity': '0',
      'visibility': 'hidden',
    })),
    state('false', style({
      'height': '*',
      'opacity': '1',
      'visibility': 'visible',
    })),
    transition('false => true', animate('500ms ease')),
    transition('true => false', animate('500ms ease')),
  ])]
})
export class PanelComponent implements OnInit, OnChanges {

  @Input() collapsable = true;
  @Input() collapsed = true;
  @Input() title: string;
  @Input() panelClass: string;
  @Input() titlebarClass: string;
  @Input() bodyClass: string;
  @Input() panelCollapseClass: string;
  @Input() collapsedIcon = 'fa fa-chevron-down';
  @Input() notCollapsedIcon = 'fa fa-chevron-up';
  @Input() preventCollapse = false;

  panelCollapsed: boolean;
  collapsing = false;

  constructor() {
  }

  ngOnInit(): void {

    if (this.collapsable && typeof this.collapsable !== 'boolean') {
      this.collapsable = String(this.collapsable) === 'true';
    }
    if (this.collapsed && typeof this.collapsed !== 'boolean') {
      this.collapsed = String(this.collapsed) === 'true';
    }

    if (this.collapsable) {
      this.panelCollapsed = this.collapsed;
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.collapsed) {
      if (this.collapsable) {
        this.panelCollapsed = this.collapsed;
      }
    }
  }

  isPanelCollapsed(): boolean {
    return this.panelCollapsed;
  }

  togglePanel(): void {
    if (!this.preventCollapse && this.collapsable) {
      this.panelCollapsed = !this.panelCollapsed;
    }
  }

}
