import { Component } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database'; //Añadido
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'
import { AlertController } from '@ionic/angular';
import { timeStamp } from 'console';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {    
      

  constructor(public db: AngularFireDatabase, public callNumber: CallNumber,private bluetoothSerial:BluetoothSerial,private alertontroller:AlertController) {}  

  percent = 0.01;
  Devices

  ActivarBluetooth() {
    this.bluetoothSerial.isEnabled().then(response=> {
    this.isEnabled ("IsOn");
    this.Listdivices()
    },error=> { this.isEnabled("IsOff")
    })
  }
    Listdivices(){
    this.bluetoothSerial.list().then(response=>{
      this.Devices=response
    },error=>{
      console.log("error")
    })
  }
  conneced(address){
    this.bluetoothSerial.connect(address).subscribe(success=>{
        this.deviceConnected()
    },error=>{
      console.log("error")
    })
  }
  deviceConnected(){
    this.bluetoothSerial.subscribe('/n').subscribe(success=>{
      this.hundler(success)
    })
  }
  hundler(value){
    console.log(value)
  }
  sedData(){
    this.bluetoothSerial.write("7").then(response=>{
      console.log("okay")
    },error=>{
      console.log("un problema")
    })
  }
    async isEnabled(msg) {
      const alert=await this.alertontroller.create({
        header: 'Alerta',
        message: msg,
        buttons: [{
          text: 'Okay',
          handler: () => {
            console.log("okay")
          }
        }]
      })
    }
  
  getSmokeValue(){
    this.db.database.ref('SensorHumo').once('value').then((snap)=>{          
      document.getElementById("Smoke").innerText = snap.val();
      this.percent = snap.val()/1000;
      this.colorBar();
      //return snap.val()/800;
    });
    
  }

  colorBar(){
    
    var elemento = document.querySelector('#bar');
    
    //Prueba para ver si cambiaba de color la barra
    //this.percent = this.percent + 0.30;
    
    if(this.percent>0 && this.percent<.4){
      elemento.setAttribute("color", "success");

    } if(this.percent>.4 && this.percent < 0.6){
      elemento.setAttribute("color", "warning");

    } if(this.percent>0.6){
      elemento.setAttribute("color", "danger");

    }
  }

  Call(){
    this.callNumber.callNumber("8123824656", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }


}  
