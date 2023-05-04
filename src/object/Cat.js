import PlayerController from './PlayerController.js';

const WALK_SPEED = 150
const JUMP_HEIGHT = 225

export default class Cat extends PlayerController {
  constructor(scene, cursors, x, y, name) {
    
    // create the sprite and add it to the physics engine
    const sprite = scene.physics.add.sprite(x, y, name + '-idle');
    super(scene, sprite, cursors, name); // call constructor of parent 
    
    this.createAnimations(); // create the animation

    this.jumpHeight = JUMP_HEIGHT
    this.walkSpeed = WALK_SPEED

    this.stateMachine
    .addState("hiss", {
        onEnter: this.hissOnEnter,
        onUpdate: this.hisOnUpdate
    })
  }

  hissOnEnter(){
    this.sprite.play(`${this.charName}-hiss`)

    // hiss and freeze controls for a little bit before going back to idle
    this.scene.time.addEvent({
      delay: 500,
      callback: ()=>{
          this.stateMachine.setState('idle')
      },
      loop: false
  })

  }

  hisOnUpdate(){
    // do stuff like check whats nearby 

  }

  idleOnUpdate(){
    // call the parent idle update function
    if(this.cursors.hiss.isDown){
      this.stateMachine.setState('hiss')
    }
    super.idleOnUpdate();
  }

  createAnimations() {

    // make sure you have these keys for animations you create
    this.anims.create({
        key: this.charName + '-idle',
        frames: this.anims.generateFrameNumbers("CatIdle"),
        frameRate: 15,
        repeat: -1,

    });

    this.anims.create({
        key: this.charName + "-walk",
        frames: this.anims.generateFrameNumbers("CatWalk", {
          start: 8,
          end:16
        }),
        frameRate: 15, 
        repeat: -1,
        
       
    });

    this.anims.create({
        key: this.charName + '-jump',
        frames: this.anims.generateFrameNumbers("CatJump", {
          end: 2
        }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
      key: this.charName + '-hiss',
      frames: this.anims.generateFrameNumbers("CatHiss"),
      frameRate: 15,
      repeat: -1
  });

  // this is for custom behavior for animations on our sprite
  this.sprite.on('animationcomplete-idle', (animation, frame, sprite) => {
    // check if jump finished, if it has then set it to the last frame so it does repeat 
    if (animation.key === this.charName + '-jump') {
      // stop the animation at its final frame
      this.sprite.anims.pause()
    }
  });


}
}

