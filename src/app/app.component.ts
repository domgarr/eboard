import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

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

  ngOnInit(){

  }


}
