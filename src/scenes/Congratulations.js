//Takes in the scores from level 3
//Ask users for their name (This will be done throught html)
//Go to leader board
//Add name and score to database
class Congratulations extends Phaser.Scene {
    constructor() {
        super('Congratulations');
    }
    init(data) {
        this.score = data.Time; //The time sent from level3
    }
    preload() {
        this.load.image('finish', 'assets/images/finished.png')
        this.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', {
            frameWidth: 50,
            frameHeight: 40
        });
        this.load.spritesheet('CatIdle', 'assets/images/Cat/Cat-Idle.png', {
            frameWidth: 15,
            frameHeight: 15
        });
    }
    create() {
        //this.nameInput = this.add.dom(100,100,'input-name').createFromCache('form');
        this.finishImage = this.add.image(0, 0, 'finish');
        this.finishImage.displayHeight = this.sys.game.config.height;
        this.finishImage.displayWidth = this.sys.game.config.width;
        this.finishImage.scaleX = this.finishImage.scaleY
        this.finishImage.y = this.sys.game.config.height / 2;
        this.finishImage.x = this.sys.game.config.width / 2;
        this.anims.create({
            key: 'catidle',
            frames: this.anims.generateFrameNumbers("CatIdle"),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'dogbark',
            frames: this.anims.generateFrameNumbers("DogBark"),
            frameRate: 8,
            repeat: -1,
        });
        this.cat = this.add.sprite(650, 525);
        this.cat.flipX = true
        this.cat.setScale(1.5) // make it bigger
        this.cat.play('catidle', true)
        this.dog = this.add.sprite(100, 525)
        this.dog.play('dogbark', true)
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Add texts
        this.text = this.add.text(200, 50, "Congratulations!", {
            color: 'white',
            fontFamily: 'strong',
            fontSize: '60px',
            fontStyle: 'bold'
        }).setShadow(2, 2, 'black', 2, false, true);
        this.text1 = this.add.text(215, 150, "You helped Coco and Koko escape\n from cobblestone forest!", {
            color: 'white',
            fontFaamily: 'strong',
            fontSize: '20px'
        }).setShadow(2, 2, 'black', 2, false, true)
        this.name = this.getName();
        //Thank users (the dog will say this it will bark)
        this.thankyoudog = this.add.text(125, 485, 'Thank you, --', {
            color: 'white',
            fontFamily: 'cursive',
            fontSize: '15px',
            backgroundColor: 'transparent',
            fontStyle: 'bold',
            strokeThickness: 2,
            stroke: 'black'
        }).setPadding(10, 10).setVisible(false)
        this.thankyoucat = this.add.text(520, 485, 'Thank you, --', {
            color: 'white',
            fontFamily: 'fantasy',
            fontSize: '15px',
            backgroundColor: 'transparent',
            fontStyle: 'bold',
            strokeThickness: 2,
            stroke: 'black'
        }).setPadding(10, 10).setVisible(false)
        this.thankyoudog.setText(`Thank you, ${this.name}! `);
        this.thankyoucat.setText(`Thank you, ${this.name}!`);
        this.thankyoucat.setVisible(true);
        this.thankyoudog.setVisible(true);
        this.leaderboardtext = this.add.text(250, 300, "Press Space to go to Leaderboard", {
            color: 'black',
            fontFamily: 'Arial',
            fontSize: '20px',
            backgroundColor: 'white'
        })
        var soundManager = this.scene.get('StartMenu').sound;
        // set selected sound
        this.clickedSound = soundManager.get('clickedSound') || this.sound.add('clickedSound', {
            loop: false
        })
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.clickedSound.play();
            this.scene.start('LeaderBoard', {
                'location': 'StartMenu'
            });
        }
    }
    getName() {
        var input = " ";
        while (input == " ") {
            input = prompt("Enter Your Name", " ");
        }
        //Call API to handle new score
     
        this.sendScoreToDatabase(input, this.score)
        return input;
    }
    async sendScoreToDatabase(name, score) {
        try {
            const response = await fetch('/api/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name, // Replace with the actual user's name
                    score: score
                })
            });
            if (response.status !== 200) {
                throw new Error('Failed to send score to the database.');
            }
            console.log('Score sent successfully.');
        } catch (error) {
            console.error('Error sending score to the database:', error);
        }
    }
}
export default Congratulations;