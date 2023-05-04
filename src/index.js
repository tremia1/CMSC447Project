import Turtorial from './scenes/Turtorial.js';
import StartMenu from './scenes/StartMenu.js';
import LoadGame from './scenes/LoadGame.js';
import LeaderBoard from './scenes/LeaderBoard.js';
import GameMenu from './scenes/GameMenu.js';
import QuitMenu from './scenes/QuitMenu.js';
import SaveGame from './scenes/SaveGame.js';


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



    scene:[StartMenu, Turtorial, GameMenu, LoadGame , LeaderBoard,  QuitMenu,SaveGame] 
};

const game = new Phaser.Game(config);
