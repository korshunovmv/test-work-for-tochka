import { NgModule }             from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';

import { FirstPageComponent }    from './first-page/first-page.component';
import { SecondPageComponent }    from './second-page/second-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/first-page', pathMatch: 'full' },
  { path: 'first-page', component: FirstPageComponent },
  { path: 'second-page', component: SecondPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  baseTitle = 'My page';
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const title = event.url.slice(1);
          switch (title) {
            case 'first-page':
              this.title.setTitle(`${this.baseTitle} | First page`);
              break;
            case 'second-page':
              this.title.setTitle(`${this.baseTitle} | Second page`);
              break;
          }
        }
    });
  }
}
