import { Component, ViewChild, ElementRef } from '@angular/core';
import leaflet from 'leaflet';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

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
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  coords: any;
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad() {
    this.loadmap();
  }

  ionViewDidEnter() {
  }
 
  loadmap() {
    var marcador = leaflet.icon({
      iconUrl: 'assets/imgs/marcador.png',
      iconAnchor: [14.5,50]
    });

    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.coords = e;
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: marcador}).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }
  nuevoSitio(){
    //ventana modal del sitio
    let mimodal = this.modalCtrl.create ('ModalNuevoSitioPage',this.coords);
    mimodal.present();
  }
}
