class GameMenu extends Phaser.Scene {

    constructor()
	{
        super({ key: 'GameMenu'})
	
	}

    init(data){
        // Feeds the key of the menu of where this scene was access from
        this.location = data.location;
    }

    preload() {
        this.load.image('background', 'assets/images/background1.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');
        this.load.image('Back','assets/images/Back.png');
        

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
  
        // Creates the title and the button layout , Score panels,  for LeaderBoard

        this.title = this.add.text(this.sys.canvas.width /2-75, 100, 'GameMenu ', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);
        


        this.question = this.add.text(this.sys.canvas.width /2 - 230, 150, 'What Would You Like to do? ', { fontSize: '32px', fill: '#FFFFFF' });
        this.question.fontWeight = 'bold';
        this.question.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.SaveButton = this.add.image(this.sys.canvas.width / 2 - 120, 200, 'wood').setOrigin(0, 0);
        this.SaveButton.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 220, 'Save Game', { fontSize: '32px', fill: '#000000' });

        this.LoadButton = this.add.image(this.sys.canvas.width / 2 - 120, 300, 'wood').setOrigin(0, 0);
        this.LoadButton.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 320, 'Load Game', { fontSize: '32px', fill: '#000000' });

        this.LeaderBoard = this.add.image(this.sys.canvas.width / 2 - 120, 400, 'wood').setOrigin(0, 0);
        this.LeaderBoard.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 420, 'LeaderBoard', { fontSize: '32px', fill: '#000000' });

        this.QuitGame = this.add.image(this.sys.canvas.width / 2 - 120, 500, 'wood').setOrigin(0, 0);
        this.QuitGame.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 520, 'Quit Game', { fontSize: '32px', fill: '#000000' });

        this.Back = this.add.image(0, this.sys.game.config.height/2 + 120, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);

         // Creates the Selection Cursor 

        this.buttonSelector = this.add.image(this.sys.canvas.width / 2 + 50, 200, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

         // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do

        this.Yaxis = 220;

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
                this.Yaxis = 220;
            }

            else if(this.value == 1){
                this.Yaxis = 320;
            }

            else if (this.value == 2){
                this.Yaxis = 420;
            }

            else if (this.value == 3){
                this.Yaxis = 520;
            }

            this.buttonSelector.setPosition(  this.sys.canvas.width / 2 + 50, this.Yaxis);
            
            

		}
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one

		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.value = this.value + 1;
            
            if(this.value > 3){
                this.value = 0;
            }

            if(this.value == 0){
                this.Yaxis = 220;
            }

            else if(this.value == 1){
                this.Yaxis = 320;
            }

            else if (this.value == 2){
                this.Yaxis = 420;
            }

            else if (this.value == 3){
                this.Yaxis = 520;
            } 

            this.buttonSelector.setPosition(  this.sys.canvas.width / 2 + 50, this.Yaxis );
	
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
        
		{       this.scene.resume(this.location);
                this.scene.stop();
                // this.scene.start(this.location);
	
		}
        

    }
 
} export default GameMenu;