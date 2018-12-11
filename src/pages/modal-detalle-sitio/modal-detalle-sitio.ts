import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ModalDetalleSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detalle-sitio',
  templateUrl: 'modal-detalle-sitio.html',
})
export class ModalDetalleSitioPage {

  sitio: any;
  edit : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl : ViewController,
    private launchNavigator : LaunchNavigator,
    private camera: Camera, 
    private db: DbProvider) {

      this.sitio = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleSitioPage');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  comoLlegar(){
    let destino = this.sitio.lat+', '+this.sitio.lng;
    this.launchNavigator.navigate(destino)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

}
