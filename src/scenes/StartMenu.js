
class StartMenu extends Phaser.Scene {

    constructor()
	{
		super('StartMenu')
	}
    preload() {
        this.load.image('background', 'assets/images/background.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');


    }
    create() {
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;
 



    }
    update() {

    }
        
        
       



  
} export default StartMenu;