class test extends Phaser.Scene{
    constructor(){
        super("testGame");
    }
    preload(){

        this.load.image("background","assets/background.png")
    }

    create(){

        this.background = this.add.tileSprite(0,0,config.width,config.height,"background");
        this.background.setOrigin(0,0);
    }




}
