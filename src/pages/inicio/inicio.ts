import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Importación del plugin de geolocalizacion
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  map: any; // Manejador del mapa.

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public  platform: Platform,
    private geolocation: Geolocation){

      platform.ready().then(() => {
        // La plataforma esta lista y ya tenemos acceso a los plugins.
          this.obtenerPosicion();
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
