export default class Dog extends Phaser.GameObjects.Sprite {

    //need function for bark
    //need function for pushing (colliding) with block
    //need check for falling from high place
    //need function for dig
    //need function for sniff
    //need animation for digging
    //need animation for sniffing
    //need to check if sniffing is true (meaning there is an object there, then dig)
    constructor(config) {
        super(config.scene, config.x, config.y, 'Dog');
        config.scene.physics.world.enable(this);
        config.scene.physics.add.existing(this);
      
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
        this.animSuffix = '';
 
    }

    preload() {
        //this.load.spritesheet('DogWalk', "sprites/Dog/Dog-Walk", 32, 28, 5);
        //this.load.spritesheet('DogJump', "sprites/Dog/Dog-Jump", 32, 28, 11);
        //this.load.spritesheet('DogIdle', "sprites/Dog/Dog-Idle", 32, 28, 5);
        //this.load.spritesheet('DogBark', "sprites/Dog/Dog-Bark", 32, 28, 5);
        //this.load.spritesheet('DogSniff', "sprites/Dog/Dog-Sniff", 32, 28, 8);
        //this.load.spritesheet('DogSniffAndWalk', "sprites/Dog/Dog-Sniff-Walk", 32, 28, 8);

    }

    create() {
       
        this.anims.create({
            key: 'DIdle',
            frames: this.anims.generateFrameNumbers("DogIdle"),
            frameRate: 12,
            repeat: -1

        });
        this.anims.create({
            key: 'DWalk',
            frames: this.anims.generateFrameNumbers("DogWalk"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'DJump',
            frames: this.anims.generateFrameNumbers("DogJump"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'DBark',
            frames: this.anims.generateFrameNumbers("DogBark"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'DSniff',
            frames: this.anims.generateFrameNumbers("DogSniff"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'DSniffWakl',
            frames: this.anims.generateFrameNumbers("DogSniffAndWalk"),
            frameRate: 12,
            repeat: -1
        });

    }

    update(time, delta) {
        if (this.scene.keyA.isDown) {
            this.setVelocity(-160);
            this.anims.play('DWalk', true);
        }
        else if (this.scene.keyD.isDown) {
            this.setVelocity(160);
            this.anims.play('DWalk', true);
        }
        else {
            this.anims.play('DIdle', true);
        }

    }
}


