import { Component,  OnInit, ViewChild, HostListener, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WatchService } from '../_services/watch.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  customer_id: any;
  firstname: any;
  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  
  public modalRef: BsModalRef;
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;





  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private idle: Idle, 
    private keepalive: Keepalive,
    private router: Router, 
    private modalService: BsModalService, 
    private watch: WatchService,
  ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(3360);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(3360);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      //console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.logout()
      this.hideChildModal();
      //console.log(this.idleState);
      //this.router.navigate(['/']);
    });
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        //console.log(this.idleState);
        this.childModal.show();
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
   }

  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
    const user = this.auth.decode();
    this.customer_id = user.data['id'];
    this.firstname = user.data['firstname'];
    //console.log(this.firstname);

  }


 

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

 

   logout() {
    
    this.auth.logout();
  }
}
