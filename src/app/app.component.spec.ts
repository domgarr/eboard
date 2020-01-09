import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

let component : AppComponent;
let fixture : ComponentFixture<AppComponent>;
let compiled : any;
let app : any;

let redScoreText : HTMLElement;
let blueScoreText : HTMLElement;

let redScoreIncButton : HTMLElement;
let redScoreDecButton : HTMLElement;
let blueScoreIncButton : HTMLElement;
let blueScoreDecButton : HTMLElement;

let swappedButton : HTMLElement;
let resetButton : HTMLElement;


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    redScoreText = fixture.nativeElement.querySelector("#redScoreText");
    blueScoreText = fixture.nativeElement.querySelector("#blueScoreText");

    redScoreIncButton = fixture.nativeElement.querySelector("#redScoreIncButton");
    redScoreDecButton = fixture.nativeElement.querySelector("#redScoreDecButton");

    blueScoreIncButton = fixture.nativeElement.querySelector("#blueScoreIncButton");
    blueScoreDecButton = fixture.nativeElement.querySelector("#blueScoreDecButton");

    swappedButton = fixture.nativeElement.querySelector('#swappedButton');
    resetButton = fixture.nativeElement.querySelector('#resetButton');
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('On initialization RedScoreText should equal 00', ()=>{
    expect(redScoreText.textContent).toBe("00");
  });

  it('On initialization BlueScoreText should equal 00', ()=>{
    expect(blueScoreText.textContent).toBe("00");
  });

  it('function prependZero(1) should return a string value of "01" ', ()=>{
    let testString = app.prependZeroAndConvertToString(1);
    expect(testString).toBe("01");
  });

  it('function prependZero(10) should return a string value of "10" ', ()=>{
    let testString = app.prependZeroAndConvertToString(10);
    expect(testString).toBe("10");
  });

  it('function incrementScore(0) should return 1', ()=>{
    let mutatedScore = app.incrementScore(0);
    expect(mutatedScore).toBe(1);
  });

  it('function decrementScore(0) should return 0', ()=>{
    let mutatedScore = app.decrementScore(0);
    expect(mutatedScore).toBe(0);
  });

  it('function decrementScore(9) should return 8', ()=>{
    let mutatedScore = app.decrementScore(9);
    expect(mutatedScore).toBe(8);
  });

  it('Clicking the BlueScoreIncrement Button will increase the score from 00 to 01', ()=>{
    blueScoreIncButton.click();

    expect(app.blueScore).toBe(1);
    expect(app.blueScoreText).toBe("01");
  });

  it('Clicking the BlueScoreIncrement Button 10 times will increase the score from 00 to 10', ()=>{
    for(var i = 0; i < 10 ; i++){
      blueScoreIncButton.click();
    }

    expect(app.blueScore).toBe(10);
    expect(app.blueScoreText).toBe("10");
  });

  it('Clicking the RedScoreIncrement Button will increase the score from 00 to 01', ()=>{
    redScoreIncButton.click();

    expect(app.redScore).toBe(1);
    expect(app.redScoreText).toBe("01");
  });

  it('Clicking the RedScoreIncrement Button 10 times will increase the score from 00 to 10', ()=>{
    for(var i = 0; i < 10 ; i++){
      redScoreIncButton.click();
    }

    expect(app.redScore).toBe(10);
    expect(app.redScoreText).toBe("10");
  });

  it('Clicking the RedScoreDecrement Button will decrease the score from 00 to 00', ()=>{
    redScoreDecButton.click();

    expect(app.redScore).toBe(0);
    expect(app.redScoreText).toBe("00");
  });

  it('Clicking the RedScoreDecrement Button will decrease the score from 01 to 00', ()=>{
    redScoreIncButton.click();

    expect(app.redScore).toBe(1);
    expect(app.redScoreText).toBe("01");

    redScoreDecButton.click();

    expect(app.redScore).toBe(0);
    expect(app.redScoreText).toBe("00");
  });

  it('Clicking the RedScoreDecrement Button will decrease the score from 10 to 09', ()=>{
    for(var i = 0; i < 10 ; i++){
      redScoreIncButton.click();
    }

    expect(app.redScore).toBe(10);
    expect(app.redScoreText).toBe("10");

    redScoreDecButton.click();

    expect(app.redScore).toBe(9);
    expect(app.redScoreText).toBe("09");
  });

  it('Clicking the BlueScoreDecrement Button will decrease the score from 00 to 00', ()=>{
    blueScoreDecButton.click();

    expect(app.blueScore).toBe(0);
    expect(app.blueScoreText).toBe("00");
  });

  it('Clicking the BlueScoreDecrement Button will decrease the score from 01 to 00', ()=>{
    blueScoreIncButton.click();

    expect(app.blueScore).toBe(1);
    expect(app.blueScoreText).toBe("01");

    blueScoreDecButton.click();

    expect(app.blueScore).toBe(0);
    expect(app.blueScoreText).toBe("00");
  });

  it('Clicking the BlueScoreDecrement Button will decrease the score from 10 to 09', ()=>{
    for(var i = 0; i < 10 ; i++){
      blueScoreIncButton.click();
    }

    expect(app.blueScore).toBe(10);
    expect(app.blueScoreText).toBe("10");

    blueScoreDecButton.click();

    expect(app.blueScore).toBe(9);
    expect(app.blueScoreText).toBe("09");
  });

  it('Clicking swap will set the swapped from false to true', ()=>{
    swappedButton.click();
    expect(app.swapped).toBe(true);
  });

  it('Clicking swap twice will set the swapped from false to false', ()=>{
    swappedButton.click();
    swappedButton.click();
    expect(app.swapped).toBe(false);
  });

  it('Reset the scores back to zero. RedScore/Text should be 0/"00" and BlueScore/Text should be 0/"00"', ()=>{
    resetButton.click();

    expect(app.blueScore).toBe(0);
    expect(app.blueScoreText).toBe("00");
    expect(app.redScore).toBe(0);
    expect(app.redScoreText).toBe("00");
  });


});
