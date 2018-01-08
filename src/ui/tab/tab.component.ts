import { Component, OnInit, Input, Output, HostListener, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  index: number;

  @Input()
  @HostBinding('class.checked')
  checked: boolean;

  @Output()
  onSelect: EventEmitter<{}> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.onSelect.next();
  }

  constructor() {}

  ngOnInit() {
  }

}
