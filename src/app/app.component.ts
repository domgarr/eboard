import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

//https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web

//Green Scoreboard : 0000aaaa-0000-1000-8000-00805f9b34fb red

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild("bteConnectButton", {static:false}) bteButton : ElementRef;
  @ViewChild("incRedScoreButton", {static:false}) redScoreButton : ElementRef;

  constructor(){
  }

  ngOnInit(){}

  ngAfterViewInit(){
    let redScore;
    let blueScore;
    //TODO: Add OrangeScoreboard to this list.
    this.bteButton.nativeElement.addEventListener('pointerup', function(event) {
      navigator.bluetooth.requestDevice({

          filters :[{
            //TODO: Search for multiple names.
            name: "Green Scoreboard"
          }],
          optionalServices: ['a7fe1050-e168-11e9-81b4-2a2ae2dbcce4']
      })
      .then(device => {
        console.log("Connecting to " + device.name);
        return device.gatt.connect();
      })
      .then(server => {
        return server.getPrimaryService("a7fe1050-e168-11e9-81b4-2a2ae2dbcce4");
      })
      .then(service =>{
        redScore = service.getCharacteristic("0000aaaa-0000-1000-8000-00805f9b34fb");
        blueScore = service.getCharacteristic("0000bbbb-0000-1000-8000-00805f9b34fb");
        //return service.getCharacteristics();
        console.log("Connected");
      })
      .then(characteristic=>{

      })
      .catch(error => { console.log(error); });
    });

    this.redScoreButton.nativeElement.addEventListener('pointerup', function(event){

      console.log(redScore);
      redScore.then(characteristic =>{
        let value = Uint8Array.of(1);
        characteristic.writeValue(value);
      })

      blueScore.then(characteristic =>{
        let value = Uint8Array.of(1);
        characteristic.writeValue(value);
      })
    });

  }

  getServicesCharacteristic(characteristics){
    characteristics.forEach(characteristic =>{
      console.log(characteristic);
    });
  }
}
