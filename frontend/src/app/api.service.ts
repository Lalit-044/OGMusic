import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signup } from './model/signup';
import { SongDet } from './model/song-det';
import { Router } from '@angular/router';
import { Song } from './model/song';
// import { SongDet } from './model/song-det';
// import { Song } from ;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  
  private baseUrl = 'http://localhost:8000';
  user: Signup | undefined;

  constructor(private httpClient: HttpClient,private router:Router) {}
  song: SongDet = new SongDet();

  insertData(userDetails: any) {
    return this.httpClient.post(`${this.baseUrl}/signup`, userDetails);
  }

  login(userDetails: any): Observable<any> {
    // const userDet = { email, password };
    console.log('Hello');
    return this.httpClient.post(`${this.baseUrl}/login`, userDetails);
  }

  //   getSongs(): Observable<Song[]> {
  //     return this.httpClient.get<Song[]>('http://localhost:8000/songs');
  // }

  addSong(formData: FormData): Observable<any> {
    console.log(formData);
    return this.httpClient.post(`${this.baseUrl}/upload`, formData);
  }
  
  update(user: Signup): Observable<any> {
    console.log(user);
    return this.httpClient.put<Signup>(`${this.baseUrl}/editusers`, user);
  }
  update1(formData:any) {
    // formData.append('emailori',em);
    console.log('In Update API');
    console.log(formData)
    return this.httpClient.post(`${this.baseUrl}/update1`, formData);
  }
  getUserByEmail(email: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/users/${email}`);
  }

  addSongDet(formData: FormData): Observable<any> {
    console.log(formData);
    return this.httpClient.post(`${this.baseUrl}/uploadSongDet`, formData);
  }


  getSongs(): Observable<SongDet[]> {
    return this.httpClient.get<SongDet[]>(`${this.baseUrl}/Songs`);
  }
  editSong(Song: SongDet): any {
    this.song = Song;
    this.router.navigateByUrl('adminhome/editSong');
  }
  deleteSong(Song: SongDet): Observable<any> {
    return this.httpClient.post<SongDet>(`${this.baseUrl}/delete`, Song);
  }

  searchSongs(searchTerm: string): Observable<any> {
    console.log("In Service file searching")
    return this.httpClient.post<SongDet>(`${this.baseUrl}/search`, { searchTerm });
  }
}
