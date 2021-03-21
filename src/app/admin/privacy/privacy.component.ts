import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../_services/admin.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {



  submittedData: string;
  showEditValues = false;
  displayError: any = false;

  title: string;
  content: string;
  id: any;


  p: number = 1;

  // Returned arrays from server
  privacys: any = [];
  editprivacyById: any = [];
  //loading = true;
  editId: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private alertService: AlertService,
    config: NgbModalConfig, private modalService: NgbModal

  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    config.size ='lg';
  }
  //open method for Modal
  open(editprivacy) {
    this.modalService.open(editprivacy);
  }


  ngOnInit(): void {


    //fetch privacy parameters and values
    this.adminService.get_privacy().subscribe(
      res => {
        //console.log(res);
        this.privacys = res['records'];

      }
    );
  }



  reloadprivacys() {
    this.adminService.get_privacy().subscribe(
      res => {
        //console.log(res);
        this.privacys = res['records'];
      });
  }

  deleteprivacy(id: any) {
    //console.log(id);
    this.adminService.delete_privacy(id).subscribe(
      res => {
        //console.log(res);
        this.reloadprivacys();
        this.alertService.success('Selected privacy successfully deleted!');

      }
    );
  }
  updateprivacy(form: NgForm) {
    //console.log(form.value);
    this.adminService.update_privacy(form.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('privacy successfully updated!');
        this.reloadprivacys();
      }
    );
    //console.log(form.value);
  }

  getprivacyById(id: any) {

    this.editId = id;
    this.adminService.get_privacy_one(id).subscribe(

      res => {
        //this.loading = false;
        this.showEditValues = true;
        //.log(res);
        this.editprivacyById = res['records'][0];
      }
    );

  }

  addprivacy(g: NgForm) {
    //.log(g.value);
    this.adminService.create_privacy(g.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('privacy successfully added!');
        this.reloadprivacys();

      }
    );
  }


}
