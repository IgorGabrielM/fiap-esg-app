import { Component, OnInit } from '@angular/core';
import {MediaService} from "../data/services/media.service";
import {MediaModel} from "../data/models/media.model";
import * as QRCode from 'qrcode';
import {RecursoService} from "../data/services/recurso.service";
import {RecursoModel} from "../data/models/recurso.model";
import {UserModel} from "../data/models/user.model";
import {PostModel} from "../data/models/post.model";
import {Router} from "@angular/router";
import {AuthService} from "../data/services/auth.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.page.html',
  styleUrls: ['./materiais.page.scss'],
})
export class MateriaisPage implements OnInit {
  users: any[] = [];
  posts: PostModel[] = [];
  cursos: MediaModel[] = []
  bgRankClass: string;
  borderRankClass: string;
  textRankClass: string;
  nameRank: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private mediaService: MediaService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadUsers();
    // this.loadUser();
    // this.loadMedia();
  }

  ionViewWillEnter() {
    // this.loadUser();
    // this.loadMedia()
  }

  async loadUsers() {
    this.authService.listUserByRank().then(async (usrs) => {
      this.users = usrs.sort((a, b) => a.userRank - b.userRank);
      console.log(this.users);
    })
  }

  loadMedia(){
    const userToken = localStorage.getItem('userId');
    this.mediaService.list().then((res) => {
      if(res?.length > 0){
        this.cursos = res.filter((curso) => curso?.users[0]?.user?.idUser.toString() == userToken.toString()).reverse().filter((r) => r.type === 'Curso');
      }
    })
  }

  exit(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this.router.navigate(['../'])
    setTimeout(() => {location.reload()}, 500)
  }

}
