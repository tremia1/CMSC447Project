const gameScene = {
    preload: function() {
      this.load.image('background', 'assets/images/cobblestonewall.png');
    },
    create: function() {
        // Create a new sprite for the player
        this.player = this.physics.add.sprite(400, 300, 'player');

        // Set up player input controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up the player's physics properties
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setGravityY(300);

        // Create a group to hold the game's platforms
        this.platforms = this.physics.add.staticGroup();

        // Create some platforms for the player to stand on
        this.platforms.create(400, 568, 'platform').setScale(3).refreshBody();
        this.platforms.create(600, 400, 'platform').setScale(2).refreshBody();
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');

        // Set up collision between the player and the platforms
        this.physics.add.collider(this.player, this.platforms);
    },
    update: function() {
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
    },
};
  
export default gameScene;
  