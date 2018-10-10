/**
* @description 表示物体，Enemy和Player的父类
* @constructor
* @param {string} sprite - 图片地址
* @param {number} x - 在x轴上的位置
* @param {number} y - 在y轴上的位置
*/
var Entity = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

/**
* @description 将Entity在画布上画出来
*/
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
* @description 表示敌人
* @constructor
* @param {number} x - 敌人在x轴上的位置
* @param {number} y - 敌人在y轴上的位置
* @param {number} speed - 敌人的速度
*/
var Enemy = function(x, y, speed) {
    var sprite = 'images/enemy-bug.png';
    //继承Entity的变量
    Entity.call(this, sprite, x, y);
    this.speed = speed;
};

//继承Entity的方法
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
* @description 更新敌人，每次移动都乘以dt，以此来保证游戏在所有电脑上都是以同样的速度运行的
* @param {number} dt - 时间间隙
*/
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
};
/**
* @description 重置敌人
*/
Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = Math.floor(Math.random() * 3) * 83 + 55;
    this.speed = Math.random() * 200 + 300;
}

/**
* @description 表示玩家
* @constructor
* @param {number} x - 敌人在x轴上的位置
* @param {number} y - 敌人在y轴上的位置
*/
var Player = function(x, y) {
  var sprite = 'images/char-boy.png';
  //继承Entity的变量
  Entity.call(this, sprite, x, y);
};
//继承Entity的方法
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

//更新玩家状态
Player.prototype.update = function() {};

//重置玩家
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 83 * 4 + 55;
}

/**
* @description 处理键盘输入，使得玩家可以控制精灵
* @param {string} movement - 移动的命令
*/
Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'left':
            if (this.x - 50 > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y - 50 > 0) {
               this.y -= 83;
               if (this.y - 50 < 0) {
                showWin();
                player.reset();
               }
            }
            break;
        case 'right':
            if (this.x + 101 < 505) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y + 83 < 400) {
                this.y +=83;
            }
            break;
    };
};

// 生成三个敌人的对象，并把它们都放进一个叫 allEnemies 的数组里面
var allEnemies = [
    new Enemy(0, Math.floor(Math.random() * 3) * 83 + 55, Math.random() * 200 + 300),
    new Enemy(0, Math.floor(Math.random() * 3) * 83 + 55, Math.random() * 200 + 300),
    new Enemy(0, Math.floor(Math.random() * 3) * 83 + 55, Math.random() * 200 + 300)
];
// 生成一个玩家对象，并放进一个叫 player 的变量里面
var player = new Player(202, 83 * 4 + 55);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
* @description 胜利时进行的动作
*/
var showWin = function() {
    console.log('win');
    ctx.font = '40px Arial';
    ctx.fillText('Win!', 200, 40);
}