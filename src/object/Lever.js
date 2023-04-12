class Lever extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, status, cat, dog){ // if this way doesnt work as intented could try making the collider and then check if a side is touching and interact button
        super(scene,x ,y ,'Lever');
        this.status = false; // false = down true = up 
        this.cat = cat;
        this.dog = dog;
        this.scene.add.existing(this); 
        this.getBody().setCollideWorldBounds(true); 
        cursors = this.input.keyboard.createCursorKeys();
        this.setPosition(x,y);
    }

    Update(){
        this.scene.physics.collider(this, this.cat, interact());
        this.scene.physics.collider(this, this.dog, interact());
    }
    

    setStatus(state){
        this.status = state;
    }

    getStatus(){
        return this.status;
    }

    flip(){ 
        if(this.status == false){
            this.status = true;
        }else{
            this.status = false;
        }
    }

    interact(){ // need to test if this work just on inital collision or the while time while touching the lever if just inital 
        // i think creating an overlay that checks will work or could just check actual position of cat and dogs x and y 
        if(cursors.down.isDown){
            this.flip();
        }

    }

}