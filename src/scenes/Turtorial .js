import Dog from '../object/Dog.js';
import Cat from '../object/Cat.js';
import Button from '../object/Button.js';

class Turtorial extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        
        this.load.spritesheet('button-up', 'assets/images/Button1.png', { frameWidth: 9, frameHeight: 6});
        this.load.spritesheet('button-down', 'assets/images/ButtonTwo.png', { frameWidth: 9, frameHeight: 6});

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

        this.load.spritesheet('CatIdle', 'assets/images/Cat/Cat-Idle.png', { frameWidth: 15, frameHeight: 15});
        this.load.spritesheet('CatWalk', 'assets/images/Cat/Cat-Walk.png', { frameWidth: 15, frameHeight: 15});
        this.load.spritesheet('CatJump', 'assets/images/Cat/Cat-Jump.png', { frameWidth: 15, frameHeight: 15});

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
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            bark: Phaser.Input.Keyboard.KeyCodes.B,
            sniff: Phaser.Input.Keyboard.KeyCodes.S,
        });

              
        //Create dog class
        this.dog = new Dog(this, this.keys, 800, 200, 'dog');
        this.add.existing(this.dog.sprite);
        this.dog.sprite.setOrigin(.5, .5)
        this.dog.sprite.setScale(1.5)

        //Create cat class
        this.cat = new Cat(this, this.cursors, 800, 200, 'cat');
        this.add.existing(this.cat.sprite);
        this.cat.sprite.body.setSize(this.cat.sprite.width, this.cat.sprite.height); // fixes collisions
        this.cat.sprite.setScale(3) // make it bigger
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
        
        this.ButtonOne = new Button({
            scene: this,
            x: 750,
            y: 200,
            status: false,
            cat: this.cat,
            dog: this.dog
        });

        this.add.existing(this.ButtonOne.sprite);
        //this.ButtonOne.immovable = true;
        //this.ButtonOne.body.moves = false;
        

        this.physics.add.collider(this.dog.sprite, platforms, this.dog.onCollide, null, this);
        this.physics.add.collider(this.cat.sprite, platforms, this.cat.onCollide);
        this.physics.add.collider(this.cat.sprite, this.dog.sprite);
        this.physics.add.collider(this.ButtonOne.sprite, platforms);
        this.physics.add.collider(this.ButtonOne.sprite, this.dog.sprite);
        this.physics.add.collider(this.ButtonOne.sprite, this.cat.sprite);

    }
    update() {

        this.dog.update(this.keys);
        this.cat.update(this.cursors);

        this.ButtonOne.update();

        //Update button grou
        /*
        this.buttonGroup.children.entries.forEach((sprite) => {
            sprite.update();
        });
        */
    }
  
} export default Turtorial ;  
