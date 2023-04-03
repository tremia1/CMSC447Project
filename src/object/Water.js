class Water extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, cat, score){
        super(scene,x , y ,'Water');
        this.cat = cat;
        this.scene.add.existing(this);
        this.score = score;
        this.getBody().setCollideWorldBounds(true); 
        this.setPosition(x,y);
    }

    Update(){
        this.scene.physics.collider(this, this.cat, resetLevel()); // need to test if this goes here or just in constructor 
    }

    resetLevel(){
         this.scene.restart();  
         this.score.addTimePenatlty(); // this is depedant on how we impelment the score and time penatlty 
    }
}