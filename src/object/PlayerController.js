import StateMachine from "./Statemachine.js"

export default class PlayerController {



    constructor(scene, sprite, cursors, name) {
        this.scene = scene
        this.sprite = sprite
        this.cursors = cursors
        this.charName = name
        this.anims = this.scene.anims

        this.createAnimations()

        this.stateMachine = new StateMachine(this, name)
        this.onCollide = this.onCollide.bind(this);
        // add different states to our statemachine 
        this.stateMachine
        .addState("idle", {
            onEnter: this.idleOnEnter,
            onUpdate: this.idleOnUpdate
        })
        .addState("walk", {
            onEnter: this.walkOnEnter,
            onUpdate: this.walkOnUpdate,
            onExit: this.walkOnExit
        })
        .addState("jump", {
            onEnter: this.jumpOnEnter,
            onUpdate: this.jumpOnUpdate
        })
        .addState("dead", {
            onEnter: this.deadOnEnter
        })
        .addState("landed", {
            onEnter: this.landedOnEnter
        })
        .setState("idle")
    }

    update(dt) {
        this.stateMachine.update(dt)
    }

    idleOnEnter() {
        this.sprite.setVelocityX(0)
        this.sprite.play(`${this.charName}-idle`)
    }

    idleOnUpdate() {
        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.stateMachine.setState("walk")
        }

        if (this.cursors.up.isDown && this.sprite.body.blocked.down) {
            this.stateMachine.setState("jump")
        }
    }

    walkOnEnter() {
        this.sprite.play(`${this.charName}-walk`)
    }

    walkOnUpdate() {
        const speed = 160

        if (this.cursors.left.isDown) {
            this.sprite.flipX = true
            this.sprite.setVelocityX(-speed)
        } else if (this.cursors.right.isDown) {
            this.sprite.flipX = false
            this.sprite.setVelocityX(speed)
        } else {
            this.stateMachine.setState("idle")
        }

        if (this.cursors.up.isDown && this.sprite.body.blocked.down) {
            this.stateMachine.setState("jump")
        }
    }

    walkOnExit() {
        this.sprite.stop()
    }

    jumpOnEnter() {
        const speed = -200

        this.sprite.play(`${this.charName}-jump`)
        this.sprite.setVelocityY(speed)
    }

    jumpOnUpdate() {
        if (this.sprite.body.blocked.down){
            this.stateMachine.setState('idle');
        }

        const speed = 160
		if (this.cursors.left.isDown)
		{
			this.sprite.flipX = true
			this.sprite.setVelocityX(-speed)
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.flipX = false
			this.sprite.setVelocityX(speed)
		} else{
            this.sprite.setVelocityX(0)
        }
    }

    landedOnEnter(){
        this.onFloor = true;
        this.stateMachine.setState('idle')
    }
    
    onCollide() {
        // called when player collides with object
     }

    createAnimations() {

        // make sure you have these keys for animations you create
        this.anims.create({
            key: this.charName + '-idle',
            frames: this.anims.generateFrameNumbers("DogIdle"),
            frameRate: 10,
            repeat: -1,

        });

        this.anims.create({
            key: this.charName + "-walk",
            frames: this.anims.generateFrameNumbers("DogWalk"),
            frameRate: 10, 
            repeat: -1,
            frameWidth: 32,
            frameHeight: 32
           
        });

        this.anims.create({
            key: this.charName + '-jump',
            frames: this.anims.generateFrameNumbers("DogJump"),
            frameRate: 20,
            repeat: -1
        });
    }
}
