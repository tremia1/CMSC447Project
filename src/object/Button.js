export default class Button extends Phaser.GameObjects.Sprite {

    constructor(config){
        
        super(config.scene, config.x, config.y, 'button-up');
        this.status = false;
        this.cat = config.cat;
        this.dog = config.dog;
        this.x = config.x;
        this.y = config.y;
        this.durration = config.dur;
        this.falseCount = 0;
        this.scene = config.scene;
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0).setBounce(0,0).setCollideWorldBounds(false);
        this.body.allowGravity = true;
        this.body.setSize(9,6);
        this.body.offset.set(-6,0);    
        this.body.immovable = true;
        config.scene.physics.add.overlap(this, this.dog.sprite);
        config.scene.physics.add.overlap(this, this.cat.sprite);

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('button-up'),
            frameRate: 20,
            repeat: -1,
            frameWidth: 9,
            frameHeight: 6
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('button-down'),
            frameRate: 20,
            repeat: -1,
            frameWidth: 9,
            frameHeight: 6
        });

        this.anims.play('up');
/*
        this.anims.create({
            key: 'buttonpushed',
            frames: this.anims.generateFrameNumbers('button'),
            frameRate: 5,
            repeat: -1
        });
  */      
        
    }

    update(){
        //this.scene.physics.add.overlap(this, this.dog.sprite);
        //this.scene.physics.add.overlap(this, this.cat.sprite);
        this.checkPressed();
    }

    setStatus(state){
        this.status = state;  
    }

    getStatus(){
        return this.status;
    }

    checkPressed(){ // didnt do a collider as we want to have more than just player be able to be on it 
        
        //console.log(`Is it touching down ${this.body.touching.down}`);
        console.log(`Is it touching up ${this.body.touching.up}`);
        //console.log(`Is it touching none ${this.body.touching.none}`);
        console.log(`Is it touching embedded ${this.body.embedded}`);
        //console.log(`The status is ${this.status}`);
        
        if(this.falseCount > this.durration){
            this.status = false;
        }
        if(this.body.embedded){ // something on top
            this.falseCount = 0; 
            this.status = true;
        }else{ // not on top inc false count
            this.falseCount +=1;
        }
        if(this.status == false){
            this.anims.play('up');
        }else{
            this.anims.play('down');
        }
        
       /*
        if(this.body.touching.up){
            this.status = true;
            this.anims.play('down');
        }else{
            this.status = false;
            this.anims.play('up');
        }
        */

    }

    


}