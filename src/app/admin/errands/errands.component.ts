import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrandsService } from '../../_services/errands.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-errands',
  templateUrl: './errands.component.html',
  styleUrls: ['./errands.component.scss']
})
export class ErrandsComponent implements OnInit {

  p: number = 1;
  progress: number = 0;
  services: any = [];
  editId: any;
  loading: boolean;
  showEditValues: boolean;
  editValues: any = [];
  f: any;

  constructor(
    private fb: FormBuilder,
    private errands: ErrandsService,
    config: NgbModalConfig, private modalService: NgbModal,
    private alertService: AlertService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  //open method for Modal
  open(editServices) {
    this.modalService.open(editServices);
  }

  getServiceById(id) {

    this.editId = id;
    this.errands.getServicesById(id).subscribe(

      res => {
        this.loading = false;
        this.showEditValues = true;
        //console.log(res);
        this.editValues = res['records'][0];
      }
    );

  }

  updateService(f: NgForm) {
    this.errands.updateService(f.value).subscribe(
      res => {
        this.alertService.success("updated!");
        this.reload();

      }),
      err => {
        //console.log(err);
      }
  }

  deleteServiceById(id) {
    this.errands.deleteServiceById(id).subscribe(
      res => {
        this.reload();
      }
    );

  }

  reload() {
    this.errands.getServices().subscribe(
      res => {
        //console.log(res);
        this.services = res['records'];
      }
    );
  }



  ngOnInit(): void {
    this.addService = this.fb.group({
      title: ['', Validators.required],
    });

    this.errands.getServices().subscribe(
      res => {
        //console.log(res);
        this.services = res['records'];
      }
    );

  }

  addService: FormGroup;





  /* addErrand() {
    this.errands.addErrand(
      this.addService.value.title,
      this.addService.value.excerpt,
      this.addService.value.description,
      this.addService.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    })
  } */


}
