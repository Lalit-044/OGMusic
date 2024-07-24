import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Signup } from '../model/signup';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  constructor(private authService: ApiService,private router:Router){

  }
  user:Signup =new Signup()
     ngOnInit(): void {
            //  this.user =this.authService.getUser();
     }
    onSubmit(form: NgForm): void {
      console.log(this.user.username);
      console.log(this.user.email);
      console.log(form.value)
      if (form.valid) {
        this.authService.update(this.user).subscribe({
          next: (response) => {
            console.log('update successful:', response);
            alert('account updated successful');
            this.router.navigateByUrl('/home');
          },
        error:  (error) =>{ 
          alert('account is already exist');
          console.error('Signup failed:', error)
  
        }
      });
      }
    }
}
