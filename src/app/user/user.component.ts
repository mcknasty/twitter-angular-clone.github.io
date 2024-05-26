import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UserRecord } from '../model/User';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  protected user: UserRecord = new UserRecord();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationSubscription: any;
  now: number = Date.now();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.ngOnInit();
    this.navigationSubscription = this.router.events.subscribe((e: unknown) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.now = Date.now();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // if (id && typeof id === 'string' && id.length < 32) {
      this.userService.getUser(id).subscribe((user) => {
        //Todo: need to move this next line down to the service
        const User = user as UserRecord;
        if (UserRecord.instanceOf(User)) {
          this.user = User;
        } else if (typeof user === 'string') {
          throw User;
        }
      });
    }
  }
}
