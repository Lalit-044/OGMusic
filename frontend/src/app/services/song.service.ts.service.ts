import { Injectable } from '@angular/core';
import { Song } from '../shared/models/song';
import { sample_songs } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class SongServiceTsService {

  constructor() { }

  getAll():Song[]{
    return sample_songs;
  }
}
