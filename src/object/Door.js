class Door extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, interaction, cat, dog){
        super(scene,x ,y ,'Door');
        this.cat = cat;
        this.dog = dog;
        this.interaction = interaction; // button or lever that opens the door 
        this.scene.physics.collider(this, this.cat); 
        this.scene.physics.collider(this, this.dog);
        this.scene.add.existing(this);
        this.getBody().setCollideWorldBounds(true); 
        this.setPosition(x,y);
        this.opened = true; // the door is currenly blocking path
    }

    Update(){
        this.checkDoor();
    }

    checkDoor(){
        if(this.interaction.getStatus() == true){ // the button or lever is activated 
            if(this.opened == false){ 
                this.openDoor();
            }
            this.opened = true;
        }else{
            if(this.opened == true){
                this.closeDoor();
            }
            this.opened = false;
        }
    }

    openDoor(){ // prob load open door sprite 

    }

    closeDoor(){ // prob remove door sprite so chacaters no longer collide but i need to look more into this 

    }

}