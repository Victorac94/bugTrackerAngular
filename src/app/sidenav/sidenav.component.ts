import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() isLoggedIn: boolean;
  @Input() userInfo: any;
  @Output() logoutEvent: EventEmitter<any>;

  constructor() {
    this.logoutEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  logout() {
    this.logoutEvent.emit();
  }

}
