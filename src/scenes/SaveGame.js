class SaveGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'SaveGame'
        })
    }
    init(data) {
        // Feeds the key of the menu of where this scene was assess from
        this.location = data.location;
        // Feeds the key of the level that needs to be saved
        this.level = data.level;
        // Feeds the key of the time that needs to be saved
        this.time = data.time;

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
        this.backgroundImage.scaleX = this.backgroundImage.scaleY;
        this.backgroundImage.y = this.sys.game.config.height / 2;
        this.backgroundImage.x = this.sys.game.config.width / 2;
        // Creates the title and the button layout for Saveing Games
        this.title = this.add.text(this.sys.canvas.width / 2 - 300, 60, 'The Adventures of Coco and Koko', {
            fontSize: '32px',
            fill: '#FFFFFF'
        });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);
        this.SaveOne = this.add.image(this.sys.canvas.width / 2 - 150, 100, 'wood').setOrigin(0, 0);
        this.SaveOne.setScale(.03);
        this.SaveTwo = this.add.image(this.sys.canvas.width / 2 - 150, 200, 'wood').setOrigin(0, 0);
        this.SaveTwo.setScale(.03);
        this.SaveThree = this.add.image(this.sys.canvas.width / 2 - 150, 300, 'wood').setOrigin(0, 0);
        this.SaveThree.setScale(.03);
        this.SaveFour = this.add.image(this.sys.canvas.width / 2 - 150, 400, 'wood').setOrigin(0, 0);
        this.SaveFour.setScale(.03);
        this.SaveFive = this.add.image(this.sys.canvas.width / 2 - 150, 500, 'wood').setOrigin(0, 0);
        this.SaveFive.setScale(.03);
        //Creates Back Buttton
        this.Back = this.add.image(0, this.sys.game.config.height / 2 + 150, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);
        // Creates the Selection Cursor 
        this.buttonSelector = this.add.image(this.sys.canvas.width / 2 + 60, 120, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)
        // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do

        this.saves;
        fetch('/api/saves')
            .then(response => response.json())
            .then(saves => {
                // Update the text of the score panels
                this.addSaves(saves);
            })
            .catch(error => {
                console.error(error);
            });
        this.Yaxis = 120;
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
                this.value = 4;
            }
            if (this.value == 0) {
                this.Yaxis = 120;
            } else if (this.value == 1) {
                this.Yaxis = 220;
            } else if (this.value == 2) {
                this.Yaxis = 320;
            } else if (this.value == 3) {
                this.Yaxis = 420;
            } else if (this.value == 4) {
                this.Yaxis = 520;
            }
            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 60, this.Yaxis);
        }
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.navSound.play()
            this.value = this.value + 1;
            if (this.value > 4) {
                this.value = 0;
            }
            if (this.value == 0) {
                this.Yaxis = 120;
            } else if (this.value == 1) {
                this.Yaxis = 220;
            } else if (this.value == 2) {
                this.Yaxis = 320;
            } else if (this.value == 3) {
                this.Yaxis = 420;
            } else if (this.value == 4) {
                this.Yaxis = 520;
            }
            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 60, this.Yaxis);
        }
        // Goes back to the previous scene determine by Location
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.clickedSound.play()
            this.scene.start(this.location);
        }
        // Save at chosen button using value 
        else if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.name = "User";

            if (this.level == 'Tutorial') {
                this.level = 0;
            }else if (this.level == 'Level1'){
                this.level = 1 
            }else if (this.level == 'Level2'){
                this.level = 2
            } else if (this.level == 'Level3'){
                this.level = 3
            }
            
            this.saveGame(this.name, this.level, this.time);
            this.clickedSound.play()
            fetch('/api/saves')
                .then(response => response.json())
                .then(saves => {
                    // Update the text of the score panels
                    this.addSaves(saves);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    async saveGame(name, level, time) {
        try {
            const response = await fetch(`/api/saves/${this.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name: name,
                    Time: time,
                    levels: level
                })

            });

            console.log(response.body)
            if (response.status !== 200) {
                throw new Error('Failed to send/update score to the database.');
            }
        } catch (error) {
            console.error('Error sending score to the database:', error)
        }

        // else if (this.saves == 0) {
        //     try {
        //         const response = await fetch(`/api/saves/insert`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 user_name: name,
        //                 level: level,
        //                 time: time
        //             })
        //         });
        //         console.log(response)
        //         if (response.status !== 200) {
        //             throw new Error('Failed to send score to the database.');
        //         }
        //         console.log('Score sent successfully.');
        //     } catch (error) {
        //         console.error('Error sending score to the database:', error);
        //     }
        // }


    }
    addSaves(Saves) {
        // Update the text of the score panels

        for (let i = 0; i < Saves.length; i++) {
            const Save = Saves[i];
            const text = `     LVL ${Save.levelNumber} | Time: ${Save.TimeScore}`
            switch (i) {
                case 0:
                    if(this.NumberOneText){
                        this.NumberOneText.destroy(true)
                    }

                    this.NumberOneText = this.add.text(this.sys.canvas.width / 2 - 30, 130, text, {
                        fontSize: '14px',
                        fill: '#000000',
                        fixedHeight: 68,
                        fixedWidth: 230
                    });
                    this.NumberOneText.setOrigin(0.5, 0);
                    break;
                case 1:
                    if(this.NumberTwoText){
                        this.NumberTwoText.destroy(true)
                    }
                    this.NumberTwoText = this.add.text(this.sys.canvas.width / 2 - 30, 230, text, {
                        fontSize: '14px',
                        fill: '#000000',
                        fixedHeight: 68,
                        fixedWidth: 230
                    });
                    this.NumberTwoText.setOrigin(0.5, 0);
                    break;
                case 2:
                    if(this.NumberThreeText){
                        this.NumberThreeText.destroy(true)
                    }
                    this.NumberThreeText = this.add.text(this.sys.canvas.width / 2 - 30, 330, text, {
                        fontSize: '14px',
                        fill: '#000000',
                        fixedHeight: 68,
                        fixedWidth: 230
                    });
                    this.NumberThreeText.setOrigin(0.5, 0);
                    break;
                case 3:
                    if(this.NumberFourText){
                        this.NumberFourText.destroy(true)
                    }
                    this.NumberFourText = this.add.text(this.sys.canvas.width / 2 - 30, 430, text, {
                        fontSize: '14px',
                        fill: '#000000',
                        fixedHeight: 68,
                        fixedWidth: 230
                    });
                    this.NumberFourText.setOrigin(0.5, 0);
                    break;
                case 4:
                    if(this.NumberFiveText){
                        this.NumberFiveText.destroy(true)
                    }
                    this.NumberFiveText = this.add.text(this.sys.canvas.width / 2 - 30, 530, text, {
                        fontSize: '14px',
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
export default SaveGame;