import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UserRecord } from '../model/User';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: UserRecord = new UserRecord();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationSubscription: any;
  now: number = Date.now();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: unknown) => {
      // If it is a NavigationEnd event re-initialize the component
      if (e instanceof NavigationEnd) {
        this.now = Date.now();
        this.getUser();
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.userService.getUser(id).subscribe((user) => (this.user = user));
  }
}
