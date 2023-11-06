import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ApiService } from 'src/core/services/api/api.service';
import { FirestoreService } from 'src/core/services/firestore/firestore.service';
import { Message } from 'src/core/models/message.model';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable, Timestamp } from 'rxjs';
import { BrowserPlatformLocation } from '@angular/common';
import { MailRequest } from 'src/core/models/request/mailrequest.model';
import { PasswordRequest } from 'src/core/models/request/password-request.model';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};
  public registerRequest: RegisterRequest = <RegisterRequest>{};
  public rePassword: string = '';
  public passwordResponse: string = '';
  mail!: MailRequest;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly apiService:ApiService,
    private firestoreService:FirestoreService,

    
  
  ) { 


    this.mail = new MailRequest;
    this.passwordRequest=new PasswordRequest;

  }
  messages: Message[] = [];
  selectedImage: File | null = null;
  passwordRequest!:PasswordRequest
  showModal: boolean = false;
  confirmCode: string = '';
  confirmCodeInput: string = '';
  message: string = '';
  isMailCame: boolean = false;
  isCodeCame:boolean=false;



  async ngOnInit(): Promise<void> {
    console.log("login component çalıştı");
    //Mesaj gönderme  

  }

  openModal() {
    this.message = '';
    this.showModal = true;
    this.isMailCame=false;
  }
  closeModal() {
    this.showModal = false;
    this.isMailCame = false;
    this.isCodeCame=false;
    this.passwordRequest.email='';
    this.passwordRequest.password='';
    this.mail!.body='';
    this.mail!.recepients='';
    this.mail!.subject='';



  }
  confirmationMail() {
    console.log(this.mail + "mail");
    this.mail!.subject = "Onay Şifresi";
    this.confirmCode = this.generateVerificationCode();
    this.mail!.body = "Onay şifreniz=" + this.confirmCode + " bu şifreyi ilgili yere yazdıktan sonra kullanıcı şifrenizi değiştirebilirsiniz."
    console.log(this.mail + "mail")
    this.apiService.sendEmail(this.mail!).subscribe(
      response => {

        console.log('E-posta gönderildi:', response);
        this.message = 'E-posta gönderildi';
        this.isMailCame = true;
      },
      error => {
        console.error('E-posta gönderme hatası:', error);
        this.message = 'E-posta gönderilme hatası';
      }
    );
  }

  confirmCodeMethod() {
    console.log(this.confirmCodeInput)
    if (this.confirmCode == this.confirmCodeInput) {
      this.isMailCame = false;
      this.message = 'onay kodunuz doğru şimdi şifrenizi değiştirebilirsiniz'
      this.isCodeCame=true;
      console.log(this.mail?.recepients)      
    }
    else {
      this.message = 'onay kodunuz yanlış tekrar deneyin'
    }
  }
  async changePassword(){

    
    this.passwordRequest!.email=this.mail.recepients?.toString();
   let status=await this.apiService.changePassword(this.passwordRequest).then((response)=>
   response?.status);

   if(status==ResponseStatus.Ok){
    this.message="şifreniz değişti giriş yapabilirsiniz"
   }
   else{
    this.message="bir hata oluştu tekrar deneyin"
   }
  
    
   
  }

  generateVerificationCode(): string {
    const min = 100000; // En küçük 6 haneli sayı
    const max = 999999; // En büyük 6 haneli sayı
    const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return verificationCode.toString();
  }

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['home']);
      location.reload();
    } else if (status == ResponseStatus.Invalid) {
      this.loginRequest.password = '';

    }

  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];

  }
  uploadProfileImage() {

    if (this.selectedImage) {
      const selectedImageCopy: File = new File([this.selectedImage], this.registerRequest.email + '.jpeg', {
        type: this.selectedImage.type,
      });
      this.selectedImage = selectedImageCopy;

      this.apiService.uploadProfileImage(this.selectedImage).subscribe(
        (response) => {
          // Yükleme başarılı
          console.log('Resim yükleme başarılı:', response);

          // Profil resmi ile ilgili başka işlemleri yapabilirsiniz
        },
        (error) => {
          // Yükleme sırasında hata oluştu
          console.error('Resim yükleme hatası:', error);
        }
      );
    } else {
      // Resim seçilmedi
      console.error('Lütfen bir resim seçin.');
    }
  }


  async register() {
    if (this.rePassword == this.registerRequest.password || this.selectedImage != null) {


      let selectedValue: string = '';

      //Cinsiyet seçenekleri için HTML'den alınan değeri registerRequest nesnesine atayın
      const maleRadioButton = document.querySelector('input[name="IsMale"]:checked') as HTMLInputElement;
      selectedValue = maleRadioButton.value;

      if (selectedValue == 'true')
        this.registerRequest.isMale = true;
      else if (selectedValue == 'false')
        this.registerRequest.isMale = false;



      this.uploadProfileImage();
      this.registerRequest.imagePath = "http://localhost:5258/api/Image/GetImage?resimKimlik=" + this.registerRequest.email + '.jpeg';



      let status = await this.authService.register(this.registerRequest);
      if (status == ResponseStatus.Ok) {


        await this.router.navigate(['/login']);
        location.reload();
      } else if (status == ResponseStatus.Invalid)
        this.registerRequest.password = '';
      this.passwordResponse = '';

    }
    else {
      this.passwordResponse = "Şifreler uyuşmuyor veya resim eklenemedi.";
    }

  }
}

