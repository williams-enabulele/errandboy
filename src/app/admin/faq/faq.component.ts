import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../_services/admin.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {



  submittedData: string;
  showEditValues = false;
  displayError: any = false;

  question: string;
  answer: string;
  id: any;


  p: number = 1;

  // Returned arrays from server
  faqs: any = [];
  editFaqById: any = [];
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
  open(editFaq) {
    this.modalService.open(editFaq);
  }


  ngOnInit(): void {


    //fetch faq parameters and values
    this.adminService.get_faqs().subscribe(
      res => {
        //console.log(res);
        this.faqs = res['records'];

      }
    );
  }



  reloadFaqs() {
    this.adminService.get_faqs().subscribe(
      res => {
        //console.log(res);
        this.faqs = res['records'];
      });
  }

  deleteFaq(id: any) {
    //console.log(id);
    this.adminService.delete_faq(id).subscribe(
      res => {
        //console.log(res);
        this.reloadFaqs();
        this.alertService.success('Selected FAQ successfully deleted!');

      }
    );
  }
  updateFaq(form: NgForm) {
    //console.log(form.value);
    this.adminService.update_faq(form.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('faq successfully updated!');
        this.reloadFaqs();
      }
    );
    //console.log(form.value);
  }

  getFaqById(id: any) {

    this.editId = id;
    this.adminService.get_faq_one(id).subscribe(

      res => {
        //this.loading = false;
        this.showEditValues = true;
        //console.log(res);
        this.editFaqById = res['records'][0];
      }
    );

  }

  addFaq(g: NgForm) {
    //console.log(g.value);
    this.adminService.create_faq(g.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('FAQ successfully added!');
        this.reloadFaqs();

      }
    );
  }

}
