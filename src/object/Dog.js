import PlayerController from './PlayerController.js';

const WALK_SPEED = 150
const JUMP_HEIGHT = 180
export default class Dog extends PlayerController {
  constructor(scene, cursors, x, y, name) {
    
    // create the sprite and add it to the physics engine
    const sprite = scene.physics.add.sprite(x, y, name + '-idle');
    super(scene, sprite, cursors, name); // call constructor of parent 
    
    this.createAnimations(); // create the animation

    this.jumpHeight = JUMP_HEIGHT
    this.walkSpeed = WALK_SPEED
    this.errorSound = this.scene.sound.get('errorSound') || this.scene.sound.add('errorSound', { loop: false })
    sprite.setOffset(9, 0) 

    this.stateMachine
    .addState("sniffWalk", {
        onEnter: this.sniffWalkOnEnter,
        onUpdate: this.sniffWalkOnUpdate
    })
    .addState('bark', {
        onEnter: this.barkOnEnter,
        onUpdate: this.barkOnUpdate
    })
  }

  onLanded(fallTime){
    // dont know exactly how high this is, just played around and found this to be a good time
    // if they've been in the air for longer than this then they should take fall damage
    var upTime = this.jumped && .59 || 0 // time going up into the air shouldn't count, only falling 
    fallTime = fallTime - upTime
    if (fallTime > .88){

        // play error music whenever dog falls from tall heights 
        if(!this.errorSound.isPlaying){
          this.errorSound.play()
        }

      console.log(this.scene.scene.start(this.scene.scene.key, {Time: (this.scene.gameRuntime + 3)}))
    }
  }

  sniffWalkOnEnter(){
    this.sprite.play(`${this.charName}-sniffwalk`)
  }

  sniffWalkOnUpdate(){
    // do walk functionality plus more 
    this.walkOnUpdate();

    // do more down here

  }
  
  barkOnEnter(){
    this.sprite.play(`${this.charName}-bark`)

    // bark and freeze for a little before going back to idle
    this.scene.time.addEvent({
        delay: 500,
        callback: ()=>{
            // spawn a new apple
            this.stateMachine.setState('idle')
        },
        loop: false
    })
  }

  barkOnUpdate(){
    // do stuff 
    
  }
  

  idleOnUpdate(){
    // add custom behavior (bark and sniff)
    if(this.cursors.bark.isDown){
        this.stateMachine.setState('bark')
    }

    if((this.cursors.left.isDown || this.cursors.right.isDown) && this.cursors.sniff.isDown){
        this.stateMachine.setState('sniffWalk')
        return 
    }
    
    // call the parent idle update function
    super.idleOnUpdate();
  }
  createAnimations() {
    this.anims.create({
        key: this.charName + '-sniff',
        frames: this.anims.generateFrameNumbers("DogSniff"),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: this.charName + '-sniffwalk',
        frames: this.anims.generateFrameNumbers("DogSniffAndWalk"),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: this.charName + '-bark',
        frames: this.anims.generateFrameNumbers("DogBark"),
        frameRate: 12,
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

    // call the parent class's createAnimations method to create the default animations
    super.createAnimations();
  }
}