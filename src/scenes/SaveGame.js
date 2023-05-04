class SaveGame extends Phaser.Scene {

    constructor()
	{
        super({ key: 'SaveGame'})
	
	}

    
    init(data){
        // Feeds the key of the menu of where this scene was assess from
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
        this.backgroundImage.scaleX = this.backgroundImage.scaleY;
        this.backgroundImage.y = this.sys.game.config.height/2;
        this.backgroundImage.x = this.sys.game.config.width /2;
       

       // Creates the title and the button layout for Saveing Games

       this.title = this.add.text(this.sys.canvas.width /2 - 300, 60, 'The Adventures of Coco and Koko', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.SaveOne = this.add.image(this.sys.canvas.width / 2 - 150, 100, 'wood').setOrigin(0, 0);
        this.SaveOne.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 130, 'SaveOne', { fontSize: '32px', fill: '#000000' });

        this.SaveTwo = this.add.image(this.sys.canvas.width / 2 - 150, 200, 'wood').setOrigin(0, 0);
        this.SaveTwo.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 230, 'SaveTwo', { fontSize: '32px', fill: '#000000' });

        this.SaveThree = this.add.image(this.sys.canvas.width / 2 - 150, 300, 'wood').setOrigin(0, 0);
        this.SaveThree.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 330, 'SaveThree', { fontSize: '32px', fill: '#000000' });

        this.SaveFour = this.add.image(this.sys.canvas.width / 2 - 150, 400, 'wood').setOrigin(0, 0);
        this.SaveFour.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 430, 'SaveFour', { fontSize: '32px', fill: '#000000' });

        this.SaveFive = this.add.image(this.sys.canvas.width / 2 - 150, 500, 'wood').setOrigin(0, 0);
        this.SaveFive.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100,530, 'SaveFive', { fontSize: '32px', fill: '#000000' });

        //Creates Back Buttton
        this.Back = this.add.image(0, this.sys.game.config.height/2 + 150, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);

        // Creates the Selection Cursor 
        this.buttonSelector = this.add.image(this.sys.canvas.width / 2 + 30, 120, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

        // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do

        this.Yaxis = 120;

        this.value = 0;



   


    }
    update() {

  

		// Makes the selection cursor goes  up from each button and when it reach top button it loop back to bottom one

		if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
		{
            this.value = this.value - 1;

            if(this.value < 0){
                this.value = 4;
            }

            if(this.value == 0){
                this.Yaxis = 120;
            }

            else if(this.value == 1){
                this.Yaxis = 220;
            }

            else if (this.value == 2){
                this.Yaxis = 320;
            }

            else if(this.value == 3){
                this.Yaxis = 420;
            }

            else if (this.value == 4){
                this.Yaxis = 520;
            }

            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 30, this.Yaxis);
            
            

		}
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one
		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.value = this.value + 1;
            
            if(this.value > 4){
                this.value = 0;
            }

            if(this.value == 0){
                this.Yaxis = 120;
            }

            else if(this.value == 1){
                this.Yaxis = 220;
            }

            else if (this.value == 2){
                this.Yaxis = 320;
            }

            else if(this.value == 3){
                this.Yaxis = 420;
            }

            else if (this.value == 4){
                this.Yaxis = 520;
            }

            this.buttonSelector.setPosition(this.sys.canvas.width / 2 + 30, this.Yaxis );
	
		}
        // Goes back to the previous scene determine by Location
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
		{   
                this.scene.start(this.location);
	
		}

        // Save at chosen button using value 
		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{

            if(this.value == 0){
                /*save  at one*/
            }

            else if(this.value == 1){
                 /*save  at  two*/
            }

            else if (this.value == 2){
                 /*save  at  three*/
            }

            
            else if(this.value == 3){
                 /*save  at four*/
            }

            else if (this.value == 4){
                 /*save  at  five*/
            }

		}
        

    }
 
} export default SaveGame;