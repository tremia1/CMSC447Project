export default class Cat extends Phaser.GameObjects.Sprite {

    constructor (config){
        super(config.scene, config.x,config.y,'Cat');
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);

        this.setCollideWorldBounds = true;
        config.scene.physics.add.sprite();
        this.bounce = 0.2;
        this.gravity = 300;

 
    }

    create()
    {
      
      this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('Cat', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
        });


      this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('Cat', { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1
        });

      
      this.anims.create({
      key: 'turn',
      frames: [ { key: 'Cat', frame: 4 } ],
      frameRate: 20
        });


      
      this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('Cat', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
          });
    }
    Update(cursors,time, delta)
    {
      //this.scene.physics.world.collide(this,this.scene.platform)
      
      if (this.scene.cursors.left.isDown)
      {
      this.setVelocityX(-160);

      this.anims.play('left', true);
    }
      else if (this.scene.cursors.right.isDown)
    {
      this.setVelocityX(160);

      this.anims.play('right', true);
    }
    else
    {
      this.setVelocityX(0);

      this.anims.play('turn',true);
    }

    if (this.scene.cursors.ip.isDown && this.body.touching.down)
    {
      this.setVeolcityY(-320);
      this.anims.play('jump', true);
    }


      
    }


    
}

