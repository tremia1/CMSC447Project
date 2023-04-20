import PlayerController from './PlayerController.js';

export default class Cat extends PlayerController {
  constructor(scene, cursors, x, y, name) {
    
    // create the sprite and add it to the physics engine
    const sprite = scene.physics.add.sprite(x, y, name + '-idle');
    super(scene, sprite, cursors, name); // call constructor of parent 
    
    this.createAnimations(); // create the animation
  }

  idleOnUpdate(){
    // call the parent idle update function
    super.idleOnUpdate();
  }

  createAnimations() {

    // make sure you have these keys for animations you create
    this.anims.create({
        key: this.charName + '-idle',
        frames: this.anims.generateFrameNumbers("CatIdle"),
        frameRate: 10,
        repeat: -1,

    });

    this.anims.create({
        key: this.charName + "-walk",
        frames: this.anims.generateFrameNumbers("CatWalk"),
        frameRate: 10, 
        repeat: -1,
        frameWidth: 32,
        frameHeight: 32
       
    });

    this.anims.create({
        key: this.charName + '-jump',
        frames: this.anims.generateFrameNumbers("CatJump"),
        frameRate: 20,
        repeat: -1
    });
}
}