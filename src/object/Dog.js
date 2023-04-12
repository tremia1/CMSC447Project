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
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        this.collideWorldBounds = true;
        config.scene.physics.add.sprite();
        this.bounce = 0.2;
        this.gravity = 300;
     
        //Load Spritesheet for dog
        //config.scene.load.spritesheet('DogIdle', 'assets/images/Dog/Dog-Idle.png', { frameWidth: 50, frameHeight: 48 });
        //config.scene.load.spritesheet('DogWalk', 'assets/images/Dog/Dog-Walk.png', { frameWidth: 50, frameHeight: 48 });
        //config.scene.load.spritesheet('DogJump', 'assets/images/Dog/Dog-Jump.png', { frameWidth: 50, frameHeight: 48 });
        //config.scene.load.spritesheet('DogSniff', 'assets/images/Dog/Dog-Sniff.png', { frameWidth: 50, frameHeight: 48 });
        //config.scene.load.spritesheet('DogBark', 'assets/images/Dog/Dog-Bark.png', { frameWidth: 50, frameHeight: 48 });
        //config.scene.load.spritesheet('DogSniffAndWalk', 'assets/images/Dog/Dog-Sniff-Walk.png', { frameWidth: 50, frameHeight: 48 });
      
        //Create animation for Dog
        this.anims.create({
            key: 'DIdle',
            frames: this.anims.generateFrameNumbers("DogIdle"),
            frameRate: 10,
            repeat: -1

        });
        this.anims.create({
            key: 'DWalk',
            frames: this.anims.generateFrameNumbers("DogWalk"),
            frameRate: 10,
            repeat: -1,
           
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
            key: 'DSniffWalk',
            frames: this.anims.generateFrameNumbers("DogSniffAndWalk"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.play('DIdle',true);
 
    }
  

    update(keys, time, delta) {
        this.scene.physics.world.collide(this, this.scene.platforms);
        if (this.scene.keys.a.isDown) {
            this.body.setVelocityX(-160);

            this.anims.play('DWalk',true);
            this.flipX = true;
        }
        else if (this.scene.keys.d.isDown) {
            this.body.setVelocityX(160);
      
            this.anims.play('DWalk',true);
          
        }
        else {
            this.body.setVelocityX(0);
            this.anims.play('DIdle',true);
        }
     
    }
}


