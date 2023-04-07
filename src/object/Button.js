class Button extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, status, cat, dog){
        super(scene,x ,y ,'Button');
        this.status = false; // button needs player or block on it to be pressed 
        this.cat = cat;
        this.dog = dog;
        this.scene.physics.collider(this, this.cat); 
        this.scene.physics.collider(this, this.dog);
        this.scene.add.existing(this); 
        this.getBody().setCollideWorldBounds(true); 
        this.setPosition(x,y);
    }

    update(){
        this.checkPressed();
    }

    setStatus(state){
        this.status = state;  
    }

    getStatus(){
        return this.status;
    }

    checkPressed(){ // didnt do a collider as we want to have more than just player be able to be on it 
        if(this.body.touching.up){
            if(this.status != true){ // load button up texture need to test if need to remove old sprite then load or just load 

            }
            this.status = true;
        } else {
            if(this.status != false){ // load button down texture 

            }
            this.status = false;
        }

    }

    


}