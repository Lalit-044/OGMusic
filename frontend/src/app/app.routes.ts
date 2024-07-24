import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
// import { SongCardComponent } from './song-card/song-card.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { SondaddComponent } from './sondadd/sondadd.component';
import { SearchComponent } from './search/search.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { UpComponent } from './up/up.component';
import { UpsongComponent } from './upsong/upsong.component';
import { DeletesongComponent } from './deletesong/deletesong.component';
import { DisplaySongComponent } from './display-song/display-song.component';
import { ContactComponent } from './contact/contact.component';
// import { EditSongComponent } from './edit-song/edit-song.component';



export const routes: Routes = [
    {path:'',redirectTo:'/signup',pathMatch:'full',title:'bus-booking'},
    {path:'login',component:LoginComponent,title:'login-page'},
    {path:'signup',component:SignupComponent,title:'signup-page'},
    {path:'home',component:HomeComponent,title:'home-page'},
    {path:'adminhome',component:AdminhomeComponent,title:'adminhome-page'},
    // {path:'song-card',component:SongCardComponent,title:'song-card-page'},
    {path:'sondadd',component:SondaddComponent,title:'sondadd-page'},
    {path:'search',component:SearchComponent,title:'search-page'},
    {path:'updateprofile',component:UpdateprofileComponent,title:'updateprofile-page'},
    {path:'up',component:UpComponent,title:'update-page'},
    {path:'upsong',component:UpsongComponent,title:'updatesong-page'},
    {path:'delete',component:DeletesongComponent,title:'delete-page'},
    {path:'display',component:DisplaySongComponent,title:'display-page'},
    {path:'contact',component:ContactComponent,title:'updatesong-page'}
];

