import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AngularFireModule } from '@angular/fire'; //Añadido
import {AngularFireDatabaseModule} from 'angularfire2/database'; //Añadido


import { HomePageRoutingModule } from './home-routing.module';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

var config = {
  apiKey: "AIzaSyDfmT8TrCoRqJLcdhDyflLBJwrw5LLCg_M",
  authDomain: "microproye.firebaseapp.com",
  databaseURL: "https://microproye-default-rtdb.firebaseio.com",
  projectId: "microproye",
  storageBucket: "microproye.appspot.com",
  messagingSenderId: "13082514879",
  appId: "1:13082514879:web:22baf328b348c88ebcfd0a",
  measurementId: "G-P3L0YF91DH"
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AngularFireModule.initializeApp(config), //Añadido
    AngularFireDatabaseModule //Añadido
  ],
  declarations: [
    HomePage,],
    providers:[
      BluetoothSerial
    ]
})
export class HomePageModule {}
