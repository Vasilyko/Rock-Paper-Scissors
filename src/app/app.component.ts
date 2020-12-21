import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'RPS';
  userScore = 0;
  botScore = 0;
  userSelection: string ='';
  botSelection: string = '';
  action: string = '';
  status: string = '';
  compWeapons = [
    'rock',
    'paper',
    'scissors'
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
  }


  lose(user: string, comp: string) {
    this.botScore ++;
    this.userSelection = user;
    this.botSelection = comp;
    this.action = 'loses to';
    this.status = '. You lose!';
    this.clearField();
  }

  draw(user: string, comp: string) {
    this.userSelection = user;
    this.botSelection = comp;
    this.action = 'and';
    this.status = '. You draw!';
    this.clearField();
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

