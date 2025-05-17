import {Component, HostListener, OnInit} from '@angular/core';
import {AuthModel, AuthService} from "../data/services/auth.service";
import {Router} from "@angular/router";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {FileSystemImageService} from "../data/services/file-system-image.service";
import {ImageService} from "../data/services/image.service";
import {UserModel} from "../data/models/user.model";

@Component({
  selector: 'app-sign-up-simpilify',
  templateUrl: './sign-up-simpilify.page.html',
  styleUrls: ['./sign-up-simpilify.page.scss'],
})
export class SignUpSimpilifyPage implements OnInit {
  user: UserModel

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private fileSystemImageService: FileSystemImageService,
    private imageService: ImageService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.user = new UserModel()
  }


  async selectImage(){
    const loading = await this.loadingCtrl.create({
      message: 'Fazendo upload da imagem. Por favor aguarde...',
    });

    const alert = await this.alertController.create({
      header: 'Escolha de foto de usuário',
      message: 'Selecione uma opção:',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.fileSystemImageService.getPhoto('camera').then((image) => {
              loading.present()
              fetch(`data:image/png;base64,${image.base64Image}`)
                .then((res) => res.blob())
                .then((blob) => {
                  this.imageService.uploadImageBlob(blob, 'tickets').then((res) => {
                    this.user.imageUrl = res
                    setTimeout(() => {
                      loading.dismiss()
                    }, 500)
                  })
                })
            })
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.fileSystemImageService.getPhoto('gallery').then((image) => {
              loading.present()
              fetch(`data:image/png;base64,${image.base64Image}`)
                .then((res) => res.blob())
                .then((blob) => {
                  this.imageService.uploadImageBlob(blob, 'tickets').then((res) => {
                    this.user.imageUrl = res
                    setTimeout(() => {
                      loading.dismiss()
                    }, 500)
                  })
                })
            })
          }
        },
        {
          text: 'Cancelar',
          role: "cancel"
        },
      ],
    });

    await alert.present();
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Criando usuário. Por favor aguarde...',
    });
    loading.present()
    this.authService.createUser(this.user).then((res) => {
      loading.dismiss()
      this.router.navigate(['../'])
    })
  }

}
