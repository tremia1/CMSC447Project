
export default class Button extends Phaser.GameObjects.Sprite {

    constructor(config){
        super(config.scene, config.x, config.y, status, config.cat, config.dog, 'Button');
        this.status = false;
        this.cat = config.cat;
        this.dog = config.dog;
        this.scene.physics.world.collide(this, this.scene.platforms);
        this.scene.physics.world.overlap(this, config.cat);
        this.scene.physics.world.overlap(this, config.dog);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        config.scene.physics.add.sprite();
      


        this.anims.create({
            key: 'buttonpushed',
            frames: this.anims.generateFrameNumbers("button"),
            frameRate: 5,
            repeat: -1
        });
        //this.status = false; // button needs player or block on it to be pressed 
        //this.cat = config.cat;
        //this.dog = config.dog;
        //scene.add.existing(this);
        //scene.physics.world.enableBody(this);
        ////this.scene.physics.collider(this, this.cat); 
        ////this.scene.physics.collider(this, this.dog);
        //this.scene.add.existing(this); 
        //this.getBody().setCollideWorldBounds(true); 
        //this.setPosition(x,y);
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
            if (this.status != false) { // load button down texture 
                this.anims.play('buttonpushed',true);

            }
            this.status = false;
            this.anims.play('buttonpushed', false);
        }

    }

    


}