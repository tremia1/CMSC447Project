
class QuitMenu extends Phaser.Scene {

    constructor()
	{
        super({ key: 'Quit'})
	
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
                this.Yaxis = 350;
            }
            else if (this.value == 2){
                this.Yaxis = 450;
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
                this.Yaxis = 350;
            }
            else if (this.value == 2){
                this.Yaxis = 450;
            }

            this.buttonSelector.setPosition(  850, this.Yaxis );
	
		}
		else if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{

            if(this.value == 0){
                this.scene.start('StartMenu');
            }

            else if(this.value == 1){
                this.scene.start('GameMenu');
            }
            else if (this.value == 2){
                this.scene.start('SaveGame');
            }

            


		}
        

    }
 
} export default QuitMenu;