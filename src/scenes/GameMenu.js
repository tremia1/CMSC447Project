
class GameMenu extends Phaser.Scene {

    constructor()
	{
        super({ key: 'GameMenu'})
	
	}

    init(data){
        // Feeds the key of the menu of where this scene was assess from
        this.location = data.location;
    }

    preload() {
        this.load.image('background', 'assets/images/background.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');
        this.load.image('Back','assets/images/Back.png');
        

    }



    create() {

        // Creates Cursor and Spacebar input and Background

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.backgroundImage = this.add.image(0, 0, 'background');
        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;
        this.backgroundImage.setScale( 8);

        // Creates the title and the button layout , Score panels,  for LeaderBoard

        this.title = this.add.text(660, 100, 'GameMenu ', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);
        


        this.question = this.add.text(520, 150, 'What Would You Like to do? ', { fontSize: '32px', fill: '#FFFFFF' });
        this.question.fontWeight = 'bold';
        this.question.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.SaveButton = this.add.image(650, 200, 'wood').setOrigin(0, 0);
        this.SaveButton.setScale(.03);
        this.add.text(670, 220, 'Save Game', { fontSize: '32px', fill: '#000000' });

        this.LoadButton = this.add.image(650, 300, 'wood').setOrigin(0, 0);
        this.LoadButton.setScale(.03);
        this.add.text(670, 320, 'Load Game', { fontSize: '32px', fill: '#000000' });

        this.LeaderBoard = this.add.image(650, 400, 'wood').setOrigin(0, 0);
        this.LeaderBoard.setScale(.03);
        this.add.text(670, 420, 'LeaderBoard', { fontSize: '32px', fill: '#000000' });

        this.QuitGame = this.add.image(650, 500, 'wood').setOrigin(0, 0);
        this.QuitGame.setScale(.03);
        this.add.text(670, 520, 'Quit Game', { fontSize: '32px', fill: '#000000' });

        this.Back = this.add.image(100, 630, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);

         // Creates the Selection Cursor 

        this.buttonSelector = this.add.image(850, 200, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

         // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do

        this.Yaxis = 200;

        this.value = 0;



   


    }
    update() {

  
        // Makes the selection cursor goes  up from each button and when it reach top button it loop back to bottom one

		
		if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
		{
            this.value = this.value - 1;

            if(this.value < 0){
                this.value = 3;
            }

            if(this.value == 0){
                this.Yaxis = 200;
            }

            else if(this.value == 1){
                this.Yaxis = 300;
            }

            else if (this.value == 2){
                this.Yaxis = 400;
            }

            else if (this.value == 3){
                this.Yaxis = 500;
            }

            this.buttonSelector.setPosition(  850, this.Yaxis);
            
            

		}
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one

		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.value = this.value + 1;
            
            if(this.value > 3){
                this.value = 0;
            }

            if(this.value == 0){
                this.Yaxis = 200;
            }

            else if(this.value == 1){
                this.Yaxis = 300;
            }

            else if (this.value == 2){
                this.Yaxis = 400;
            }

            else if (this.value == 3){
                this.Yaxis = 500;
            } 

            this.buttonSelector.setPosition(  850, this.Yaxis );
	
		}

        // Does action said by Button Selected

		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{

            if(this.value == 0){
                this.scene.start('SaveGame' ,{ "location": 'GameMenu' });
            }

            else if(this.value == 1){
                this.Yaxis = 400;
                this.scene.start('LoadGame' ,{ "location": 'GameMenu' });
            }

            else if (this.value == 2){
                this.Yaxis = 500;
                this.scene.start('LeaderBoard' ,{ "location": 'GameMenu' });
                
            }

            else if (this.value == 3){
                this.Yaxis = 500;
                this.scene.start('Quit',{ "location": 'GameMenu' });
                
            }


		}

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
		{   
                this.scene.start(this.location);
	
		}
        

    }
 
} export default GameMenu;