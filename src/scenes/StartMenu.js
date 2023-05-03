class StartMenu extends Phaser.Scene {

    constructor()
	{
        super({ key: 'StartMenu'})
	
	}
    preload() {
        this.load.image('background', 'assets/images/background1.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');

        

    }

    create() {

        // Creates Cursor and Spacebar input and Background

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.backgroundImage = this.add.image(0, 0, 'background');
        this.backgroundImage.displayHeight = this.sys.game.config.height;
        this.backgroundImage.displayWidth = this.sys.game.config.width;
        this.backgroundImage.scaleX = this.backgroundImage.scaleY
        this.backgroundImage.y = this.sys.game.config.height/2;
        this.backgroundImage.x = this.sys.game.config.width /2;
  
        

        // Creates the title and the button layout for start Menu
        this.title = this.add.text(this.sys.canvas.width /2 - 300, 100, 'The Adventures of Coco and Koko', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.StartButton = this.add.image(this.sys.canvas.width / 2 - 130, 300, 'wood').setOrigin(0, 0);
        this.StartButton.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 120, 320, 'Start Game', { fontSize: '32px', fill: '#000000' });

        this.LoadButton = this.add.image(this.sys.canvas.width / 2 - 130, 400, 'wood').setOrigin(0, 0);
        this.LoadButton.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 120, 420, 'Load Game', { fontSize: '32px', fill: '#000000' });

        this.LeaderBoard = this.add.image(this.sys.canvas.width / 2 - 130, 500, 'wood').setOrigin(0, 0);
        this.LeaderBoard.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 120, 520, 'LeaderBoard', { fontSize: '32px', fill: '#000000' });

        // Creates the Selection Cursor 
        this.buttonSelector = this.add.image(this.sys.canvas.width / 2 + 50, 325, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)


        // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do
        this.Yaxis = 250;

        this.value = 0;



    }


    update() {

		// Makes the selection cursor goes  up from each button and when it reach top button it loop back to bottom one
		if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
		{
            this.value = this.value - 1;

            if(this.value < 0){
                this.value = 2;
            }

            if(this.value == 0){
                this.Yaxis = 325;
            }

            else if(this.value == 1){
                this.Yaxis = 415;
            }

            else if (this.value == 2){
                this.Yaxis = 525;
            }

            this.buttonSelector.setPosition( this.sys.canvas.width / 2 + 50, this.Yaxis);
            
            

		}
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one
		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.value = this.value + 1;
            
            if(this.value > 2){
                this.value = 0;
            }

            if(this.value == 0){
                this.Yaxis = 325;
            }

            else if(this.value == 1){
                this.Yaxis = 415;
            }

            else if (this.value == 2){
                this.Yaxis = 525;
            }
            
            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 50, this.Yaxis );
	
		}

        // Goes to a scene based on button selection, feed location so user can come back
		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{

            if(this.value == 0){
                this.scene.start('Tutorial', {Time: 0});
            }

            else if(this.value == 1){
                this.Yaxis = 400;
                this.scene.start('LoadGame',{ "location": 'StartMenu' });
            }

            else if (this.value == 2){
                this.Yaxis = 500;
                this.scene.start('LeaderBoard',{ "location": 'StartMenu' });
                
            }

		}
        

    }
 
} export default StartMenu;