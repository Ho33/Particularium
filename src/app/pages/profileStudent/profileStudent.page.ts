import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AngularFirestore} from '@angular/fire/firestore'
import * as firebase from 'firebase/app'
import { Component, OnInit } from '@angular/core';
import { SingUpServiceService } from 'src/app/servicios/singUp/sing-up-service.service';
import { Map, tileLayer, marker, icon } from 'leaflet';
import 'esri-leaflet';
import { geosearch } from 'esri-leaflet-geocoder';//"esri-leaflet-geocoder"
import { Student } from 'src/app/core/model/student';

@Component({
  selector: 'app-profileStudent',
  templateUrl: './profileStudent.page.html',
  styleUrls: ['./profileStudent.page.scss'],
})
export class ProfileStudentPage implements OnInit {

  private student: Student = new Student();

  userIcon = icon({
    iconUrl: '../../../assets/icon/marcadorUsuario.png',
    iconSize: [52, 52], // size of the icon
    iconAnchor: [26, 52], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76]
  });
  map: Map ;
  marker: any;
  latLong = [];
  basura = [];
  icons: icon[] = new Array();
  marcadores = [[38.6762376, -6.4183559], [38.6730116, -6.4183819], [38.6740926, -6.4183829], [38.6750836, -6.4183839]];


  constructor(private signUp: SingUpServiceService, , private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoderno) {
  }

  ngOnInit() {
  }

  save() {
    this.signUp.addStudent(this.student);
  }
  //Mapa

  ionViewDidEnter() {
    this.map = new Map("myMapStudent");
    let searchControl = geosearch().addTo(this.map);
    this.showMap();
  }
  showMap() {

    this.basura.push(this.map);
    this.map.setView([38.6760376, -6.4183859], 15);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.pintarIcono()
  }

  pintarIcono() {
    this.map.on('click', function (e) {
      console.log(this.student.location);
      if (this.student.location != undefined) {
        this.map.remove();
        this.map = new Map("myMapStudent");
        this.showMap();
      }
      this.student.location = new firebase.firestore.GeoPoint(e.latlng.lat, e.latlng.lng);
      alert(e.latlng);
      marker(e.latlng, { icon: this.userIcon }, 15).addTo(this.map)
        .bindPopup('Hey, I\'m Here');
    }, this);
  }

  showMarker(latLong) {
    console.log(marker([0, 0]).getIcon());
    marker(latLong, { icon: this.userIcon }, 15).addTo(this.map);
    this.map.setView(latLong);
  }
  getMarker(e) {
    console.log(e.latLng);
  }
}
