class MusicScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MusicScene', active: true });
    }
  
    preload() {
      this.load.audio('backgroundMusic', 'assets/sounds/GameMenu.mp3');
    }
  
    create() {
      this.music = this.sound.add('backgroundMusic', { loop: true });
      this.music.play();
    }
  }export default MusicScene;