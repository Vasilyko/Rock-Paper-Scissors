import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'RPS';
  highesthighscore = 0;
  userScore = 0;
  botScore = 0;
  highscore = 0;
  userSelection: string ='';
  botSelection: string = '';
  action: string = '';
  status: string = '';
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];
  winslogans = [
    'King!',
    'Congratulation',
    'You got it!',
    'YesSS!',
    'Anotherone',
    'Einer geht noch!',
    'Gib Ihm',
    'Good Job Dog'
  ];
  tieslogans = [
    'Das war knapp...',
    'Unentschieden ist nicht verloren',
    'Draw, aber nicht my life',
    'Versuchs doch mal mit Schere',
    'Hör auf solange du es noch kannst'
  ];
  loseslogans = [
    'Pech gehabt...',
    'Versuchs nochmal!',
    'Kann passieren',
    'Du bist scheisse',
    'sogar ein dummer Bot macht dich fertig',
    'ahahahah',

  ];

  userPick(userWeapon: string): void {
    this.userSelection = userWeapon;
    console.log( this.userSelection);
    setTimeout( () => {
      const randomNum = Math.floor(Math.random() * 3);
      this.botSelection = this.compWeapons[randomNum];
      console.log(this.botSelection);
      this.checkResult();
    }, 1000);
  }

  clearField() {
    setTimeout(() => {
      this.status = '';
      this.userSelection = '';
      this.botSelection = '';
    }, 1500);
  }

  win(user: string, comp: string) {
    this.userScore ++;
    this.userSelection = user;
    this.botSelection = comp;
    this.action = 'beats';
    this.status = '. You win!';
    this.clearField();
    this.highscore ++;
    const randomNum = Math.floor(Math.random() * 7);
    Swal.fire(
      'Gewonnen ;)',
      this.winslogans[randomNum],
      'success'
    )
  }


  lose(user: string, comp: string) {
    this.botScore ++;
    this.userSelection = user;
    this.botSelection = comp;
    this.action = 'loses to';
    this.status = '. You lose!';
    this.clearField();
    this.highscore = 0;
    this.newHighscore();
    const randomNum = Math.floor(Math.random() * 7);
    Swal.fire(
      'Verloren :/',
      this.tieslogans[randomNum],
      'error'
    )
  }

  draw(user: string, comp: string) {
    this.userSelection = user;
    this.botSelection = comp;
    this.action = 'and';
    this.status = '. You draw!';
    this.clearField();
    const randomNum = Math.floor(Math.random() * 7);
    Swal.fire(
      'Draw',
      this.loseslogans[randomNum],
      'warning'
    )
  }

  newHighscore() {
    
    if (this.highscore > this.highesthighscore) {
      this.highesthighscore = this.highscore;
    }
  }
  checkResult() {
    const userChoice = this.userSelection;
    const compChoice = this.botSelection;
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
        this.draw(userChoice, compChoice);
        break;
    }
  }
}

