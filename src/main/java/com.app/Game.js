import Phaser from 'phaser';

config =  {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  
      scene: [
 
    ]
};

var game = new Phaser.Game(config)
