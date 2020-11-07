import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { UserRequest } from 'src/app/models/user-request';
import { PasswordDTO } from 'src/app/models/password-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user :User;
  profilForm:FormGroup;
  passwordForm : FormGroup;
  changeInformations : boolean = false;
  isLoading=false;
  isLoadingPassword = false;
  userRequest :UserRequest = new UserRequest();
  message ='';
  isError = false;
  isErrorPassword =false;
  isSuccesPassword = false;
  messagePassword ='';
  passwordDTO : PasswordDTO = new PasswordDTO();
  constructor(private token: TokenStorageService, private fb:FormBuilder , private userService:UserService) { }

  ngOnInit() {
    this.user = new User(this.token.getUser());
    
    this.profilForm = this.fb.group({
      nom :['',Validators.required],
      prenom : ['',Validators.required],
      email : ['',[Validators.required, Validators.email]]
      
    });

    this.passwordForm = this.fb.group({
      lastPassword : ['', [Validators.required,Validators.minLength(6)] ], 
      newPassword : ['', [Validators.required,Validators.minLength(6)] ],
      confirmPassword : ['', [Validators.required,Validators.minLength(6)] ]
    })
  }

  changePersonelInformations(){
    this.changeInformations = true;
  }
  closePersonelInformations(){
    this.changeInformations =false;
    this.isError = false;
  }
  onSubmit(){
    this.isLoading = true;
    this.userRequest.id = this.user.id;
    this.userRequest.nom = this.profilForm.get('nom').value;
    this.userRequest.prenom = this.profilForm.get('prenom').value;
    this.userRequest.email = this.profilForm.get('email').value;

    this.userService.updateInformations(this.userRequest).subscribe(
      data => {
        console.log("response : ",data)
        this.token.saveToken( this.token.getToken());
        this.token.saveUser(data);
        this.isLoading = false;
        this.changeInformations = false;
      },
      err => {
        this.message = err.error.message;
        this.isError = true;
        this.isLoading = false;
        this.user = new User(this.token.getUser());
      }
    )
  }

  changePassword(){
    this.isLoadingPassword = true;
    const lastPassword = this.passwordForm.get('lastPassword').value;
    const newPassword = this.passwordForm.get('newPassword').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value;

    if(newPassword !== confirmPassword){
      this.isLoadingPassword = false;
      this.messagePassword="Password does not match";
      this.isErrorPassword = true;
      return;
    }
    this.passwordDTO.userId = this.user.id;
    this.passwordDTO.newPassword = newPassword;
    this.passwordDTO.oldPassword = lastPassword
    this.userService.updatePassword(this.passwordDTO).subscribe(
      data => {
        this.isLoadingPassword = false;
        this.isSuccesPassword = true;
        this.isErrorPassword= false;
        this.messagePassword = data;
        this.passwordForm.get('lastPassword').reset();
        this.passwordForm.get('newPassword').reset();
        this.passwordForm.get('confirmPassword').reset();
      },
      err => {
        this.isSuccesPassword = false;
        this.messagePassword=err.error;
        this.isLoadingPassword = false;
        this.isErrorPassword= true;
      }
    ) 
   
  }
  
}
