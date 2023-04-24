import Turtorial from './scenes/Turtorial .js';

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



  scene: Turtorial 
};

const game = new Phaser.Game(config);
