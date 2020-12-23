import { Component } from '@angular/core';
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
  loseslogans = [];
  winslogans = [];
  drawslogans = [
    'Versuch es doch nocheinmal'
  ];

userPick(userWeapon: string): void {
  this.userSelected = userWeapon;
  console.log( this.userSelected);
  setTimeout( () => {
    const randomNum = Math.floor(Math.random() * 3);
    this.compSelected = this.compWeapons[randomNum];
    console.log(this.compSelected);
    this.checkResult();
  }, 1000);
}

clearField() {
  setTimeout(() => {
    this.status = '';
    this.userSelected = '';
    this.compSelected = '';
  }, 1500);
}

win(user: string, bot: string) {
  this.userScore ++;
  this.userSelected = user;
  this.compSelected = bot;
  this.action = 'beats';
  this.status = '. You win!';
  this.clearField();
}


lose(user: string, comp: string) {
  this.compScore ++;
  this.userSelected = user;
  this.compSelected = comp;
  this.action = 'loses to';
  this.status = '. You lose!';
  this.clearField();
}

draw(user: string, comp: string) {
  this.userSelected = user;
  this.compSelected = comp;
  this.action = 'and';
  this.status = '. You draw!';
  this.clearField();
  Swal.fire('Any fool can use a computer')
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

}

}