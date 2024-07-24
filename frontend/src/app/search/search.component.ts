import { Component } from '@angular/core';
import { Song } from '../shared/models/song';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongDet } from '../model/song-det';
import { ApiService } from '../api.service';
// import { Song } from '../model/song';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  // searchTerm: string = '';
  searchTerm: string = '';
  songs: SongDet[] = [];
  em: any;
  constructor(private router: Router, private apiService: ApiService,private route:ActivatedRoute) {}
  // songs: Song[] = []; // Replace Song with your actual interface or type
  // filteredSongs: Song[] = [];
  //   searchSongs(searchTerm: string) {
  //     this.filteredSongs = this.songs.filter(song =>
  //       song.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  ngOnInit():void{
    this.route.queryParams.subscribe((params:{[x:string]:any;})=>{
      this.em = params['email']
      console.log(this.em)
    })
  }
  navigateTo(route:string){
    if(this.em=="krishna@gmail.com"){
      this.router.navigate(['/adminhome'],{queryParams:{email:this.em}})
    }
    else{
      this.router.navigate([route],{queryParams:{email:this.em}})
    }
    
  }
  search() {
    console.log("Typing")
    if (this.searchTerm.trim() === '') {
      this.songs = [];
      return;
    }
    this.apiService
      .searchSongs(this.searchTerm)
      .subscribe((songs) => (this.songs = songs));
  }
}
