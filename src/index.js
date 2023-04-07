/* Config object contains game settings, such as game width, height, physics engine, and scenes.
Creates a Phaser game object with the given config, then defines three functions (preload, create, update)
to be called by Phaser at various points in the game. */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'assets/images/background.png');
}


function create () {
    // Create a new sprite for the player
    this.player = this.physics.add.sprite(400, 300, 'player');
  
    // Set up the player's physics properties
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);
    this.player.setGravityY(300);
  
    // Create a group to hold the game's platforms
    this.platforms = this.physics.add.staticGroup();
  
    // Create some platforms for the player to stand on
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
  
    // Set up collision between the player and the platforms
    this.physics.add.collider(this.player, this.platforms);
  }
  
  function update () {
    // Check for player input and move the player accordingly
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
  
    // Make the player jump if they're touching the ground
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-450);
    }
  }
  
