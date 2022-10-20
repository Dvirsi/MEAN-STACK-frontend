import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  sub : Subscription = new Subscription();
  user : User = new User();

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);

  constructor(private utils : UtilsService, private rouer : Router, private uiUtils : UiService) { }

  getEmailErrorMessage() : string 
  {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getNamerrorMessage() : string 
  {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return this.name.hasError('required') ? 'Not a valid name' : '';
  }


  addNewUser(isValid : boolean | null) : void
  {
    if(isValid)
    {
      this.sub = this.utils.addNewUser(this.user)
      .subscribe((id:any) => 
      {
        this.user._id = id;
        this.uiUtils.toggleAddUser(this.user);
        this.rouer.navigate([""]);
      });
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy() : void 
  {
    this.sub.unsubscribe();
  }

}
