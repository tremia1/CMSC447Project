export default class Block extends Phaser.GameObjects.Sprite {

    constructor(config){ // may be able to get desired effect by making the block pushable when interact button pressed but need to test that
        super(config.scene,config.x ,config.y ,'box');
        this.cat = config.cat;
        this.dog = config.dog;
        this.x = config.x;
        this.y = config.y;
        this.scene = config.scene;
        this.buttongroup = config.button;
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0).setBounce(0,0).setCollideWorldBounds(false);
        this.body.allowGravity = true;
        this.body.setSize(37,37);
        this.body.offset.set(0,0); // as of right now depends on screen size you will need certain amount of offset     
        this.body.pushable = true;
        this.body.allowDrag = true;
        this.body.setDragX(800); // basically friction for block on x axis 
        this.scene.physics.add.collider(this, this.dog.sprite);
        this.scene.physics.add.collider(this, this.cat.sprite); 

        let block = this;
        this.buttongroup.getChildren().forEach(function(button){
            config.scene.physics.add.overlap(block,button);
        });
    }
    update(){
        //Check if cat is colliding with object
        let catPushes = this.checkCollision(this,this.cat);
        let isPushable = this.body.pushable;
        if(catPushes == true){
            isPushable = false;
        }
        else{
            isPushable = true;
        }
        this.body.pushable = isPushable;
        // this.scene.physics.add.collider(this, this.dog.sprite); // this is needed so the cat and dog dont glitch through the box when running into it
        // this.scene.physics.add.collider(this, this.cat.sprite);
    }
    move(){ // move block left or right 
        return;
    }
    checkCollision(spriteA, spriteB){
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.sprite.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA,boundsB);
    }

}
