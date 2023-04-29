import Dog from '../../src/object/Dog.js';
import Cat from '../../src/object/Cat.js';

export default class test extends Phaser.Scene {
    constructor() {
        super("test");
    }
    preload() {

        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.image('bg', 'assets/images/background.png');
        this.load.image('wallTile', 'assets/tileset/Tiles/tile042.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/trying.json');
        this.load.image('wall', 'assets/tileset/Textures-16.png')

        //Load Spritesheet for dog
        this.load.spritesheet('DogIdle', 'assets/images/Dog/Dog-Idle.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogWalk', 'assets/images/Dog/Dog-Walk.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogJump', 'assets/images/Dog/Dog-Jump.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogSniff', 'assets/images/Dog/Dog-Sniff.png', { frameWidth: 57, frameHeight: 66 });
        this.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', { frameWidth: 50, frameHeight: 40 });
        this.load.spritesheet('DogSniffAndWalk', 'assets/images/Dog/Dog-Sniff-Walk.png', { frameWidth: 50, frameHeight: 40 });

        this.load.spritesheet('CatIdle', 'assets/images/Cat/Cat-Idle.png', { frameWidth: 15, frameHeight: 15 });
        this.load.spritesheet('CatWalk', 'assets/images/Cat/Cat-Walk.png', { frameWidth: 15, frameHeight: 15 });
        this.load.spritesheet('CatJump', 'assets/images/Cat/Cat-Jump.png', { frameWidth: 15, frameHeight: 15 });
        this.load.spritesheet('CatHiss', 'assets/images/Cat/Cat-Hiss.png', { frameWidth: 15, frameHeight: 15 });


    }

    create() {
        this.map = this.make.tilemap({
            key: 'map',
            tileHeight: 16,
            tileWidth: 16
        });

        this.tileset = this.map.addTilesetImage('Textures-16', 'tiles');
        this.backgroundImage = this.map.addTilesetImage('background', 'bg');
        this.background = this.map.createLayer('Background', this.backgroundImage);
        this.platforms = this.map.createLayer('Platform', this.tileset);

        this.platforms.setCollisionByProperty({ collides: true });




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
        this.wallGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });

        this.buttonGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.waterGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.blockGroup = this.physics.add.group({
            immovable: false,
            allowGravity: true

        });

        //Create Wall objects
        //They are invisible till button is pressed
        //Can change specific walls according to id
        this.map.getObjectLayer('Wall').objects.forEach((wall) => {
            this.wallSprite = this.wallGroup.create(wall.x, wall.y - wall.height, 'wallTile').setOrigin(0);
            this.wallSprite.setScale(1, 3);
            this.wallSprite.body.width = wall.width;
          
     
            this.wallSprite.visible = false; //the blocks are originally visible 
            this.wallSprite.body.height = wall.height;
           
            // this.physics.add.collider(this.cat.sprite, this.wallSprite); //add collision if the blocks are visible
            // this.physics.add.collider(this.dog.sprite, this.wallSprite);
        });

        //Create Button objects
        this.map.getObjectLayer('Button').objects.forEach((button) =>{
            this.buttonSprite = new Button
        });
        //Create Water objects

        //Create Block objects

        //Create Door object

        this.physics.add.collider(this.dog.sprite, this.platforms, this.dog.onCollide, null, this);
        this.physics.add.collider(this.cat.sprite, this.platforms, this.cat.onCollide);
        this.physics.add.collider(this.wallSprite, this.platforms);
        this.physics.add.collider(this.cat.sprite, this.dog.sprite);



        this.timeText = this.add.text(50, 30, 'Time :', { fontSize: '32px', fill: '#FFFFFF' });
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(time) {

        this.dog.update(this.keys);
        this.cat.update(this.cursors);
        
        //If a button set to wall is pushed, call wallMakeVisible()
        //Pass in wall name

        // this.ButtonOne.update();

        this.gameRuntime = time * 0.001;

        this.minutes = Math.floor(this.gameRuntime / 60);

        this.seconds = this.gameRuntime - (this.minutes * 60);

        //Check to see if button was pressed, if pressed, set wall to visible and add physic collider
        //Probably call a function to do this once
        this.timeText.setText("Time : " + this.minutes + " Minutes " + Math.round(this.seconds) + " Seconds");

        if (Phaser.Input.Keyboard.JustDown(this.esc)) {
            this.scene.start('GameMenu', { "location": 'Tutorial' });
        }



    }

    //Function for when button is pushed to make wall visible
    //Get the children from group, set to visible, add physics collider
    wallMakeVisible(name){}


}
