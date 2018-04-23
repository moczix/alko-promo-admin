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

  pages = [
    {title: 'Alkohole', icon: 'folder', route: '.'},
    {title: 'Kategorie', icon: 'folder', route: '.'},
    {title: 'Tagi', icon: 'folder', route: '.'},
    {title: 'Użytkownicy', icon: 'folder', route: '.'},
    {title: 'Skargi', icon: 'folder', route: '.'}
    ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    if(this.mobileQuery.matches === false) {
      this.menuOpened = true;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
