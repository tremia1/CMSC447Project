class QuitMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Quit'
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
        // Creates the title and the button layout for Quit Menu
        this.title = this.add.text(this.sys.canvas.width / 2 - 95, 100, 'Quit Game ?', {
            fontSize: '32px',
            fill: '#FFFFFF'
        });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);
        this.Yes = this.add.image(this.sys.canvas.width / 2 - 130, 250, 'wood').setOrigin(0, 0);
        this.Yes.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 50, 270, 'Yes', {
            fontSize: '32px',
            fill: '#000000'
        });
        this.No = this.add.image(this.sys.canvas.width / 2 - 130, 350, 'wood').setOrigin(0, 0);
        this.No.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 50, 370, 'No', {
            fontSize: '32px',
            fill: '#000000'
        });
        this.Save = this.add.image(this.sys.canvas.width / 2 - 130, 450, 'wood').setOrigin(0, 0);
        this.Save.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 470, 'Save Game', {
            fontSize: '32px',
            fill: '#000000'
        });
        //Creates Back Buttton
        this.Back = this.add.image(100, 630, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);
        // Creates the Selection Cursor 
        this.buttonSelector = this.add.image(this.sys.canvas.width / 2 + 60, 270, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)
        // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do
        this.Yaxis = 270;
        this.value = 0;
        var soundManager = this.scene.get('StartMenu').sound;
        // set selected sound
        this.clickedSound = soundManager.get('clickedSound') || this.sound.add('clickedSound', {
            loop: false
        })
        // set cursor moving music
        this.navSound = soundManager.get('navigateSound') || this.sound.add('navigateSound', {
            loop: false
        })
    }
    update() {
        // Makes the selection cursor goes  up from each button and when it reach top button it loop back to bottom one
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.navSound.play()
            this.value = this.value - 1;
            if (this.value < 0) {
                this.value = 2;
            }
            if (this.value == 0) {
                this.Yaxis = 270;
            } else if (this.value == 1) {
                this.Yaxis = 370;
            } else if (this.value == 2) {
                this.Yaxis = 470;
            }
            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 60, this.Yaxis);
        }
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.navSound.play()
            this.value = this.value + 1;
            if (this.value > 2) {
                this.value = 0;
            }
            if (this.value == 0) {
                this.Yaxis = 270;
            } else if (this.value == 1) {
                this.Yaxis = 370;
            } else if (this.value == 2) {
                this.Yaxis = 470;
            }
            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 60, this.Yaxis);
        }
        // Goes back to the previous scene determine by Location
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.clickedSound.play()
            this.scene.start(this.location);
        }
        // Does action said by Button Selected
        else if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.clickedSound.play()
            if (this.value == 0) {
                // Stop any previously playing levels 
                this.scene.stop('Tutorial')
                this.scene.stop('Level1')
                this.scene.stop('Level2')
                this.scene.stop('Level3')
                this.scene.start('StartMenu');
            } else if (this.value == 1) {
                this.scene.start('GameMenu', {
                    "location": this.location
                });
            } else if (this.value == 2) {
                this.scene.start('SaveGame', {
                    "location": 'Quit'
                });
            }
        }
    }
}
export default QuitMenu;