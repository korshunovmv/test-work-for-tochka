import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input()
  tabs: Array<any>;

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
  
  constructor() {}

  ngOnInit() {
  }
}
