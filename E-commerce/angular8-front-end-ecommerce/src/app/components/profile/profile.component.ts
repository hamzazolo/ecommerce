import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { UserRequest } from 'src/app/models/user-request';

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
    this.userRequest.nom = this.profilForm.get('nom').value;;
    this.userRequest.prenom = this.profilForm.get('prenom').value;
    this.userRequest.email = this.profilForm.get('email').value;

    this.userService.updateInformations(this.userRequest).subscribe(
      data => {
        console.log("response : ",data)
        this.token.saveToken(data.token);
        this.token.saveUser(data);
        this.isLoading = false;
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
  }
}
