
export default class Button extends Phaser.GameObjects.Sprite {

    constructor(config){
        
        super(config.scene, config.x, config.y, config.cat, config.dog);
        this.status = false;
        this.sprite = config.scene.physics.add.sprite(config.x, config.y, 'button-up');
        this.cat = config.cat;
        this.dog = config.dog;
        //this.scene.physics.world.collide(this.sprite, this.scene.platforms);
        //this.scene.physics.world.overlap(this.sprite, config.cat);
        //this.scene.physics.world.overlap(this.sprite, config.dog);
        //this.body.setSize(18,12);
        //config.scene.add.existing(this.sprite);
        config.scene.physics.world.enable(this); 
        //config.scene.physics.add.sprite(this.sprite);    
        this.immovable = true;
        this.body.moves = false;

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('button-up'),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('button-down'),
            frameRate: 20,
            repeat: -1,
        });
/*
        this.anims.create({
            key: 'buttonpushed',
            frames: this.anims.generateFrameNumbers('button'),
            frameRate: 5,
            repeat: -1
        });
  */      
        
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
        console.log(`Is it touching ${this.body.touching.up}`);
        if(this.body.touching.up){
            if(this.status == false){
                this.status = true;
            }
            //this.anims.setCurrentFrame(0);
            this.anims.play('down');
        }else{
            if(this.status == true){ // button down
                this.status = false;
            }
            this.anims.play('up');
            //this.anims.setCurrentFrame(3);
        }

    }

    


}