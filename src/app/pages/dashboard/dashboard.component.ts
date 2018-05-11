import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
  }

  ngOnInit() {
    this.mobileQueryInit();

    this.authService.expiredOut()
      .subscribe(() => {
        console.log('trzeba zreautoryzowac');
      });

  }

  mobileQueryInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    if (this.mobileQuery.matches === false) {
      this.menuOpened = true;
    }
  }

  signOut() {
    this.authService.signOut()
      .subscribe(() => this.router.navigate(['../login']));
  }

  toggleMenu() {
    console.log('toggle');
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
