import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ErrandsService } from '../../_services/errands.service';

@Component({
  selector: 'app-add-errand',
  templateUrl: './add-errand.component.html',
  styleUrls: ['./add-errand.component.scss']
})
export class AddErrandComponent implements OnInit {
  progress: number = 0;
  services: any = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private errands: ErrandsService
  ) { }

  ngOnInit(): void {
    this.addService = this.fb.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  addService: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;



  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addService.get('image').setValue(file);
    }
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addService.patchValue({
      avatar: file
    });
    this.addService.get('image').updateValueAndValidity()
  }


  addErrand() {
    this.loading = true;
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
          this.loading = false;

      }
    })
  }


}
