export default class Water extends Phaser.GameObjects.Sprite {

    constructor(config){ // may be able to get desired effect by making the block pushable when interact button pressed but need to test that
        super(config.scene,config.x ,config.y ,'waterTile'); 
        this.cat = config.cat;
        this.dog = config.dog;
        this.x = config.x;
        this.y = config.y;
        this.scene = config.scene;
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        
        this.body.setVelocity(0, 0).setBounce(0,0).setCollideWorldBounds(true);
        this.body.allowGravity = true;
        this.body.setSize(37,37); // needs to be set to size of water sprite 
        this.body.offset.set(0,0); // as of right now depends on screen size you will need certain amount of offset     
        this.body.pushable = false;
        this.body.immovable = true;
        console.log(this);
        config.scene.physics.add.overlay(this, this.dog.sprite);
        config.scene.physics.add.overlay(this, this.cat.sprite, this.resetLevel());
    }
    update(){
        config.scene.physics.add.overlay(this, this.cat.sprite, this.resetLevel()); // this can return a boolean if they actually overlap, can use this as a way of checking
        //may need the overlay call for cat here to make sure its always checking 
    }

    resetLevel(){
         this.scene.restart();  // need to see if does what expected but still need to add time penalty  
    }
}