import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '../../user/common/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Output() controlClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeCountPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() loadListPage: EventEmitter<string | number> = new EventEmitter<string | number>();
  private controlsCount: number[];
  private perPage;
  private subscriptions: Subscription[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    const subs = this.userService.userListLoaded.subscribe(value =>  {
      if (value && this.userService.userList) {
        this.perPage = this.userService.userList.per_page;
        if (this.userService.userList.total % this.userService.userList.per_page ) {
          let result = (this.userService.userList.total / this.userService.userList.per_page).toFixed(0);
          this.controlsCount = new Array(+result + 1);
        } else {
          this.controlsCount = new Array(this.userService.userList.total / this.userService.userList.per_page);
        }
      }
    });
    this.subscriptions.push(subs);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
