import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/data.service';

import { Item, selectItems } from '../models/item.model';

@Component({
  selector: 'first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  items: Item[];
  mapSelectedItems: any;

  constructor(private dataService: DataService) {
    this.dataService.getItems().subscribe((items: Item[]) => {
      this.items = items;
      this.mapSelectedItems = {};
      this.dataService.getSelectedItems().subscribe((selectedItems: selectItems[]) => {
        for (let i = 0; i < selectedItems.length; ++i) {
          this.mapSelectedItems[selectedItems[i].id] = true;
        }
      });
    });
  }
  ngOnInit() {
  }
  onClick(event: any) {
    event.stopPropagation();
  }
  selectItem(item: any) {
    const oldValue = this.mapSelectedItems[item.id];
    this.mapSelectedItems[item.id] = !oldValue;
    if (this.mapSelectedItems[item.id]) {
      this.dataService.selectItem(<number>item.id).subscribe(() => {
      }, () => {
        this.mapSelectedItems[item.id] = oldValue;
      });
    } else {
      this.dataService.unselectItem(<number>item.id).subscribe(() => {
      }, () => {
        this.mapSelectedItems[item.id] = oldValue;
      });
    }
  }
}
