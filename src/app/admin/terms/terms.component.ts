import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../_services/admin.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {



  submittedData: string;
  showEditValues = false;
  displayError: any = false;

  title: string;
  content: string;
  id: any;


  p: number = 1;

  // Returned arrays from server
  terms: any = [];
  edittermsById: any = [];
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
  open(editterms) {
    this.modalService.open(editterms);
  }


  ngOnInit(): void {


    //fetch terms parameters and values
    this.adminService.get_terms().subscribe(
      res => {
        //console.log(res);
        this.terms = res['records'];

      }
    );
  }



  reloadtermss() {
    this.adminService.get_terms().subscribe(
      res => {
        //console.log(res);
        this.terms = res['records'];
      });
  }

  deleteterms(id: any) {
    //console.log(id);
    this.adminService.delete_terms(id).subscribe(
      res => {
        //console.log(res);
        this.reloadtermss();
        this.alertService.success('Selected terms successfully deleted!');

      }
    );
  }
  updateterms(form: NgForm) {
    //console.log(form.value);
    this.adminService.update_terms(form.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('terms successfully updated!');
        this.reloadtermss();
      }
    );
    ////.log(form.value);
  }

  gettermsById(id: any) {

    this.editId = id;
    this.adminService.get_terms_one(id).subscribe(

      res => {
        //this.loading = false;
        this.showEditValues = true;
        //.log(res);
        this.edittermsById = res['records'][0];
      }
    );

  }

  addterms(g: NgForm) {
    //.log(g.value);
    this.adminService.create_terms(g.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('terms successfully added!');
        this.reloadtermss();

      }
    );
  }
}
