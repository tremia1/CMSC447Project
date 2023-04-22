
class SaveGame extends Phaser.Scene {

    constructor()
	{
        super({ key: 'SaveGame'})
	
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
        


        this.title = this.add.text(660, 100, 'Save Game', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.SaveOne = this.add.image(650, 150, 'wood').setOrigin(0, 0);
        this.SaveOne.setScale(.03);
        this.add.text(670, 170, 'SaveOne', { fontSize: '32px', fill: '#000000' });

        this.SaveTwo = this.add.image(650, 250, 'wood').setOrigin(0, 0);
        this.SaveTwo.setScale(.03);
        this.add.text(670, 270, 'SaveTwo', { fontSize: '32px', fill: '#000000' });

        this.SaveThree = this.add.image(650, 350, 'wood').setOrigin(0, 0);
        this.SaveThree.setScale(.03);
        this.add.text(670, 370, 'SaveThree', { fontSize: '32px', fill: '#000000' });

        this.SaveFour = this.add.image(650, 450, 'wood').setOrigin(0, 0);
        this.SaveFour.setScale(.03);
        this.add.text(670, 470, 'SaveFour', { fontSize: '32px', fill: '#000000' });

        this.SaveFive = this.add.image(650, 550, 'wood').setOrigin(0, 0);
        this.SaveFive.setScale(.03);
        this.add.text(670,570, 'SaveFive', { fontSize: '32px', fill: '#000000' });


        this.buttonSelector = this.add.image(850, 150, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

        this.Yaxis = 150;

        this.value = 0;



   


    }
    update() {

  

		
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