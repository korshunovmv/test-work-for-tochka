import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],

  declarations: [
    TabComponent,
    TabsComponent,
  ],
  exports: [
    TabComponent,
    TabsComponent,
  ],
})
export class UiModule { }
