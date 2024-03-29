export default class Door extends Phaser.GameObjects.Sprite {
    constructor(config){
        
        super(config.scene, config.x, config.y, 'door-closed');
        this.status = false; // means door is closed
        this.cat = config.cat;
        this.dog = config.dog;
        this.x = config.x;
        this.y = config.y;
        this.button = config.button;
       
        this.scene = config.scene
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0).setBounce(0,0).setCollideWorldBounds(false);
        this.body.allowGravity = true;    
        this.body.immovable = true;
        this.scene.physics.overlap(this.dog.sprite, this);
        this.scene.physics.overlap(this, this.cat.sprite,this.closeDoor());
        this.successSound = this.scene.sound.get('successSound') || this.scene.sound.add('successSound', { loop: false })
        
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('door-open'),
            frameRate: 1,
            repeat: -1,
            frameWidth: 73,
            frameHeight: 85
        });
        this.anims.create({
            key: 'closed',
            frames: this.anims.generateFrameNumbers('door-closed'),
            frameRate: 1,
            repeat: -1,
            frameWidth: 73,
            frameHeight: 85
        });
        this.anims.create({
            key: 'animation',
            frames: this.anims.generateFrameNumbers('door-animation'),
            frameRate: 10,
            repeat: -1,
            frameWidth: 73,
            frameHeight: 85
        });
     
        this.anims.play('closed');
    }
    update(){
        this.scene.physics.add.overlap(this, this.dog.sprite, this.openDoor());
        this.scene.physics.add.overlap(this, this.cat.sprite, this.closeDoor());
        if(this.button.status && this.status == false){
            this.anims.play('animation');
            this.status = true;
        }else{
            this.anims.play('animation');
            this.status = false;
        }
        

        if(this.status){
            this.anims.play('open');
        }else{
            this.anims.play('closed');
        }
        this.catCheck= this.checkOverlap(this, this.cat.sprite);
        this.dogCheck = this.checkOverlap(this, this.dog.sprite);
        if(this.catCheck && this.dogCheck){
            this.successSound.play()
            this.scene.goNextLevel();
        }
      

    }

    openDoor(){
        this.status = true;
    }

    closeDoor(){
        this.status = false;      
    }
    checkOverlap(spriteA, spriteB){
        var boundsA = spriteB.getBounds();
        var boundsB = spriteA.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA,boundsB);
    }

}
