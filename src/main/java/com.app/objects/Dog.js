class Dog extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'Cat');
        this.scene.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.setPosition(x, y);
    }

    create() {

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Cat', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('Cat', {
                start: 5,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNumbers('Cat', {
                start: 5,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'Cat',
                frame: 4
            }],
            frameRate: 20
        });



        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
    }
    Update(time, delta) {

        if (cursors.left.isDown) {
            this.setVelocityX(-160);

            this.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);

            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);

            this.anims.play('turn');
        }

        if (cursors.up.isDown && this.body.touching.down) {
            this.HighJump();
        }

        if (cursors.up.isDown && this.body.touching.left || cursors.up.isDown && this.body.touching.right) {
            this.Climb();
        }

    }


    HighJump() {

        this.setVeolcityY(-400)
        this.anims.play('jump', true);
    }

    Climb {
        this.setVeolcityY(-200)
        this.anims.play('climb', true);
    }

}
