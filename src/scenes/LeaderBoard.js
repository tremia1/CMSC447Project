class LeaderBoard extends Phaser.Scene {
  constructor() {
      super({
          key: 'LeaderBoard'
      })
  }
  init(data) {
      // Feeds the key of the menu of where this scene was assess from
      this.location = data.location;
  }
  preload() {
      this.load.image('background', 'assets/images/background1.png');
      this.load.image('cursor', 'assets/images/cursor.png');
      this.load.image('wood', 'assets/images/wood.png');
      this.load.image('Back', 'assets/images/Back.png');
  }
  create() {
      // Creates Cursor and Spacebar input and Background
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.backgroundImage = this.add.image(0, 0, 'background');
      this.backgroundImage.displayHeight = this.sys.game.config.height;
      this.backgroundImage.displayWidth = this.sys.game.config.width;
      this.backgroundImage.scaleX = this.backgroundImage.scaleY
      this.backgroundImage.y = this.sys.game.config.height / 2;
      this.backgroundImage.x = this.sys.game.config.width / 2;
      // Creates the title and the button layout , Score panels,  for LeaderBoard
      this.title = this.add.text(this.sys.canvas.width / 2 - 100, 50, 'LeaderBoard', {
          fontSize: '32px',
          fill: '#FFFFFF'
      });
      this.title.fontWeight = 'bold';
      this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);
      this.NumberOne = this.add.image(this.sys.canvas.width / 2 - 130, 100, 'wood').setOrigin(0, 0);
      this.NumberOne.setScale(.03);
      //this.add.text(this.sys.canvas.width / 2 - 100, 130, '1. ', { fontSize: '32px', fill: '#000000' });
      this.NumberTwo = this.add.image(this.sys.canvas.width / 2 - 130, 200, 'wood').setOrigin(0, 0);
      this.NumberTwo.setScale(.03);
      //this.add.text(this.sys.canvas.width / 2 - 100, 230, '2. ', { fontSize: '32px', fill: '#000000' });
      this.NumberThree = this.add.image(this.sys.canvas.width / 2 - 130, 300, 'wood').setOrigin(0, 0);
      this.NumberThree.setScale(.03);
      //this.add.text(this.sys.canvas.width / 2 - 100, 330, '3.', { fontSize: '32px', fill: '#000000' });
      this.NumberFour = this.add.image(this.sys.canvas.width / 2 - 130, 400, 'wood').setOrigin(0, 0);
      this.NumberFour.setScale(.03);
      //this.add.text(this.sys.canvas.width / 2 - 100, 430, '4. ', { fontSize: '32px', fill: '#000000' });
      this.NumberFive = this.add.image(this.sys.canvas.width / 2 - 130, 500, 'wood').setOrigin(0, 0);
      this.NumberFive.setScale(.03);
      //this.add.text(this.sys.canvas.width / 2 - 100,530, '5. ', { fontSize: '32px', fill: '#000000' });
      //Creates Back Buttton
      this.Back = this.add.image(0, this.sys.game.config.height / 2 + 150, 'Back').setOrigin(0, 0);
      this.Back.setScale(.3);
      var soundManager = this.scene.get('StartMenu').sound;
      // set selected sound
      this.clickedSound = soundManager.get('clickedSound') || this.sound.add('clickedSound', {
          loop: false
      })
      // set cursor moving music
      this.navSound = soundManager.get('navigateSound') || this.sound.add('navigateSound', {
          loop: false
      })
      // Fetch the leaderboard and update the UI
      fetch('/api/leaderboard')
          .then(response => response.json())
          .then(scores => {
              // Update the text of the score panels
              this.addScores(scores);
          })
          .catch(error => {
              console.error(error);
          });
  }
  update() {
      // Goes back to the previous scene determine by Location
      if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
          this.clickedSound.play()
          this.scene.start(this.location);
      }
  }
  addScores(scores) {
      // Update the text of the score panels
      for (let i = 0; i < scores.length; i++) {
          const score = scores[i];
          const text = `${i + 1}. ${score.name}: ${score.score}`;
          switch (i) {
              case 0:
                  this.NumberOneText = this.add.text(this.sys.canvas.width / 2, 130, text, {
                      fontSize: '26px',
                      fill: '#000000',
                      fixedHeight: 68,
                      fixedWidth: 230
                  });
                  this.NumberOneText.setOrigin(0.5, 0);
                  break;
              case 1:
                  this.NumberTwoText = this.add.text(this.sys.canvas.width / 2, 230, text, {
                      fontSize: '26px',
                      fill: '#000000',
                      fixedHeight: 68,
                      fixedWidth: 230
                  });
                  this.NumberTwoText.setOrigin(0.5, 0);
                  break;
              case 2:
                  this.NumberThreeText = this.add.text(this.sys.canvas.width / 2, 330, text, {
                      fontSize: '26px',
                      fill: '#000000',
                      fixedHeight: 68,
                      fixedWidth: 230
                  });
                  this.NumberThreeText.setOrigin(0.5, 0);
                  break;
              case 3:
                  this.NumberFourText = this.add.text(this.sys.canvas.width / 2, 430, text, {
                      fontSize: '26px',
                      fill: '#000000',
                      fixedHeight: 68,
                      fixedWidth: 230
                  });
                  this.NumberFourText.setOrigin(0.5, 0);
                  break;
              case 4:
                  this.NumberFiveText = this.add.text(this.sys.canvas.width / 2, 530, text, {
                      fontSize: '26px',
                      fill: '#000000',
                      fixedHeight: 68,
                      fixedWidth: 230
                  });
                  this.NumberFiveText.setOrigin(0.5, 0);
                  break;
              default:
                  break;
          }
      }
  }
}
export default LeaderBoard;