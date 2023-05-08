class LoadGame extends Phaser.Scene {

    constructor()
	{
        super({ key: 'LoadGame'})
	
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
        

        // Creates the title and the button layout for Load Game

        this.title = this.add.text(this.sys.canvas.width /2-100 , 50, 'Load Game', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);


        async function logJSONData() {
            const response = await fetch('api/users');
            const jsonData = await response.json();
            console.log(jsonData)
            //return jsonData;
          }

        logJSONData()
        this.SaveOne = this.add.image(this.sys.canvas.width / 2 - 150, 100, 'wood').setOrigin(0, 0);
        this.SaveOne.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 130, this.save , { fontSize: '32px', fill: '#000000' });

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

        this.Yaxis = 150;

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
            this.navSound.play()
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
                this.clickedSound.play()
                this.scene.start(this.location);
	
		}
        // Does action said by Button Selected

        
		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{
            this.clickedSound.play()
            if(this.value == 0){
                /*Load save one*/
            }

            else if(this.value == 1){
                 /*Load save two*/
            }

            else if (this.value == 2){
                 /*Load save three*/
            }

            
            else if(this.value == 3){
                 /*Load save four*/
            }

            else if (this.value == 4){
                 /*Load save five*/
            }

		}
        

    }
 
} export default LoadGame;
