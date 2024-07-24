import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './up.component.html',
  styleUrl: './up.component.css',
  providers: [HttpClient, HttpClientModule],
})
export class UpComponent {
  em: any;
  updateForm!: FormGroup;
  userData: any;
  // formBuilder: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // ngOnInit():void{
  //   this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
  //     this.em = params['email']
  //     console.log(this.em)
  //   })
  // }
  navigateTo(route:string){
    if(this.em=="krishna@gmail.com"){
      this.router.navigate(['/adminhome'],{queryParams:{email:this.em}})
    }
    else{
      this.router.navigate([route],{queryParams:{email:this.em}})
    }
    
  }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params: { [x: string]: any }) => {
      this.em = params['email'];
      console.log(this.em);
    });
    this.updateForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: [{value:'', disabled:true}, [Validators.required, Validators.email,]],
      // email: new FormControl({value: this.em, disabled: true}, Validators.required),
      password: ['', Validators.required],
    });

    this.apiService.getUserByEmail(this.em).subscribe(
      (data: any) => {
        this.userData = data;
        console.log('User data:', this.userData);
        console.log('Got to frontend');
        this.updateForm.patchValue({
          username: this.userData.usrname,
          email: this.em,
          password: this.userData.password,
        });
      },
      (error: any) => {
        console.error('Error retrieving user data:', error);
        // Handle error
      }
    );
  }

  update() {
    // Implement update logic here
    if (this.updateForm.invalid) {
      console.log('Login Form Error');
    }

    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    // Call your API service to check credentials
    const data:any = {
      username: this.updateForm.controls['username'].value,
      email:this.em,
      password: this.updateForm.controls['password'].value
    }
    this.apiService.update1(data).subscribe(
      (response) => {
        alert('Update done successfully');
        if(this.em=="krishna@gmail.com"){
          this.router.navigate(['/adminhome'],{queryParams:{email:this.em}})
        }
        else{
          this.router.navigate(['/home'],{queryParams:{email:this.em}})
        }
      },
      (error) => {
        this.updateForm.reset();
      }
    );
  }
}
