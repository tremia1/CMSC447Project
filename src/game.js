import Dog from '../src/object/Dog.js';
import Cat from '../src/object/Cat.js';
import Button from '../src/object/Button.js';
class gameScene extends Phaser.Scene {

    constructor()
	{
		super('Turtorial')
	}
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('button', 'assets/images/Button.png', { frameWidth: 18, frameHeight: 48 });
        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.image('bg', 'assets/images/background.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/tutorial.json');


        //Load Spritesheet for dog
        this.load.spritesheet('DogIdle', 'assets/images/Dog/Dog-Idle.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogWalk', 'assets/images/Dog/Dog-Walk.png', { frameWidth: 46, frameHeight: 67 });
        this.load.spritesheet('DogJump', 'assets/images/Dog/Dog-Jump.png', { frameWidth: 160, frameHeight: 34 });
        this.load.spritesheet('DogSniff', 'assets/images/Dog/Dog-Sniff.png', { frameWidth: 57, frameHeight: 66 });
        this.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', { frameWidth: 22, frameHeight: 22 });
        this.load.spritesheet('DogSniffAndWalk', 'assets/images/Dog/Dog-Sniff-Walk.png', { frameWidth: 57, frameHeight: 61 });

        this.load.spritesheet('Cat', 'assets/images/Cat.png', {frameWidth: 32, frameHeight: 32});

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
        

    //Test the colliding physics with tiles
        //const debugGraphics = this.add.graphics().setAlpha(0.7);
        //platforms.renderDebug(debugGraphics, {

        //    tileColor: null,
        //    collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        //});
    

        // Set up player input controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            a: Phaser.Input.Keyboard.KeyCodes.A,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            w: Phaser.Input.Keyboard.KeyCodes.W
        });


        //Create dog class
        this.Dog = new Dog({
            scene: this,
            x: 800,
            y: 500
        });
        
        this.Cat = new Cat({
            scene: this,
            x: 800,
            y: 500
        });

        this.physics.add.collider(this.Dog,platforms);
        this.physics.add.collider(this.Cat,platforms);
    //   //Create groups for button, block and water
    //   this.buttonGroup = this.add.group();
    //   this.blockGroup = this.add.group();
    //   this.waterGroup = this.add.group();

    //   //Create button class and set it as tilemap object
    //   map.getObjectLayer('Button').objects.forEach((button) => {
    //       const buttonObject = new Button({
    //           scene: this,
    //           x: button.x,
    //           y: button.y,
    //           status: false,
    //           cat: this.cat,
    //           dog: this.dog
    //       });
    //       this.buttonGroup.add(buttonObject);
    //   });
 

 
 


    }
    update() {
        console.log(this.cursors.up.isDown);
        this.Cat.update(this.cursors);
        this.Dog.update(this.keys);
//  //Update button group
//  this.buttonGroup.children.entries.forEach((sprite) => {
//     sprite.update();
// });
    }
        
        
       



  
} export default gameScene;
