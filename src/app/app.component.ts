import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

//https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild("bteConnectButton", {static:false}) bteButton : ElementRef;

  private swapped : boolean = false;

  private redScoreText : string = "00";
  private blueScoreText : string = "00";

  private redScore : number = 0;
  private blueScore : number = 0;

  constructor(){
  }

  ngOnInit(){

  }

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
  }

  redScoreInc(){
    this.redScore = this.incrementScore(this.redScore);
    this.redScoreText = this.prependZeroAndConvertToString(this.redScore);
  }

  blueScoreDec(){
    this.blueScore = this.decrementScore(this.blueScore);
    this.blueScoreText = this.prependZeroAndConvertToString(this.blueScore);
  }

  redScoreDec(){
    this.redScore = this.decrementScore(this.redScore);
    this.redScoreText = this.prependZeroAndConvertToString(this.redScore);
  }

  swap(){
    this.swapped = !this.swapped;
  }

  resetScore(){
    this.redScore = 0;
    this.blueScore = 0;
    this.redScoreText = "00";
    this.blueScoreText = "00";
  }


}
