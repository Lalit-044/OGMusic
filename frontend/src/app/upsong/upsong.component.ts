import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
// import { EditSongComponent } from '../edit-song/edit-song.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SongDet } from '../model/song-det';
import { title } from 'process';

@Component({
  selector: 'app-upsong',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './upsong.component.html',
  styleUrl: './upsong.component.css',
})
export class UpsongComponent {
  em: any;
  upsongForm: FormGroup;
  Songs!: SongDet[];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.upsongForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],

      // password: ['', [Validators.required]],
      // confirmpass: ['',[Validators.required]]
    });

    // this.Songs = [{ title: 'Song 1', artist: 'Artist 1' },
    // { title: 'Song 2', artist: 'Artist 2' },]
  }

  // ngOnInit():void{
  //   this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
  //     this.em = params['email']
  //     console.log(this.em)
  //   })
  // }
  // songupdatedet(){

  // }
  // ngOnInit():void{
  //   this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
  //     this.em = params['email']
  //     console.log(this.em)
  //   })
  // }
  ngOnInit(): void {
    this.display();
    console.log(this.Songs);
    this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
      this.em = params['email']
      console.log(this.em)
    })
  }

  display(): void {
    this.apiService.getSongs().subscribe((data: SongDet[]) => {
      this.Songs = data;
    });
  }

  navigateTo(route:string){
    this.router.navigate([route],{queryParams:{email:this.em}})
  }

  updateSong(Song: SongDet){
    // this.router.navigate(["/updatesong"],{queryParams:{title: Song.title,description:Song.description}})
  }

  edit(Song: SongDet): void {
    console.log(Song);
    // this.apiService.editSong(Song);
    if (this.upsongForm.valid) {
      this.apiService.editSong(Song).subscribe({
        next: (response: any) => {
          console.log('Song Update Successful:', response);
          alert('Song Updated Successful');
          this.router.navigateByUrl('/upsong');
        },
      error:  (error: any) =>{ 
        alert('Update failed');
        console.error('Update failed:', error)

      }
    });
    }
  }
  delete(Song: SongDet): void {
    console.log(Song);
    this.apiService.deleteSong(Song).subscribe({
      next: (response) => {
        console.log('Delete successfully', response);
        alert('Song deleted Successfully');
        window.location.reload();
        this.router.navigateByUrl('/adminhome/upsong');
      },
      error: (error) => {
        alert('account cannot be delete');
        console.error('delete failed:', error);
      },
    });
  }
}
