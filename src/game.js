import Dog from '../src/object/Dog.js';
import Cat from '../src/object/Cat.js';
import Button from '../src/object/Button.js';

class gameScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('button', 'assets/images/Button.png', { frameWidth: 18, frameHeight: 48 });
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

        this.load.spritesheet('Cat', 'assets/images/Cat Sprite Sheet.png', {frameWidth: 32, frameHeight: 32});
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


        // platform creator 
        this.platforms2 = this.physics.add.staticGroup();
        this.platforms2.create(400,500, 'platform2').setScale(3).refreshBody();

        //   Create a new sprite for the player
        this.player = this.physics.add.sprite(800, 300, 'player');
        
        // Set up the player's physics properties
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setGravityY(300);
      
        
        //Create dog class
        this.dog = new Dog(this, this.keys, 800, 200, 'dog');
        this.add.existing(this.dog.sprite);


        //Create cat class
        this.cat = new Cat({
            scene: this,
            x: 800,
            y: 200
        });

        //Create groups for button, block and water
        this.buttonGroup = this.add.group();
        this.blockGroup = this.add.group();
        this.waterGroup = this.add.group();

        //Create button class and set it as tilemap object
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
   
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.dog.sprite, platforms, this.dog.onCollide, null, this);
        this.physics.add.collider(this.cat, platforms);
        this.physics.add.collider(this.dog, this.platforms2);

    }
    update() {
          // Check for player input and move the player accordingly
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }
    this.dog.update(this.keys);
    //this.cat.update(this.cursors);

    //Update button group
        this.buttonGroup.children.entries.forEach((sprite) => {
            sprite.update();
        });
     
        // Make the player jump if they're touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
        }



    }
  
} export default gameScene;  