import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  menuOpened = false;

  private mobileQueryListener: () => void;

  toolBarTitle = 'Home';

  pages = [
    {title: 'Home', icon: 'home', route: '.'},
    {title: 'Alkohole', icon: 'collections', route: 'alcohols'},
    {title: 'Kategorie', icon: 'collections_bookmark', route: '.'},
    {title: 'Tagi', icon: 'label', route: '.'},
    {title: 'Użytkownicy', icon: 'people', route: '.'},
    {title: 'Skargi', icon: 'report_problem', route: '.'}
    ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    if (this.mobileQuery.matches === false) {
      this.menuOpened = true;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
