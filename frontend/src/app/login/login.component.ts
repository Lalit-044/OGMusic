
import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [HttpClient, HttpClientModule]
})
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })

export class LoginComponent {
  loginForm: FormGroup;

  constructor(

    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    // console.log("Hiiii")
    // console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      console.log("Login Form Error")
    }

    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    // Call your API service to check credentials
    this.apiService.login(this.loginForm.value).subscribe(

      (response) => {
        if(response.user.email=="krishna@gmail.com"){
          alert("Admin Login Success")
          console.log('Login response:', response);
          localStorage.setItem('user',response.user.email)
          this.router.navigate(['/adminhome'],{queryParams:{email:this.loginForm.value.email}});
          // alert("After res")
        }
        // If login successful, navigate to the dashboard page
        else{
          alert("Login Success")
        console.log('Login response:', response);
        localStorage.setItem('user',response.user.email)
        this.router.navigate(['/home'],{queryParams:{email:this.loginForm.value.email}});
        }
      },
      (error) => {
        // If login fails, handle the error (e.g., display an error message)
        alert("Login Failed")
        console.error('Login failed:', error);
        // Optionally, you can display an error message to the user
      }
    );
  }
}
