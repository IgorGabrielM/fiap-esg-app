import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../data/models/user.model";
import {PostModel} from "../data/models/post.model";
import {MediaModel} from "../data/models/media.model";
import {MediaService} from "../data/services/media.service";
import {AuthService} from "../data/services/auth.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: UserModel
  posts: PostModel[] = [];
  cursos: MediaModel[] = []
  bgRankClass: string;
  borderRankClass: string;
  textRankClass: string;
  nameRank: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  ionViewWillEnter() {
    this.loadUser();
  }

  async loadUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando usuario. Por favor aguarde...',
    });
    loading.present()
    const userToken = localStorage.getItem('userId');
    this.authService.find(userToken).then(async (usr) => {
      this.user = usr;
      this.getRankClass();
      loading.dismiss()
    })
  }

  exit(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this.router.navigate(['../'])
    setTimeout(() => {location.reload()}, 500)
  }

  getRankClass() {
    if (!this.user) {
      return;
    }

    switch (true) {
      case (this.user.userRank >= 0 && this.user.userRank < 10):
        this.bgRankClass = 'bg-amber-700';
        this.borderRankClass = 'border-amber-700';
        this.textRankClass = 'text-amber-700';
        this.nameRank = 'Bronze';
        break;
      case (this.user.userRank >= 10 && this.user.userRank < 20):
        this.bgRankClass = 'bg-gray-400';
        this.borderRankClass = 'bg-gray-400';
        this.textRankClass = 'text-gray-400';
        this.nameRank = 'Prata';
        break;
      case (this.user.userRank >= 20 && this.user.userRank < 30):
        this.bgRankClass = 'bg-amber-400';
        this.borderRankClass = 'bg-amber-400';
        this.textRankClass = 'text-amber-400';
        this.nameRank = 'Ouro';
        break;
      case (this.user.userRank >= 30):
        this.bgRankClass = 'bg-emerald-500';
        this.borderRankClass = 'bg-emerald-500';
        this.textRankClass = 'text-emerald-500';
        this.nameRank = 'Esmeralda';
        break;
      default:
        this.bgRankClass = 'bg-sky-400';
        this.borderRankClass = 'bg-sky-400';
        this.textRankClass = 'text-sky-400';
        this.nameRank = 'Diamante';
        break;
    }
  }

  completeUser() {
    this.router.navigate(['/sign-up'], {queryParams: {id: this.user.idUser}});
  }

}
