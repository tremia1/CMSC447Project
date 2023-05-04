class LeaderBoard extends Phaser.Scene {

    constructor()
	{
        super({ key: 'LeaderBoard'})
	
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
        this.backgroundImage.scaleX = this.backgroundImage.scaleY
        this.backgroundImage.y = this.sys.game.config.height/2;
        this.backgroundImage.x = this.sys.game.config.width /2;

         // Creates the title and the button layout , Score panels,  for LeaderBoard


        this.title = this.add.text(this.sys.canvas.width / 2 - 100, 50, 'LeaderBoard', { fontSize: '32px', fill: '#FFFFFF' });
        this.title.fontWeight = 'bold';
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 20);

        this.NumberOne = this.add.image(this.sys.canvas.width / 2 - 130, 100, 'wood').setOrigin(0, 0);
        this.NumberOne.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 130, '1. ', { fontSize: '32px', fill: '#000000' });

        this.NumberTwo = this.add.image(this.sys.canvas.width / 2 - 130, 200, 'wood').setOrigin(0, 0);
        this.NumberTwo.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 230, '2. ', { fontSize: '32px', fill: '#000000' });

        this.NumberThree = this.add.image(this.sys.canvas.width / 2 - 130, 300, 'wood').setOrigin(0, 0);
        this.NumberThree.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 330, '3.', { fontSize: '32px', fill: '#000000' });

        this.NumberFour = this.add.image(this.sys.canvas.width / 2 - 130, 400, 'wood').setOrigin(0, 0);
        this.NumberFour.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100, 430, '4. ', { fontSize: '32px', fill: '#000000' });

        this.NumberFive = this.add.image(this.sys.canvas.width / 2 - 130, 500, 'wood').setOrigin(0, 0);
        this.NumberFive.setScale(.03);
        this.add.text(this.sys.canvas.width / 2 - 100,530, '5. ', { fontSize: '32px', fill: '#000000' });

        //Creates Back Buttton

        this.Back = this.add.image(100, 630, 'Back').setOrigin(0, 0);
        this.Back.setScale(.3);
  
 



   


    }
    update() {

        // Goes back to the previous scene determine by Location

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
		{   
                this.scene.start(this.location);
	
		}
   
        

    }
 
} export default LeaderBoard;