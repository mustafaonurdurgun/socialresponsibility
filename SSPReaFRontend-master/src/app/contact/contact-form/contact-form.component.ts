import { Component } from '@angular/core';
import { MailRequest } from 'src/core/models/request/mailrequest.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  mailRequest!: MailRequest
  errorMessage?: string = '';

  constructor(private mailService: ApiService) {
    this.mailRequest = new MailRequest();
  }

  name?: string;
  surname?: string;
  email?: string;
  message?: string;

  // E-posta gönderme işlemi burada yapılabilir

  sendEmail() {
this.message+="{"+this.name+this.surname+"} tarafından gönderildi"
    if (this.email != null&&this.name!&&this.surname) {
      this.mailRequest.recepients = "ilkersenel5797@gmail.com";
      this.mailRequest.body = this.message;
      this.mailRequest.subject = "SSP:" + this.email + " İlker Şenel";

      console.log(this.mailRequest);
      (this.mailService.sendEmail(this.mailRequest))
        .subscribe(
          response => {

            console.log('E-posta gönderildi:', response);
          },
          error => {
            console.error('E-posta gönderme hatası:', error);
          }
        );
      this.errorMessage = "mail gönderildi"
      this.name=this.surname=this.message=this.email='';
    }
    else {
      this.errorMessage = "lütfen boş kısımları doldurun";
      this.name=this.surname=this.message=this.email='';
    }
    console.log(this.message)
  }


}
