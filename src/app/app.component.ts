import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

//https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild("bteIcon", {static:false}) bteIcon : ElementRef;
   private connected : boolean = false;
   private deviceName : string;

   private redScoreChar;
   private blueScoreChar;

   private swapped : boolean = false;

   private redScoreText : string = "00";
   private blueScoreText : string = "00";

   private redScore : number = 0;
   private blueScore : number = 0;

   readonly SCOREBOARD_NAME_1 : string = "Green Scoreboard";
   readonly SCOREBOARD_SERVICE_UUID_1 : string = "a7fe1050-e168-11e9-81b4-2a2ae2dbcce4";
   readonly SCOREBOARD_CHAR_RED_1 : string = "0000aaaa-0000-1000-8000-00805f9b34fb";
   readonly SCOREBOARD_CHAR_BLUE_1 : string = "0000bbbb-0000-1000-8000-00805f9b34fb";

  constructor(private ref: ChangeDetectorRef){
    console.log(ref);
  }

  ngOnInit(){}
  //Bluetooth logic
  connectBte(){
      navigator.bluetooth.requestDevice({

          filters :[{
            //TODO: Search for multiple names.
            name: this.SCOREBOARD_NAME_1
          }],
          optionalServices: [this.SCOREBOARD_SERVICE_UUID_1]
      })
      .then(device => {
        console.log("Connecting to " + device.name);
        this.onConnect(device.name);
        device.addEventListener('gattserverdisconnected',this.onDisconnected);
        return device.gatt.connect();
      })
      .then(server => {
        if(this.deviceName.localeCompare(this.SCOREBOARD_NAME_1)==0){
          return server.getPrimaryService(this.SCOREBOARD_SERVICE_UUID_1);
        }else{
          return null;
        }
      })
      .then(service =>{
        this.redScoreChar = service.getCharacteristic(this.SCOREBOARD_CHAR_RED_1);
        this.blueScoreChar = service.getCharacteristic(this.SCOREBOARD_CHAR_BLUE_1);
        this.onServiceConnect();
      })
      .catch(error => { console.log(error); });
  }

  writeToBlueChar(score : number){
    if(this.blueScoreChar!= null && this.connected ){
      this.blueScoreChar.then(char =>{
        let value = Uint8Array.of(score);
        char.writeValue(value);
      }).catch(error =>{
        console.log("Not connected to Service yet.")
      });
    }
  }

    writeToRedChar(score : number){
      if(this.redScoreChar!= null && this.connected){
        this.redScoreChar.then(char =>{
          let value = Uint8Array.of(score);
          char.writeValue(value);
        }).catch(error =>{
          console.log("Not connected to Service yet.")
        });
      }
  }

  onConnect(deviceName){

    this.deviceName=deviceName;

  }

  onServiceConnect(){
    this.connected=true;
    this.bteIcon.nativeElement.classList.remove('bte-disconnected');
    this.bteIcon.nativeElement.classList.add('bte-connected');
  }

  onDisconnected(event) {
    let device = event.target;
    console.log('Device ' + device.name + ' is disconnected.');

    this.connected = false;
    console.log(this.ref);
    this.ref.detectChanges();

    this.bteIcon.nativeElement.classList.add('bte-disconnected');
    this.bteIcon.nativeElement.classList.remove('bte-connected');
  }

  getServicesCharacteristic(characteristics){
    characteristics.forEach(characteristic =>{
      console.log(characteristic);
    });
  }

 //App logic
  incrementScore(value : number) : number{
   return value + 1;
 }

 decrementScore(value : number) : number{
   if(value <= 0){
     return 0;
   }
   return value - 1;
 }

 /* If the score is less than 10 prepend a "0" for design purposes"
 takes a number and returns a string. */
 prependZeroAndConvertToString(score : number) : string {
   if(score <= 9){
     return "0" + score;
   }
   return score + "";
 }

 blueScoreInc(){
   this.blueScore = this.incrementScore(this.blueScore);
   this.blueScoreText = this.prependZeroAndConvertToString(this.blueScore);

   this.writeToBlueChar(this.blueScore);
 }

 redScoreInc(){
   this.redScore = this.incrementScore(this.redScore);
   this.redScoreText = this.prependZeroAndConvertToString(this.redScore);

   this.writeToRedChar(this.redScore);
 }

 blueScoreDec(){
   this.blueScore = this.decrementScore(this.blueScore);
   this.blueScoreText = this.prependZeroAndConvertToString(this.blueScore);

   this.writeToBlueChar(this.blueScore);

 }

 redScoreDec(){
   this.redScore = this.decrementScore(this.redScore);
   this.redScoreText = this.prependZeroAndConvertToString(this.redScore);

   this.writeToRedChar(this.redScore);
 }

 swap(){
   this.swapped = !this.swapped;
 }

 resetScore(){
   if(confirm("Are you sure you want to reset the scores?")){
     this.redScore = 0;
     this.blueScore = 0;
     this.redScoreText = "00";
     this.blueScoreText = "00";

     this.writeToRedChar(this.redScore);
     this.writeToBlueChar(this.blueScore);
  }
 }
}
