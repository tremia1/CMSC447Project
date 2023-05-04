class QuitMenu extends Phaser.Scene {

    constructor()
	{
        super({ key: 'Quit'})
	
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

        // Creates the title and the button layout for Quit Menu

        this.title = this.add.text(660, 100, 'Quit Game ?', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.Yes = this.add.image(650, 250, 'wood').setOrigin(0, 0);
        this.Yes.setScale(.03);
        this.add.text(670, 250, 'Yes', { fontSize: '32px', fill: '#000000' });

        this.No = this.add.image(650, 350, 'wood').setOrigin(0, 0);
        this.No.setScale(.03);
        this.add.text(670, 350, 'No', { fontSize: '32px', fill: '#000000' });

        this.Save = this.add.image(650, 450, 'wood').setOrigin(0, 0);
        this.Save.setScale(.03);
        this.add.text(670, 450, 'Save Game', { fontSize: '32px', fill: '#000000' });

        //Creates Back Buttton
        this.Back = this.add.image(100, 630, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);

         // Creates the Selection Cursor 

        this.buttonSelector = this.add.image(850, 250, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

        // Yaxis is used for movement of Selection cursor and value is for the chooosing which button to do

        this.Yaxis = 250;

        this.value = 0;

        var soundManager = this.scene.get('StartMenu').sound;
        // set selected sound
        this.clickedSound = soundManager.get('clickedSound') || this.sound.add('clickedSound', { loop: false })
        // set cursor moving music
        this.navSound = soundManager.get('navigateSound') || this.sound.add('navigateSound', { loop: false })

   


    }
    update() {

  

		// Makes the selection cursor goes  up from each button and when it reach top button it loop back to bottom one

		if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
		{
            this.navSound.play()
            this.value = this.value - 1;

            if(this.value < 0){
                this.value = 2;
            }

            if(this.value == 0){
                this.Yaxis = 250;
            }

            else if(this.value == 1){
                this.Yaxis = 350;
            }

            else if (this.value == 2){
                this.Yaxis = 450;
            }




            this.buttonSelector.setPosition(  850, this.Yaxis);
            
            

		}
        // Makes the selection cursor goes down  from each button and when it reach last button it loop back to top one

		else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
		{   
            this.navSound.play()
            this.value = this.value + 1;
            
            if(this.value > 2){
                this.value = 0;
            }

            if(this.value == 0){
                this.Yaxis = 250;
            }

            else if(this.value == 1){
                this.Yaxis = 350;
            }

            else if (this.value == 2){
                this.Yaxis = 450;
            }

            this.buttonSelector.setPosition(  850, this.Yaxis );
	
		}
        // Goes back to the previous scene determine by Location

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
		{   
            this.clickedSound.play()
            this.scene.start(this.location);
	
		}

        // Does action said by Button Selected

		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{
            this.clickedSound.play()

            if(this.value == 0){
                this.scene.start('StartMenu');
            }

            else if(this.value == 1){
                this.scene.start('GameMenu');
            }

            else if (this.value == 2){
                this.scene.start('SaveGame' ,{ "location": 'Quit' });
            }

            


		}
        

    }
 
} export default QuitMenu;