import { Component, ViewChild, ElementRef, OnInit, NgAfterViewInit } from '@angular/core';

//https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild("bteConnectButton", {static:false}) bteButton : ElementRef;
  
  constructor(){
  }

  ngAfterViewInit(){
    //TODO: Add OrangeScoreboard to this list.
    this.bteButton.nativeElement.addEventListener('pointerup', function(event) {
      navigator.bluetooth.requestDevice({
        filters: [{
          name: 'Green Scoreboard'
        }]
      })
      .then(device => { /* ... */ })
      .catch(error => { console.log(error); });
    });
    
  }
}
