import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
//  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User = new User();
  navigationSubscription: any;
  now: number = Date.now();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id )
      this.userService.getUser(id)
        .subscribe(user => this.user = user);
  }

  // ngOnDestroy() {
  //   // avoid memory leaks here by cleaning up after ourselves. If we
  //   // don't then we will continue to run our initialiseInvites()
  //   // method on every navigationEnd event.
  //   if (this.navigationSubscription) {
  //     this.navigationSubscription.unsubscribe();
  //   }
  // }
}
