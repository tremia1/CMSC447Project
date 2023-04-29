class Water extends Phaser.GameObjects.Sprite {

    constructor(config){ // may be able to get desired effect by making the block pushable when interact button pressed but need to test that
        super(config.scene,config.x ,config.y ,'water'); // water is temp need to change to be what loaded from tile map
        this.cat = config.cat;
        this.dog = config.dog;
        this.x = config.x;
        this.y = config.y;
        this.scene = config.scene;
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0).setBounce(0,0).setCollideWorldBounds(true);
        this.body.allowGravity = true;
        this.body.setSize(37,37); // needs to be set to size of water sprite 
        this.body.offset.set(0,0); // as of right now depends on screen size you will need certain amount of offset     
        this.body.pushable = false;
        this.body.immovable = true;
        this.scene.physics.add.overlay(this, this.dog.sprite);
        this.scene.physics.add.overlay(this, this.cat.sprite, this.resetLevel());
    }
    update(){
        this.scene.physics.add.overlay(this, this.cat.sprite, this.resetLevel());
        //may need the overlay call for cat here to make sure its awlays checking 
    }

    resetLevel(){
         this.scene.restart();  // need to see if does what expected but still need to add time penalty  
    }
}