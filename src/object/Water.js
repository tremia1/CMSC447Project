export default class Water extends Phaser.GameObjects.Sprite {

    constructor(config) { // may be able to get desired effect by making the block pushable when interact button pressed but need to test that
        super(config.scene, config.x, config.y, 'waterTile');
        this.cat = config.cat;
        this.dog = config.dog;
        this.x = config.x;
        this.y = config.y;
        this.scene = config.scene;
        this.width = config.width;
        this.height = config.height;
      
        this.setOrigin(0);
        this.frame.setSize(this.width, this.height); //Sets the size of image in water to fit the water body
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);


        this.body.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(true);
        this.body.allowGravity = true;
        this.body.setSize(this.width, this.height); 
           
        this.body.pushable = false;
        this.body.immovable = true;

        config.scene.physics.add.overlap(this, this.cat.sprite);
        config.scene.physics.add.overlap(this, this.dog.sprite);
        

    }
    update() {
        let catDrown = this.checkOverlap(this, this.cat);
        let currentScene = this.scene;
        // if (this.body.embedded && this.catDrown == true ) {
        //     console.log('yep')
        //     this.scene.restart();
        if(catDrown == true){
           console.log(this.scene.scene.start(this.scene.scene.key))
        }
        } // this can return a boolean if they actually overlap, can use this as a way of checking
        //may need the overlay call for cat here to make sure its always checking 
    

    resetLevel() {
        this.scene.restart();  // need to see if does what expected but still need to add time penalty  
    }
    checkOverlap(spriteA, spriteB){
        var boundsA = spriteB.sprite.getBounds();
        var boundsB = spriteA.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA,boundsB);
    }
}