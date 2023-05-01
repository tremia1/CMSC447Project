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
        

       // Creates the title and the button layout for Saveing Games

        this.title = this.add.text(660, 100, 'Save Game', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        (async () => {
            this.saveone = fetch('/GetSave/4');
            console.log(this.saveone); // {"metadata": "for: test.png"}
        })();

        

        this.SaveOne = this.add.image(650, 150, 'wood').setOrigin(0, 0);
        this.SaveOne.setScale(.03);
        this.add.text(670, 170, this.saveone , { fontSize: '32px', fill: '#000000' });

        this.SaveTwo = this.add.image(650, 250, 'wood').setOrigin(0, 0);
        this.SaveTwo.setScale(.03);
        this.add.text(670, 270, 'Save Two', { fontSize: '32px', fill: '#000000' });

        this.SaveThree = this.add.image(650, 350, 'wood').setOrigin(0, 0);
        this.SaveThree.setScale(.03);
        this.add.text(670, 370, 'Save Three', { fontSize: '32px', fill: '#000000' });

        this.SaveFour = this.add.image(650, 450, 'wood').setOrigin(0, 0);
        this.SaveFour.setScale(.03);
        this.add.text(670, 470, 'Save Four', { fontSize: '32px', fill: '#000000' });

        this.SaveFive = this.add.image(650, 550, 'wood').setOrigin(0, 0);
        this.SaveFive.setScale(.03);
        this.add.text(670,570, 'Save Five', { fontSize: '32px', fill: '#000000' });

        //Creates Back Buttton
        this.Back = this.add.image(100, 700, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);

        // Creates the Selection Cursor 
        this.buttonSelector = this.add.image(850, 150, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

        // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do

        this.Yaxis = 150;

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
                this.Yaxis = 170;
            }

            else if(this.value == 1){
                this.Yaxis = 270;
            }

            else if (this.value == 2){
                this.Yaxis = 370;
            }

            else if(this.value == 3){
                this.Yaxis = 470;
            }

            else if (this.value == 4){
                this.Yaxis = 570;
            }

            this.buttonSelector.setPosition(  850, this.Yaxis);
            
            

		}
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one
		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.value = this.value + 1;
            
            if(this.value > 4){
                this.value = 0;
            }

            if(this.value == 0){
                this.Yaxis = 170;
            }

            else if(this.value == 1){
                this.Yaxis = 270;
            }

            else if (this.value == 2){
                this.Yaxis = 370;
            }

            else if(this.value == 3){
                this.Yaxis = 470;
            }

            else if (this.value == 4){
                this.Yaxis = 570;
            }

            this.buttonSelector.setPosition(  850, this.Yaxis );
	
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