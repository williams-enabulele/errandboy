import { Component,  OnInit, ViewChild, HostListener, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WatchService } from '../../_services/watch.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', './admin.component.less']
})
export class AdminLayoutComponent implements OnInit {


  admin_id: any;
  firstname: any;
  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  year: any = new Date().getFullYear();



  constructor(
    private el: ElementRef,
    private auth: AuthService,
   
  ) {
   
   }

  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
    const user = this.auth.decode();
    this.admin_id = user.data['id'];
    this.firstname = user.data['firstname'];
    //console.log(this.firstname);

  }

   logout() {
    
    this.auth.logout();
  }
}
