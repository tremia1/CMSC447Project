import Dog from '../../src/object/Dog.js';
import Cat from '../../src/object/Cat.js';
import Button from '../../src/object/Button.js';
import Block from '../../src/object/Block.js';
import Door from '../../src/object/Door.js';
import Wall from '../../src/object/Wall.js';
import Water from '../../src/object/Water.js';
import MovableWall from '../../src/object/MovableWall.js';
export default class test extends Phaser.Scene {
    constructor() {
        super("Level3");
    }
    init(data) {
        // Feeds the data to the levels
        this.gameRuntime = data.Time;
       
    }
    // async sendScoreToDatabase(score) {
    //     try {
    //         const response = await fetch('/api/leaderboard', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: 'User', // Replace with the actual user's name
    //                 score: score
    //             })
    //         });
    //         if (response.status !== 200) {
    //             throw new Error('Failed to send score to the database.');
    //         }
    //         console.log('Score sent successfully.');
    //     } catch (error) {
    //         console.error('Error sending score to the database:', error);
    //     }
    // }
    preload() {
        //Load images for tilemap
        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.image('bg', 'assets/images/background.png'); //Warning: image tile is not tile size multiple in: bakcground (doesnt affect anything)
        this.load.tilemapTiledJSON('level3', 'assets/tilemap/level3.json');
        //Load spritesheets for objects
        this.load.spritesheet('button-up', 'assets/images/ButtonUp.png', {
            frameWidth: 9,
            frameHeight: 6
        });
        this.load.spritesheet('box', 'assets/images/box.png', {
            frameWidth: 37,
            frameHeight: 37
        });
        this.load.spritesheet('button-down', 'assets/images/ButtonDown.png', {
            frameWidth: 9,
            frameHeight: 6
        });
        this.load.spritesheet('door-closed', 'assets/images/DoorClosed.png', {
            frameWidth: 73,
            frameHeight: 85
        });
        this.load.spritesheet('door-open', 'assets/images/DoorOpen.png', {
            frameWidth: 73,
            frameHeight: 85
        });
        this.load.spritesheet('door-animation', 'assets/images/DoorAnimation.png', {
            frameWidth: 73,
            frameHeight: 85
        });
        this.load.image('wallTile', 'assets/tileset/Tiles/tile042.png');
        this.load.image('movewallTile', 'assets/tileset/Tiles/tile042.png');
        this.load.image('waterTile', 'assets/tileset/Tiles/tile261.png');
        //Load Spritesheet for Dog
        this.load.spritesheet('DogIdle', 'assets/images/Dog/Dog-Idle.png', {
            frameWidth: 50,
            frameHeight: 40
        });
        this.load.spritesheet('DogWalk', 'assets/images/Dog/Dog-Walk.png', {
            frameWidth: 50,
            frameHeight: 40
        });
        this.load.spritesheet('DogJump', 'assets/images/Dog/Dog-Jump.png', {
            frameWidth: 50,
            frameHeight: 40
        });
        this.load.spritesheet('DogSniff', 'assets/images/Dog/Dog-Sniff.png', {
            frameWidth: 57,
            frameHeight: 66
        });
        this.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', {
            frameWidth: 50,
            frameHeight: 40
        });
        this.load.spritesheet('DogSniffAndWalk', 'assets/images/Dog/Dog-Sniff-Walk.png', {
            frameWidth: 50,
            frameHeight: 40
        });
        //Load spritesheets for Cat
        this.load.spritesheet('CatIdle', 'assets/images/Cat/Cat-Idle.png', {
            frameWidth: 15,
            frameHeight: 15
        });
        this.load.spritesheet('CatWalk', 'assets/images/Cat/Cat-Walk.png', {
            frameWidth: 15,
            frameHeight: 15
        }); //Have warning about frame 8 of this is missing
        this.load.spritesheet('CatJump', 'assets/images/Cat/Cat-Jump.png', {
            frameWidth: 15,
            frameHeight: 15
        });
        this.load.spritesheet('CatHiss', 'assets/images/Cat/Cat-Hiss.png', {
            frameWidth: 15,
            frameHeight: 15
        });
    }
    create() {
        //Creates map and adds layers to it
        this.map = this.make.tilemap({
            key: 'level3',
            tileHeight: 16,
            tileWidth: 16
        });
        this.tileset = this.map.addTilesetImage('Textures-16', 'tiles');
        this.backgroundImage = this.map.addTilesetImage('background', 'bg');
        this.background = this.map.createLayer('Background', this.backgroundImage);
        this.platforms = this.map.createLayer('Platform', this.tileset);
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        });
        //Sets the collision properties of all tiles in this layer to true
        this.platforms.setCollisionByProperty({
            collides: true
        });
        //Create movement keys for both Cat and Dog
        this.dogKeys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            bark: Phaser.Input.Keyboard.KeyCodes.B,
            sniff: Phaser.Input.Keyboard.KeyCodes.S,
        });
        this.catKeys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            hiss: Phaser.Input.Keyboard.KeyCodes.H,
        });
        //Create Dog Object
        this.map.getObjectLayer('Dog').objects.forEach((dog) => {
            //Create dog class
            this.dog = new Dog(this, this.dogKeys, dog.x, dog.y - dog.height - 100, 'dog');
            this.add.existing(this.dog.sprite);
            this.dog.sprite.setScale(0.75)
        });
        //Create Cat Object
        this.map.getObjectLayer('Cat').objects.forEach((cat) => {
            //Create cat class
            this.cat = new Cat(this, this.catKeys, cat.x, cat.y - 100, 'cat');
            this.add.existing(this.cat.sprite);
            this.cat.sprite.body.setSize(this.cat.sprite.width, this.cat.sprite.height); // fixes collisions
            this.cat.sprite.setScale(1.5) // make it bigger
            this.cat.sprite.setOffset(0, -2) // a little off the ground
        });
        //Create groups for wall, button, water, and block
        this.wallGroup = this.add.group({
            runChildUpdate: true //Runs the update() for all children in this group
        });
        this.buttonGroup = this.add.group({
            runChildUpdate: true
        });
        this.blockGroup = this.add.group({
            runChildUpdate: true
        });
        this.waterGroup = this.add.group({
            runChildUpdate: true
        });
        this.movableWallGroup = this.add.group({
            runChildUpdate: true
        });
        this.map.getObjectLayer('Block').objects.forEach((block) => {
            this.blockSprite = new Block({
                scene: this,
                x: block.x,
                y: block.y - block.height,
                status: false,
                cat: this.cat,
                dog: this.dog,
                button: this.buttonGroup,
                width: block.width,
                height: block.height
            });
            this.physics.add.collider(this.blockSprite, this.platforms);
            this.blockGroup.add(this.blockSprite, true);
        });
        //Create Button objects
        this.map.getObjectLayer('Button').objects.forEach((button) => {
            this.buttonSprite = new Button({
                scene: this,
                x: button.x,
                y: button.y,
                status: false,
                cat: this.cat,
                dog: this.dog,
                dur: button.properties[0].value,
                blocks: this.blockGroup,
            });
            this.buttonSprite.name = button.name;
            this.physics.add.collider(this.buttonSprite, this.platforms);
            this.buttonGroup.add(this.buttonSprite, true);
        });
        //Create Wall objects
        //They are invisible till button is pressed
        //Can change specific walls according to id
        this.map.getObjectLayer('Wall').objects.forEach((wall) => {
            //get the name of the button that this wall is associated with
        
            let buttonName = wall.properties[0].value;
            let buttonForWall;
            //find the button in the button group and pass it into wall class
            this.buttonGroup.getChildren().forEach(function(button) {
                if (button.name == buttonName) {
                    buttonForWall = button;
                }
            });
            this.wallSprite = new Wall({
                scene: this,
                x: wall.x,
                y: wall.y,
                visible: false,
                cat: this.cat,
                dog: this.dog,
                name: wall.name,
                button: buttonForWall,
                width: wall.width,
                height: wall.height,
                blocks: this.blockGroup,
            });
            this.physics.add.collider(this.wallSprite, this.platforms);
            this.wallGroup.add(this.wallSprite);
        });
        //Create Wall objects that are visible at first and then disappears when button is pressed
        this.map.getObjectLayer('Movable walls').objects.forEach((mwall) => {
            //get the name of the button that this wall is associated with
            let buttonName = mwall.properties[0].value;
            let buttonForWall;
            //find the button in the button group and pass it into wall class
            this.buttonGroup.getChildren().forEach(function(button) {
                if (button.name == buttonName) {
                    buttonForWall = button;
                }
            });
            this.mwallSprite = new MovableWall({
                scene: this,
                x: mwall.x,
                y: mwall.y,
                visible: true,
                cat: this.cat,
                dog: this.dog,
                name: mwall.name,
                button: buttonForWall,
                width: mwall.width,
                height: mwall.height,
                blocks: this.blockGroup,
            });
            this.physics.add.collider(this.mwallSprite, this.platforms);
            this.movableWallGroup.add(this.mwallSprite);
        });
        //Create Water objects
        this.map.getObjectLayer('Water').objects.forEach((water) => {
            this.waterSprite = new Water({
                scene: this,
                x: water.x,
                y: water.y - water.height,
                cat: this.cat,
                dog: this.dog,
                width: water.width,
                height: water.height
            });
            this.physics.add.collider(this.waterSprite, this.platforms);
            this.waterGroup.add(this.waterSprite);
        });
        // //Create Block objects
        //Create Door object
        this.doorObject = this.map.getObjectLayer('Door').objects[0];
        this.door = new Door({
            scene: this,
            x: this.doorObject.x - 20,
            y: this.doorObject.y - 20,
            status: false,
            cat: this.cat,
            dog: this.dog,
            button: this.buttonGroup.getChildren().find(v => v.name === 'button2')
        });
        this.physics.add.collider(this.door, this.platforms);
        this.physics.add.collider(this.dog.sprite, this.platforms, this.dog.onCollide, null, this);
        this.physics.add.collider(this.cat.sprite, this.platforms, this.cat.onCollide);
        this.physics.add.collider(this.cat.sprite, this.dog.sprite);
        this.physics.add.collider(this.blockGroup, this.blockGroup);
        this.timeText = this.add.text(50, 30, 'Time :', {
            fontSize: '32px',
            fill: '#FFFFFF'
        });
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        // Stop Menu Music
        var soundManager = this.scene.get('StartMenu').sound;
        var soundObject = soundManager.get('backgroundMusic');
        soundObject.stop()
        // Create Music 
        var soundManager = this.scene.get('Tutorial').sound;
        // set selected sound
        this.gameMusic = soundManager.get('inGameSound') || this.sound.add('inGameSound', {
            loop: true
        })
        if (!this.gameMusic.isPlaying) {
            this.gameMusic.play()
        }
    }
 
    update(dt) {
        this.dog.update(dt);
        this.cat.update(dt);
        this.door.update();
        this.physics.add.collider(this.blockGroup, this.blockGroup);
        this.minutes = Math.floor(this.gameRuntime / 60);
        this.seconds = this.gameRuntime - (this.minutes * 60);
        //Check to see if button was pressed, if pressed, set wall to visible and add physic collider
        //Probably call a function to do this once
        this.timeText.setText("Time : " + this.minutes + " Minutes " + Math.round(this.seconds) + " Seconds");
        if (Phaser.Input.Keyboard.JustDown(this.esc)) {
            this.scene.pause();
            this.scene.launch('GameMenu', {
                "location": 'Level3',
                "time": this.gameRuntime
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.restart)){
            this.scene.start(this.scene.key, {Time: (this.gameRuntime + 3)})
        }
        if (this.levelComplete == 1) {
            this.levelComplete = 0;
            this.scene.start('Congratulations', {
                "location": 'Level3',
                "Time": this.gameRuntime
            });
        }
    }
    goNextLevel() {
        this.levelComplete = 1;
        // this.sendScoreToDatabase(this.gameRuntime);
    }
    updateTime() {
        this.gameRuntime += 1;
    }
}