
import Turtorial from './scenes/Turtorial.js';
import StartMenu from './scenes/StartMenu.js';
import LoadGame from './scenes/LoadGame.js';
import LeaderBoard from './scenes/LeaderBoard.js';
import GameMenu from './scenes/GameMenu.js';
import QuitMenu from './scenes/QuitMenu.js';
import SaveGame from './scenes/SaveGame.js';
import test from './scenes/test.js'

/* Game Scene*/
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    }
  },
    transparent: true,
    parent: 'game',
    backgroundColor: '#000000',
    


    scene: [test]
    // scene:[StartMenu,  Turtorial, GameMenu, LoadGame , LeaderBoard,  QuitMenu,SaveGame] 
};

const game = new Phaser.Game(config);

