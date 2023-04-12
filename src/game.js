import Dog from '../src/object/Dog.js';
class gameScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('Button', 'assets/images/Button.png', { frameWidth: 18, frameHeight: 48 });
        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/platformer (3).json');


        //Load Spritesheet for dog
        this.load.spritesheet('DogIdle', 'assets/images/Dog/Dog-Idle.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogWalk', 'assets/images/Dog/Dog-Walk.png', { frameWidth: 46, frameHeight: 67 });
        this.load.spritesheet('DogJump', 'assets/images/Dog/Dog-Jump.png', { frameWidth: 160, frameHeight: 34 });
        this.load.spritesheet('DogSniff', 'assets/images/Dog/Dog-Sniff.png', { frameWidth: 57, frameHeight: 66 });
        this.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', { frameWidth: 22, frameHeight: 22 });
        this.load.spritesheet('DogSniffAndWalk', 'assets/images/Dog/Dog-Sniff-Walk.png', { frameWidth: 57, frameHeight: 61 });

    }
    create() {
     
        //Add background image
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;

        

        //Create tilemap and all the layers for it
        //Add debug for any physics errors (remove later)
        const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage('Textures-16', 'tiles');
      
        const platforms = map.createLayer('Tile Layer 1', tileset, 495, 130);
        platforms.setCollisionByProperty({ collides: true });

        const debugGraphics = this.add.graphics().setAlpha(0.7);
        platforms.renderDebug(debugGraphics, {

            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
     

          //   Create a new sprite for the player
        this.player = this.physics.add.sprite(800, 600, 'player');

        // Set up player input controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            a: Phaser.Input.Keyboard.KeyCodes.A,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            w: Phaser.Input.Keyboard.KeyCodes.W
        });

        // Set up the player's physics properties
     
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setGravityY(300);
      

        //Create dog class
        this.dog = new Dog({
            scene: this,
            x: 800,
            y: 600
        });
     
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.dog, platforms);


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
        console.log(this.player.body.touching.down); //currently false when it should be true
        // Make the player jump if they're touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
        }



    }
} export default gameScene;




//const gameScene = {
//    preload: function() {
//      this.load.image('background', 'assets/images/cobblestonewall.png');
//    },
//    create: function() {
//        // Create a new sprite for the player
//        this.player = this.physics.add.sprite(400, 300, 'player');

//        // Set up player input controls
//        this.cursors = this.input.keyboard.createCursorKeys();

//        // Set up the player's physics properties
//        this.player.setCollideWorldBounds(true);
//        this.player.setBounce(0.2);
//        this.player.setGravityY(300);

//        // Create a group to hold the game's platforms
//        this.platforms = this.physics.add.staticGroup();

//        // Create some platforms for the player to stand on
//        this.platforms.create(400, 568, 'platform').setScale(3).refreshBody();
//        this.platforms.create(600, 400, 'platform').setScale(2).refreshBody();
//        this.platforms.create(50, 250, 'platform');
//        this.platforms.create(750, 220, 'platform');

//        // Set up collision between the player and the platforms
//        this.physics.add.collider(this.player, this.platforms);
//    },
//    update: function() {
//        // Check for player input and move the player accordingly
//        if (this.cursors.left.isDown) {
//            this.player.setVelocityX(-160);
//        } else if (this.cursors.right.isDown) {
//            this.player.setVelocityX(160);
//        } else {
//            this.player.setVelocityX(0);
//        }

//        // Make the player jump if they're touching the ground
//        if (this.cursors.up.isDown && this.player.body.touching.down) {
//            this.player.setVelocityY(-450);
//        }
//    },
//};
  
//export default gameScene;
  