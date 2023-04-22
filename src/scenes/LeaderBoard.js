
class LeaderBoard extends Phaser.Scene {

    constructor()
	{
        super({ key: 'LeaderBoard'})
	
	}

    init(data){
        this.location = data.location;
    }


    preload() {
        this.load.image('background', 'assets/images/background.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');
        this.load.image('Back','assets/images/Back.png');


        

    }



    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;
        


        this.title = this.add.text(660, 100, 'LeaderBoard', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.NumberOne = this.add.image(650, 150, 'wood').setOrigin(0, 0);
        this.NumberOne.setScale(.03);
        this.add.text(660, 170, '1. ', { fontSize: '32px', fill: '#000000' });

        this.NumberTwo = this.add.image(650, 250, 'wood').setOrigin(0, 0);
        this.NumberTwo.setScale(.03);
        this.add.text(660, 270, '2. ', { fontSize: '32px', fill: '#000000' });

        this.NumberThree = this.add.image(650, 350, 'wood').setOrigin(0, 0);
        this.NumberThree.setScale(.03);
        this.add.text(660, 370, '3.', { fontSize: '32px', fill: '#000000' });

        this.NumberFour = this.add.image(650, 450, 'wood').setOrigin(0, 0);
        this.NumberFour.setScale(.03);
        this.add.text(670, 470, '4. ', { fontSize: '32px', fill: '#000000' });

        this.NumberFive = this.add.image(650, 550, 'wood').setOrigin(0, 0);
        this.NumberFive.setScale(.03);
        this.add.text(670,570, '5. ', { fontSize: '32px', fill: '#000000' });

        this.Back = this.add.image(950, 500, 'Back').setOrigin(0, 0);
        this.Back.setScale(.2);


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
                this.value = 5;
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
            
            if(this.value > 5){
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

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
		{   
                this.scene.start(this.location);
	
		}
        
		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{

            if(this.value == 0){
                /*View number one*/
            }

            else if(this.value == 1){
                 /*View number two*/
            }
            else if (this.value == 2){
                 /*View number three*/
            }

            
            else if(this.value == 3){
                 /*View number  four*/
            }
            else if (this.value == 4){
                 /*View number five*/
            }

		}
        

    }
 
} export default LeaderBoard;