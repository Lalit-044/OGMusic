import { Component, OnInit } from '@angular/core';
import { Song } from '../shared/models/song';
import { SongServiceTsService } from '../services/song.service.ts.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SongDet } from '../model/song-det';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-display-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-song.component.html',
  styleUrl: './display-song.component.css'
})
export class DisplaySongComponent implements OnInit{
  Songs!: SongDet[];
  audioPlayer!:HTMLAudioElement;
  isPlaying!:boolean;
  path!:string;
  ind!:any;
  
  songs = [
    { image: '../../assets/s1.jpg' , alter:'s1',title: 'Sakkarakatti', artist: 'Hip Hop', album: 'Album 1', audioSrc: '../../assets/s1.mp3' },
    { image: '../../assets/s2.jpg' ,alter:'s2',title: 'Kadhaipomaa', artist: 'Sid Sriram', album: 'Album 2', audioSrc: '../../assets/s2.mp3' },
    { image: '../../assets/s3.jpg' ,alter:'s3',title: 'Kadhal Aasai', artist: 'YSR', album: 'Album 2', audioSrc: '../../assets/s3.mp3' },
    { image: '../../assets/s4.jpg' ,alter:'s4',title: 'Mudhal Nee', artist: 'Sid Sriram', album: 'Album 2', audioSrc: '../../assets/s4.mp3' },
    { image: '../../assets/s5.jpg' ,alter:'s5',title: 'Munbe Vaa', artist: 'Shreya Goshal', album: 'Album 2', audioSrc: '../../assets/s5.mp3' },
    { image: '../../assets/s6.jpg' ,alter:'s6',title: 'Urugi Urugi', artist: 'Rio', album: 'Album 2', audioSrc: '../../assets/s6.mp3' },
    { image: '../../assets/s7.jpg' ,alter:'s7',title: 'Yaanji', artist: 'Maddy', album: 'Album 2', audioSrc: '../../assets/s7.mp3' },
    { image: '../../assets/Whistle Podu.jfif' ,alter:'s7',title: 'Whistle Podu', artist: 'YSR', album: 'Album 2', audioSrc: '../../assets/Whistle Podu.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Hukum', artist: 'Anirudh', album: 'Album 2', audioSrc: '../../assets/Hukum.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'NewYork Nagaram', artist: 'A. R. Rahman', album: 'Album 2', audioSrc: '../../assets/NewYork Nagaram.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Naa Ready', artist: 'Anirudh', album: 'Album 2', audioSrc: '../../assets/Naa Ready.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Adada Adada', artist: 'YSR', album: 'Album 2', audioSrc: '../../assets/Adada Adada.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Poovukkul', artist: 'Ilayaraja', album: 'Album 2', audioSrc: '../../assets/Poovukkul.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Raja Raja Cholan', artist: 'Ilayaraja', album: 'Album 2', audioSrc: '../../assets/Raja Raja Cholan.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Kalyana Maalai', artist: 'Ilayaraja', album: 'Album 2', audioSrc: '../../assets/Kalyana Maalai.mp3' },
    { image: '../../assets/musicbg.jfif' ,alter:'s7',title: 'Thirumana Malargal', artist: 'Ilayaraja', album: 'Album 2', audioSrc: '../../assets/Thirumana Malargal.mp3' },

    // Add more song data as needed
  ];
  constructor(private songService:SongServiceTsService,private router:Router,private apiService:ApiService){
    // this.songs = songService.getAll()
  }
  
  navigateTo(route:string){
    this.router.navigateByUrl(route)
  }

  playSong(tit: String) {
    // Get the audio element
    for (let i = 0; i < this.songs.length; i++) {
      if(this.songs[i].title==tit){
        this.ind = i;
      }
  }
    this.path=this.songs[this.ind].audioSrc;

    console.log("Working Clicked")
    if(this.isPlaying){
      this.isPlaying=false;
      this.audioPlayer.pause();
    }
    
    else if(!this.isPlaying){
      this.audioPlayer = new Audio(this.path);
      this.isPlaying=true;
      this.audioPlayer.play();
    }
  }
  pauseSong(){
    if(this.isPlaying){
      this.isPlaying=false;
      this.audioPlayer.pause();
    }
    
  }

  ngOnInit(): void {
    this.isPlaying = false;
    this.display();
    console.log(this.Songs);
  }

  display(): void {
    this.apiService.getSongs().subscribe((data: SongDet[]) => {
      this.Songs = data;
    });
  }

  play(Song: SongDet): void {
    console.log(Song);
    this.apiService.editSong(Song);
  }


}
