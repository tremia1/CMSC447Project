import Dog from '../../src/object/Dog.js';
import Cat from '../../src/object/Cat.js';
import Button from '../../src/object/Button.js';
import Block from '../../src/object/Block.js';
import Door from '../../src/object/Door.js';

class Turtorial extends Phaser.Scene {

    constructor()
	{
        super({ key: 'Turtorial'})

	}
    preload() {
        this.load.image('background', 'assets/images/background.png');

        this.load.spritesheet('button-up', 'assets/images/ButtonUp.png', { frameWidth: 9, frameHeight: 6});
        this.load.spritesheet('box', 'assets/images/box.png', { frameWidth: 37, frameHeight: 37});
        this.load.spritesheet('button-down', 'assets/images/ButtonDown.png', { frameWidth: 9, frameHeight: 6});

        this.load.spritesheet('door-closed', 'assets/images/DoorClosed.png', { frameWidth: 73, frameHeight: 85});
        this.load.spritesheet('door-open', 'assets/images/DoorOpen.png', { frameWidth: 73, frameHeight: 85});
        this.load.spritesheet('door-animation', 'assets/images/DoorAnimation.png', { frameWidth: 73, frameHeight: 85 });

        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.image('bg', 'assets/images/background.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/tutorial.json');


        //Load Spritesheet for dog
        this.load.spritesheet('DogIdle', 'assets/images/Dog/Dog-Idle.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogWalk', 'assets/images/Dog/Dog-Walk.png', { frameWidth: 50, frameHeight: 40});
        this.load.spritesheet('DogJump', 'assets/images/Dog/Dog-Jump.png', { frameWidth: 50, frameHeight: 40});
        this.load.spritesheet('DogSniff', 'assets/images/Dog/Dog-Sniff.png', { frameWidth: 57, frameHeight: 66 });
        this.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', { frameWidth: 50, frameHeight: 40});
        this.load.spritesheet('DogSniffAndWalk', 'assets/images/Dog/Dog-Sniff-Walk.png', { frameWidth: 50, frameHeight: 40});
        // load spritesheet for cat
        this.load.spritesheet('CatIdle', 'assets/images/Cat/Cat-Idle.png', { frameWidth: 15, frameHeight: 15});
        this.load.spritesheet('CatWalk', 'assets/images/Cat/Cat-Walk.png', { frameWidth: 15, frameHeight: 15});
        this.load.spritesheet('CatJump', 'assets/images/Cat/Cat-Jump.png', { frameWidth: 15, frameHeight: 15});
        this.load.spritesheet('CatHiss', 'assets/images/Cat/Cat-Hiss.png', { frameWidth: 15, frameHeight: 15});


    }
    create() {
 
        //Create tilemap and all the layers for it
        //Add debug for any physics errors (remove later)
        const map = this.make.tilemap({ key: 'map'});

        const tileset = map.addTilesetImage('Textures-16', 'tiles');
        const backgroundImage = map.addTilesetImage('background', 'bg')
        const background = map.createLayer('Tile Layer 2', backgroundImage);
        const platforms = map.createLayer('Tile Layer 1', tileset);
        
        platforms.displayHeight = this.sys.canvas.height;
        platforms.displayWidth = this.sys.canvas.width;
     
        background.displayHeight = this.sys.canvas.height;
        background.displayWidth = this.sys.canvas.width;
        
        platforms.setCollisionByProperty({ collides: true });

       // Set up player input controls

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

        

            
        //Create dog class
        this.dog = new Dog(this, this.dogKeys, 800, 200, 'dog');
        this.add.existing(this.dog.sprite);
        this.dog.sprite.setScale(1.2)

        //Create cat class
        this.cat = new Cat(this, this.catKeys, 800, 200, 'cat');
        this.add.existing(this.cat.sprite);
        this.cat.sprite.body.setSize(this.cat.sprite.width, this.cat.sprite.height); // fixes collisions
        this.cat.sprite.setScale(1.8) // make it bigger
        this.cat.sprite.setOffset(0, -2) // a little off the ground

        //Create groups for button, block and water
        this.buttonGroup = this.add.group();
        this.blockGroup = this.add.group();
        this.waterGroup = this.add.group();

        //Create button class and set it as tilemap object

        /*
        map.getObjectLayer('Button').objects.forEach((button) => {
            const buttonObject = new Button({
                scene: this,
                x: button.x,
                y: button.y,
                status: false,
                cat: this.cat,
                dog: this.dog
            });

            this.buttonGroup.add(buttonObject);
        });
            buttonObject.body.setSize(25,25);
            this.buttonGroup.add(buttonObject);
        });
        */
        
        this.buttonOne = new Button({
            scene: this,
            x: 650,
            y: 200,
            status: false,
            cat: this.cat,
            dog: this.dog,
            dur: 200
        });

        this.blockOne = new Block({
            scene: this,
            x: 725,
            y: 400,
            status: false,
            cat: this.cat,
            dog: this.dog
        });

        this.DoorOne = new Door({
            scene: this,
            x: 300,
            y: 500,
            status: false,
            cat: this.cat,
            dog: this.dog,
            button: this.buttonOne
        });

        //this.add.existing(this.ButtonOne.sprite);
        //this.ButtonOne.immovable = true;
        //this.ButtonOne.body.moves = false;
        

        this.physics.add.collider(this.dog.sprite, platforms, this.dog.onCollide, null, this);
        this.physics.add.collider(this.cat.sprite, platforms, this.cat.onCollide);
        this.physics.add.collider(this.cat.sprite, this.dog.sprite);
        this.physics.add.collider(this.buttonOne.sprite, platforms);
        this.physics.add.collider(this.blockOne, platforms);
        this.physics.add.collider(this.DoorOne, platforms);
        this.physics.add.overlap(this.blockOne, this.buttonOne);
        
        this.timeText =  this.add.text(50, 30, 'Time :', { fontSize: '32px', fill: '#FFFFFF' });
        this.esc= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        

    }
    update(time) {

        this.dog.update(this.keys);
        this.cat.update(this.cursors);

        this.buttonOne.update();
        this.blockOne.update();
        this.DoorOne.update();
        
        this.gameRuntime = time * 0.001;

        this.minutes = Math.floor(this.gameRuntime / 60);
  
        this.seconds = this.gameRuntime - (this.minutes * 60);


        this.timeText.setText("Time : " + this.minutes  + " Minutes " +  Math.round(this.seconds)  + " Seconds");

        if (Phaser.Input.Keyboard.JustDown(this.esc)){
            this.scene.start('GameMenu',{ "location": 'Tutorial'});
        }

        //Update button grou
        /*
        this.buttonGroup.children.entries.forEach((sprite) => {
            sprite.update();
        });
        */
    }
  
} export default Turtorial ;  
