
import { Component, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'errandboy';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  token:any;
  timeout:number;

  public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(private idle: Idle, private keepalive: Keepalive, 
    private router: Router, private modalService: BsModalService, private appService: AuthService, private jwtHelper: JwtHelperService) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1500);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.appService.logout();
    });
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
        this.childModal.show();
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });



    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
      this.token = localStorage.getItem('token');
      this.timeout = this.jwtHelper.getTokenExpirationDate(this.token).valueOf() - new Date().valueOf();
      this.appService.expirationCounter(this.timeout);
      console.log(this.timeout);
     
      if (userLoggedIn) {
        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })

    // this.reset();
  }

  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    this.appService.setUserLoggedIn(false);
    this.appService.logout();
  }

}

 
  




