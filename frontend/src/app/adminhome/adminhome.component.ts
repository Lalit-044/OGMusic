import { Component } from '@angular/core';
import { ActivatedRoute, Router,RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { DisplaySongComponent } from '../display-song/display-song.component';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule,DisplaySongComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
  providers: [HttpClient, HttpClientModule]
})
export class AdminhomeComponent {
  em:any
  user:string=''
  constructor(
    private router:Router,
    private route:ActivatedRoute
  ){
    let u: any = localStorage.getItem('user');
    this.user=u;
    if(u==null || u==''){
      this.router.navigateByUrl('login')
    }
  }
  logout(){
    localStorage.removeItem('user')
    this.router.navigateByUrl('login')
  }
  ngOnInit():void{
    this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
      this.em = params['email']
      console.log(this.em)
    })
  }
  navigateTo1(route:string){
    this.router.navigate([route],{queryParams:{email:this.em}})
  }

  navigateTo(route:string){
    this.router.navigateByUrl(route)
  }
}
