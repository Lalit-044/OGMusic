import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Directive, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'app-sondadd',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './sondadd.component.html',
  styleUrl: './sondadd.component.css',
})
export class SondaddComponent {
  sondaddForm: FormGroup;
  em:any
  pdfs: any;
  selectedFile: File | null = null;
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.sondaddForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      
      // password: ['', [Validators.required]],
      // confirmpass: ['',[Validators.required]]
    });
  }
  // ngOnInit():void{
  //   this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
  //     this.em = params['email']
  //     console.log(this.em)
  //   })
  // }
  navigateTo(route:string){
    this.router.navigate([route],{queryParams:{email:this.em}})
  }
  ngOnInit():void{
    this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
      this.em = params['email']
      console.log(this.em)
    })
  }

  selectPdf(event: any) {
    alert('Selected pdf');
    const fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      this.pdfs = fileList[0];
      console.log('Inside if');
    }
  }

  songadd() {
    if (this.sondaddForm.invalid || !this.pdfs) {
      console.log('Invalid form or no file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.pdfs);
    formData.append('title', this.sondaddForm.value.title);
    formData.append('description', this.sondaddForm.value.description);
    console.log(formData);
    this.http.post<any>('http://localhost:8000/upload', formData).subscribe(
      (response: any) => {
        console.log('Song added successfully!', response);
        // Handle successful response (e.g., clear form, show success message)
      },
      (error: any) => {
        console.error('Error adding song:', error);
        // Handle error (e.g., show error message)
      }
    );
  }

  songadddet(){
    if(this.sondaddForm.valid) {
      this.apiService.addSongDet(this.sondaddForm.value).subscribe(
        response => {
          alert("Song Inserted successfully");
          this.router.navigate(['/adminhome'],{queryParams:{email:this.em}})
        },
        error => {
          this.sondaddForm.reset();
        }
      )
    }
    else{
      alert("Please check all fields")
    }
  }

  
  
}
