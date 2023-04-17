import Cat from '../src/object/Cat.js';
class gameScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('Button', 'assets/images/Button.png', { frameWidth: 18, frameHeight: 48 });
        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/turtorialstage.json');
        this.load.image('platform','assets/images/cobbles2.png',{ frameWidth: 18, frameHeight: 48 });


        //Load Spritesheet for dog
        this.load.spritesheet('Cat','assets/images/Cat.png',{frameWidth: 50, frameHeight: 40 });
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
        /*const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage('Textures-16', 'tiles');
      
        const platforms = map.createLayer('Tile Layer 1', tileset, 495, 130);
        platforms.setCollisionByProperty({ collides: true });

        const debugGraphics = this.add.graphics().setAlpha(0.7);
        platforms.renderDebug(debugGraphics, {

            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
     
*/
          //   Create a new sprite for the player


        // Set up player input controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            a: Phaser.Input.Keyboard.KeyCodes.A,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            w: Phaser.Input.Keyboard.KeyCodes.W
        });


      

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(800,900, 'platform').setScale(3).refreshBody();
        //Create dog class
        
        this.Cat = new Cat({
            scene: this,
            x: 800,
            y: 500
        });

       // this.physics.add.collider(this.player, platforms);
       this.physics.add.collider(this.Cat, this.platforms);
 


    }
    update() {
        console.log(this.cursors.up.isDown);
        this.Cat.update(this.cursors);
        

        
        
          // Check for player input and move the player accordingly
   
        
       
       /* console.log(this.player.body.touching.down); //currently false when it should be true
        // Make the player jump if they're touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
        }*/



    }
} export default gameScene;