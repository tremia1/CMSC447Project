

export default class test extends Phaser.Scene{
    constructor(){
        super("test");
    }
    preload(){
        
        this.load.image('tiles', 'assets/tileset/Textures-16.png');
        this.load.image('bg', 'assets/images/background.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/tutorial.json');
       
    }

    create(){
        const map = this.make.tilemap({ key: 'map'});
     

        const tileset = map.addTilesetImage('Textures-16', 'tiles');
  
        const backgroundImage = map.addTilesetImage('background', 'bg')
  
        const background = map.createLayer('Tile Layer 2', backgroundImage);
        const platforms = map.createLayer('Tile Layer 1', tileset);
        platforms.setCollisionByProperty({ collides: true });

        console.log(map.widthInPixels)
        this.cameras.main.setSize(944, 736)
       
        
      

        this.cameras.main.setBounds(0, 0, map.height, map.height);
        this.cameras.main.centerToBounds();
  
        // console.log(this.cameras.main.getBounds())
    }




}
