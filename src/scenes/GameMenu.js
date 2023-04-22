
class GameMenu extends Phaser.Scene {

    constructor()
	{
        super({ key: 'GameMenu'})
	
	}
    preload() {
        this.load.image('background', 'assets/images/background.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');

        

    }



    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;
        


        this.title = this.add.text(460, 100, 'The Adventures of Coco and Koko', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.StartButton = this.add.image(650, 300, 'wood').setOrigin(0, 0);
        this.StartButton.setScale(.03);
        this.add.text(670, 320, 'Start Game', { fontSize: '32px', fill: '#000000' });

        this.LoadButton = this.add.image(650, 400, 'wood').setOrigin(0, 0);
        this.LoadButton.setScale(.03);
        this.add.text(670, 420, 'Load Game', { fontSize: '32px', fill: '#000000' });

        this.LeaderBoard = this.add.image(650, 500, 'wood').setOrigin(0, 0);
        this.LeaderBoard.setScale(.03);
        this.add.text(670, 520, 'LeaderBoard', { fontSize: '32px', fill: '#000000' });

        this.buttonSelector = this.add.image(850, 250, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

        this.Yaxis = 250;

        this.value = 0;



   


    }
    update() {

  

		
		if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
		{
            this.value = this.value - 1;

            if(this.value < 0){
                this.value = 0;
            }
            if(this.value == 0){
                this.Yaxis = 250;
            }

            else if(this.value == 1){
                this.Yaxis = 400;
            }
            else if (this.value == 2){
                this.Yaxis = 500
            }

            this.buttonSelector.setPosition(  850, this.Yaxis);
            
            

		}
		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.value = this.value + 1;
            
            if(this.value > 2){
                this.value = 2;
            }
            if(this.value == 0){
                this.Yaxis = 250;
            }

            else if(this.value == 1){
                this.Yaxis = 400;
            }
            else if (this.value == 2){
                this.Yaxis = 500
            }
            this.buttonSelector.setPosition(  850, this.Yaxis );
	
		}
		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{

            if(this.value == 0){
                this.scene.start('Tutorial');
            }

            else if(this.value == 1){
                this.Yaxis = 400;
            }
            else if (this.value == 2){
                this.Yaxis = 500
            }

		}
        

    }
 
} export default GameMenu;