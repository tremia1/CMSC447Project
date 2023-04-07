class Block extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, cat, dog){ // may be able to get desired effect by making the block pushable when interact button pressed but need to test that
        super(scene,x ,y ,'Block');
        this.cat = cat;
        this.dog = dog;
        this.scene.add.existing(this); 
        this.getBody().setCollideWorldBounds(true); 
        cursors = this.input.keyboard.createCursorKeys(); 
        this.setPosition(x,y);
    }
    Update(){
        this.scene.physics.collider(this, this.cat, move()); // may need a collider for buttons so it get pressed by block
        this.scene.physics.collider(this, this.dog, move()); 
    }
    move(){ // move block left or right 
        if(cursor.left.isDown && cursor.down.isDown){
            this.setVelocityX(-160);
        }  else if(cursor.right.isDown && cursor.down.isDown){
            this.setVelocityX(160);
        } else{
            this.setVelocityX(0);
        }
    }

}
