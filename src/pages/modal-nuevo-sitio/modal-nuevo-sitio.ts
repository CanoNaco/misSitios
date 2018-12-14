import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { DbProvider } from '../../providers/db/db';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
/**
 * Generated class for the ModalNuevoSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-nuevo-sitio',
  templateUrl: 'modal-nuevo-sitio.html',
})
export class ModalNuevoSitioPage {

  coords: any = {lat: 0, lng: 0}
  info: string;
  foto: any = '';

  constructor(
    public navCtrl: NavController, 
    private viewCtrl: ViewController, 
    public navParams: NavParams, 
    private camera: Camera,
    //private db: DbProvider
    private dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoSitioPage');
    this.coords.lat = this.navParams.get('latitude');
    this.coords.lng = this.navParams.get('longitude');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  sacarFoto(){

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  guardarSitio(){
    let sitio = {
      lat: this.coords.lat,
      lng: this.coords.lng ,
      description: this.info,
      foto: this.foto
    }
    
    this.dbFirebase.guardaSitio(sitio).then(res=>{
      console.log('Sitio guardado en firebase:');
      this.cerrarModal();
    })
  }

  

}
