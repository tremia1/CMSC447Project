
import Tutorial from './scenes/Tutorial.js';
import Level1 from './scenes/Level1.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';
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
  width: 800,
  height: 600,
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
    


    scene:[GameMenu]
     //scene:[StartMenu,  Tutorial, Level1, Level2, Level3, GameMenu, LoadGame , LeaderBoard,  QuitMenu,SaveGame] 
};

const game = new Phaser.Game(config);

