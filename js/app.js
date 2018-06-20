const playerImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'];
for (let i=0; i<playerImages.length; i++) {
    const playerAvatar = document.createElement('img');
    playerAvatar.src = playerImages[i];
    playerAvatar.classList.add('player');
    document.body.appendChild(playerAvatar);
    playerAvatar.addEventListener('click', function() {
        player.sprite = playerImages[i];
    })
}
    const space = document.createElement('p');
    document.body.appendChild(space);

// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt) {
        this.x += this.speed * dt;
      if (this.x > 505) {
           this.x = -100;
           this.speed = 100 + Math.floor(Math.random() * 1000);
      }
          // collision detect between player and enemies
      if (player.x + 37 > this.x &&
          player.x < this.x + 60 &&
          player.y + 30 > this.y &&
          player.y < this.y + 25) {
        player.x = 200;
        player.y = 380;
      }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.sprite = 'images/char-pink-girl.png';
    }
    update() {
         if (this.y > 420) {
         this.y =380;
         };
         if (this.x > 500) {
         this.x = 400;
         };
         if (this.x < 0) {
         this.x = 0;
         };
     // player reaching top of canvas and winning the game, go back to origin
         if (this.y < 0) {
             let that = this;
           setTimeout(function() {  
              that.x = 200;
              that.y = 380;
            }, 400);
         };
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyPress) {
        if (keyPress == 'left' && this.x >0) {
            this.x -= 102;
        };
        if (keyPress == 'right' && this.x < 400) {
            this.x += 102;
        };
        if (keyPress == 'up' && this.y > 0 ) {
            this.y -= 83;
        };
        if (keyPress == 'down' && this.y < 400) {
            this.y += 83;
        };
    }
}   

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

// Position "y" where the enemies will are created
let enemyYposition = [64, 148, 230];
let player = new Player(200, 380);
let enemy;

enemyYposition.forEach(function(yPos) {
 enemy = new Enemy(0, yPos, 100 + Math.floor(Math.random() * 1000));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

