
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
        
        /*this.add.image(0, 0, 'cursor').setOrigin(0, 0);
        this.add.image(0, 0, 'wood').setOrigin(200, 200);
        */

        this.title = this.add.text(460, 100, 'The Adventures of Coco and Koko', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
 



    }
    update() {

    }
        
        
       



  
} export default StartMenu;