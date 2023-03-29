//import Phaser from 'phaser';

var config =  {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  
      scene: [test]
};

var game = new Phaser.Game(config)
