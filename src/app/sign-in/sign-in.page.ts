import {Component, HostListener, OnInit} from '@angular/core';
import {AuthModel, AuthService} from "../data/services/auth.service";
import {Router} from "@angular/router";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  user: AuthModel

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.user = new AuthModel()
  }

   async onSubmit() {
     const loading = await this.loadingCtrl.create({
       message: 'Fazendo login...',
     });
     loading.present();
    this.authService.auth(this.user)
      .then((res) => {
        localStorage.setItem('userToken', res.token.access_token);
        localStorage.setItem('userId', res.user.idUser);
        this.router.navigate(['/home']);
        loading.dismiss();
      })
      .catch(async () => {
        const toast = await this.toastController.create({
          message: 'Acesso negado, verifique os dados.',
          duration: 1500,
          position: 'bottom',
          color: 'danger'
        });
        loading.dismiss();
        await toast.present();
      });
  }

}
