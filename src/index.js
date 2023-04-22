import gameScene from './game.js';
import StartMenu from './scenes/StartMenu.js';
import LoadGame from './scenes/LoadGame.js';
import LeaderBoard from './scenes/LeaderBoard.js';


const config = {
  type: Phaser.AUTO,
  width: 800,
    height: 600,

  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
    },
    transparent: true,



  scene:[ StartMenu, gameScene,LoadGame , LeaderBoard] 
};

const game = new Phaser.Game(config);
