export default class MovableWall extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, 'movewallTile');
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.visible = config.visible;
        this.cat = config.cat;
        this.dog = config.dog;
        this.name = config.name;
        this.button = config.button;
        this.width = config.width;
        this.height = config.height;
        this.rotate = config.rotate;

        this.setOrigin(0);
        this.isActive = true;




        this.frame.setSize(this.width, this.height);

        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.width = config.width;
        this.body.height = config.height;
        this.body.allowGravity = false;
        this.body.pushable = false;



        this.scene.physics.add.collider(this, this.scene.platforms);
        this.dogCollider = this.scene.physics.add.collider(this.dog.sprite, this);
        this.catCollider = this.scene.physics.add.collider(this.cat.sprite, this);


    }
    update() {
        //Check if the button status is true
        if (this.button.status == true) {
            this.wallMakeInvisible();
        }
        else if (this.visible == false) {
            this.wallMakeVisible();
        }
    }

    //Function for when button is no longer pushed
    //Get the children from group, set to visible, add physics collider
    wallMakeVisible() {
        this.visible = true;
        if(this.visible == true && this.isActive == false){
            this.dogCollider = this.scene.physics.add.collider(this.dog.sprite, this);
            this.catCollider = this.scene.physics.add.collider(this.cat.sprite, this);
            this.isActive = true;
        }
      


    }

    //Function for when button is pushed
    //Makes wall invisible and removes any colliders with wall and animals
    wallMakeInvisible() {
        this.visible = false;
        if (this.visible == false && this.isActive == true) {
            this.dogCollider.destroy();
            this.catCollider.destroy();
            this.isActive = false;

        }

    }
}