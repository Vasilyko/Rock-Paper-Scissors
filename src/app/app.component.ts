import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RPS';
  userScore = 0;
  compScore = 0;
  userSelected!: string;
  compSelected!: string;
  action!: string;
  status!: string;
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];
  loseslogans = [
    'Guter Dienst bleibt unverloren.',
    'Jedes Ding hat seine Zeit.',
    'Wer kämpft, kann verlieren, wer nicht kämpft, hat schon verloren.',
    'Wo viel verloren wird, ist manches zu gewinnen.',
    'Gewinnen kann, wer viel verloren, schnell.'
  ];
  winslogans = [
    'Seid im Sieg nicht überheblich!',
    'Seid im Sieg nicht überheblich!',
    'Der größte Sieg ist immer der nächste.',
    'Nicht jeder Sieg ist auch ein Gewinn.',
    'Der Sieg ist bei den Überwundnen.',
    'Siegen ist schön, doch der wahre Genuss liegt im Trösten der Verlierer.',
    'Große Siege werden nicht ohne Risiko errungen.',
    'Nur durch Kampf gewinnt man Siege',
    'Siegestrunkene werden leicht süchtig.',
    'Trotze, so bleibt dir der Sieg.',
    'Man soll die Beute nicht vor dem Sieg teilen.',
    'Es ist leicht, einen Sieg zu erkämpfen, doch schwer, ihn zu bewahren.',
    'Man soll die Beute nicht vor dem Sieg teilen.'
  ];
  drawslogans = [
    'Versuch es doch nocheinmal',
    'Zumindest nicht verloren',
    'Bemühe dich bisschen mehr!',
    'Wer mit einem starken Gedanken spielt, kann oft schon mit einem Unentschieden sehr zufrieden sein.',
    'Auch ein unentschieden ist ein Sieg, weil man nicht verloren hat'
  ];

  anzSpiele = 0;
  anzSiege = 0;
  schere =0;
  stein = 0;
  papier = 0;
  favoriteItem = "";

userPick(userWeapon: string): void {
  this.userSelected = userWeapon;
  console.log('User:' + this.userSelected);
  setTimeout( () => {
    const randomNum = Math.floor(Math.random() * 3);
    this.compSelected = this.compWeapons[randomNum];
    console.log('BOT:' + this.compSelected);
    this.checkResult();
  }, 1000);
}

clearField() {
  setTimeout(() => {
    this.status = '';
    this.userSelected = '';
    this.compSelected = '';
  }, 500);
}

win(user: string, bot: string) {
  this.userScore ++;
  this.userSelected = user;
  this.compSelected = bot;
  this.action = 'beats';
  this.status = '. You win!';
  this.clearField();
  const randomNum = Math.floor(Math.random() * 12);
  Swal.fire(
    {
      title: "Gewonnen",
      text: this.winslogans[randomNum],
      padding: '3em',
      timer: 5000,
      backdrop: `
        rgba(77, 219, 0, 0.78)
        url("https://media.giphy.com/media/cQNRp4QA8z7B6/giphy.gif")
        top
        no-repeat
      `
    }
    )
}
lose(user: string, comp: string) {
  this.compScore ++;
  this.userSelected = user;
  this.compSelected = comp;
  this.action = 'loses to';
  this.status = '. You lose!';
  this.clearField();
  const randomNum = Math.floor(Math.random() * 5);
  Swal.fire(
    {
      title: "Verloren",
      text:this.loseslogans[randomNum], 
      padding: '3em',
      timer: 5000,
      backdrop: `
        rgba(360,100,46,0.59)
        url("../assets/tenor.gif")
        top
        no-repeat
      `
    }
    )
}

draw(user: string, comp: string) {
  this.userSelected = user;
  this.compSelected = comp;
  this.action = 'and';
  this.status = '. You draw!';
  this.clearField();
  const randomNum = Math.floor(Math.random() * 5);
  Swal.fire(
  {
    title: "Unentschieden",
    text: this.drawslogans[randomNum],
    padding: '3em',
    timer: 5000,
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://media.giphy.com/media/xT0GqssRweIhlz209i/source.gif")
      top
      no-repeat
    `
  }
  )
}

setCookie() {
  this.anzSpiele++;
  if (this.userSelected == 'paper')
   {
     this.papier++;  
  }
  else if(this.userSelected == 'scissors'){
this.schere++;
  }
  else{
this.stein++;
  }
  
  document.cookie = "Anzahl Spiele:  " + this.anzSpiele + "Lieblings-Item:  " + this.favoriteItem;
}

  checkForFavoriteItem() {
if(this.papier >= this.stein){
 this.favoriteItem = "paper";
  }

else if(this.schere >= this.stein)
{
  this.favoriteItem = "scissors";
}
else{
  this.favoriteItem = "rock"
}
this.setCookie()
  }
checkResult() {
  const userChoice = this.userSelected;
  const compChoice = this.compSelected;
  switch (userChoice + compChoice) {
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      this.win(userChoice, compChoice);
      break;
    case 'rockpaper':
    case 'scissorsrock':
    case 'paperscissors':
      this.lose(userChoice, compChoice);
      break;
    default:
      this.draw(this.userSelected, compChoice);
      break;
  }
  this.checkForFavoriteItem();
}

}