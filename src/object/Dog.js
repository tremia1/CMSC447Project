import PlayerController from "./PlayerController.js";

export default class Dog extends PlayerController {
  constructor(scene, cursors, x, y, name) {
    
    // create the sprite and add it to the physics engine
    const sprite = scene.physics.add.sprite(x, y, name + '-idle');
    super(scene, sprite, cursors, name); // call constructor of parent 
    
    this.createAnimations(); // create the animation

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


    // call the parent class's createAnimations method to create the default animations
    super.createAnimations();
  }
}