
class StartMenu extends Phaser.Scene {

    constructor()
	{
		super('StartMenu')
	}
    preload() {
        this.load.image('background', 'assets/images/background.png');

        this.load.image('cursor','assets/images/cursor.png');
        this.load.image('wood','assets/images/wood.png');

        

    }



    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;
        


        this.title = this.add.text(460, 100, 'The Adventures of Coco and Koko', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.StartButton = this.add.image(650, 300, 'wood').setOrigin(0, 0);
        this.StartButton.setScale(.03);
        this.add.text(670, 320, 'Start Game', { fontSize: '32px', fill: '#000000' });

        this.LoadButton = this.add.image(650, 400, 'wood').setOrigin(0, 0);
        this.LoadButton.setScale(.03);
        this.add.text(670, 420, 'Load Game', { fontSize: '32px', fill: '#000000' });

        this.LeaderBoard = this.add.image(650, 500, 'wood').setOrigin(0, 0);
        this.LeaderBoard.setScale(.03);
        this.add.text(670, 520, 'LeaderBoard', { fontSize: '32px', fill: '#000000' });

        this.buttonSelector = this.add.image(850, 250, 'cursor').setOrigin(0, 0);
        this.buttonSelector.setScale(.4)

        this.Yaxis = 250;

        this.value = 0;


      
        /*
        var buttons = [];
        this.selectedButtonIndex = 0;
        this.buttons.push(this.StartButton);
        this.buttons.push(this.LoadButton);
        this.buttons.push(this.LeaderBoard);
 
        this.selectButton(0);
        */
   


    }
    update() {

  

		
		if (this.cursors.up.isDown)
		{
            this.value = this.value - 1;
            this.Yaxis = this.Yaxis  - 100;

            this.buttonSelector.setPosition(  850, this.Yaxis);
            
            

		}
		else if (this.cursors.down.isDown)
		{   
            this.value = this.value + 1;
            this.Yaxis = this.Yaxis  + 100;
            this.buttonSelector.setPosition(  850, this.Yaxis );
	
		}
		else if (this.cursors.space.isDown)
		{

		}
        

    }
/*
    selectButton(index){
	const currentButton = this.buttons[this.selectedButtonIndex];

	// set the current selected button to a white tint
	this.currentButton.setTint(0xffffff);

	this.button = this.buttons[index];

	// set the newly selected button to a green tint
	this.button.setTint(0x66ff7f);

	// move the hand cursor to the right edge
	this.buttonSelector.x = button.x + button.displayWidth * 0.5;
	this.buttonSelector.y = button.y + 10;

	// store the new selected index
	this.selectedButtonIndex = index;
}
        
        
selectNextButton(number)
{
	let index = this.selectedButtonIndex + number;

	// wrap the index to the front or end of array
	if (index >= this.buttons.length)
	{
		index = 0;
	}
	else if (index < 0)
	{
		index = this.buttons.length - 1;
	}

	this.selectButton(index);
}       

confirmSelection()
{
	// get the currently selected button
	button = this.buttons[this.selectedButtonIndex];

	// emit the 'selected' event
	button.emit('selected');
}

*/  
} export default StartMenu;