import gameScene from './game.js';
import StartMenu from './scenes/StartMenu.js';

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



  scene: StartMenu
};

const game = new Phaser.Game(config);
