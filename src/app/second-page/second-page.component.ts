import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/data.service';

import { Item, selectItems } from '../models/item.model';

@Component({
  selector: 'second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {
  items: Item[];
  mapItems: any;
  selectedItem: Item;

  constructor(private dataService: DataService) {
    this.dataService.getItems().subscribe((items: Item[]) => {
      this.mapItems = {};
      for (let i = 0; i < items.length; ++i) {
        this.mapItems[items[i].id] = items[i];
      }
      this.dataService.getSelectedItems().subscribe((selectedItems: selectItems[]) => {
        const tmpItems = [];
        for (let i = 0; i < selectedItems.length; ++i) {
          tmpItems.push(this.mapItems[selectedItems[i].id]);
        }
        this.items = tmpItems;
        if (this.items && this.items[0] && !this.selectedItem) {
          this.selectedItem = this.items[0];
        }
      });
    });
  }
  ngOnInit() {
  }
}
