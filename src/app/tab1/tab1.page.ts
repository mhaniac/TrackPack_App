import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm()
  }

  onSubmit(){
    if(this.formGroup.valid){
      const userLogin = this.formGroup.get('userLogin').value;
      const passwd = this.formGroup.get('passwd').value;
      const user = { userLogin, passwd };
      console.log(user);
    }
  }


  createForm(){
    this.formGroup = this.formBuilder.group({ 
      userLogin: ['', [Validators.required]],
      passwd: ['', [Validators.required]]
     })
  }

}
