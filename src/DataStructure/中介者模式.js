/**
 * @Description:
 * @Author: qingge
 * @Date 2019-06-08 00:39
 */

/*
 * 中介者模式的定义：
 * 通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用，
 * 当其中的一个对象发生改变时，只需要通知中介者对象即可。
 * 通过中介者模式可以解除对象与对象之间的紧耦合关系。
 *
 * 例如：现实生活中，航线上的飞机只需要和机场的塔台通信就能确定航线和飞行状态，而不需要和所有飞机通信。
 * 同时塔台作为中介者，知道每架飞机的飞行状态，所以可以安排所有飞机的起降和航线安排。
 *
 * 例如购物车需求，存在商品选择表单、颜色选择表单、购买数量表单等等，都会触发change事件，
 * 那么可以通过中介者来转发处理这些事件，实现各个事件间的解耦，仅仅维护中介者对象即可。
 *
 * 系统中会新增一个中介者对象，因为对象之间交互的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。中介者对象自身往往就是一个难以维护的对象。
 *
 * 中介者模式适用的场景：
 * 一般来说，如果对象之间的复杂耦合确实导致调用和维护出现了困难，而且这些耦合度随项目的变化呈指数增长曲线，那就可以考虑用中介者模式来重构代码。
 * */

const playerDirector = (function () {
  const players = {};
  const operations = {};
  /****************新增一个玩家***************************/
  operations.addPlayer = function (player) {
    const teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  };
  /****************移除一个玩家***************************/
  operations.removePlayer = function (player) {
    let teamColor = player.teamColor, // 玩家的队伍颜色
      teamPlayers = players[teamColor] || []; // 该队伍所有成员
    for (let i = teamPlayers.length - 1; i >= 0; i--) {
      // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
        break;
      }
    }
  };
  /****************玩家换队***************************/
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };
  /****************玩家死亡***************************/
  operations.playerDead = function (player) {
    const teamColor = player.teamColor;
    const teamPlayers = players[teamColor];
    let all_dead = true;
    for (let i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }
    if (all_dead === true) {
      // 全部死亡
      for (let i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose(); // 本队所有玩家lose
      }

      for (let color in players) {
        if (color !== teamColor) {
          let teamPlayers = players[color]; // 其他队伍的玩家
          for (let i = 0, player; (player = teamPlayers[i++]); ) {
            player.win(); // 其他队伍所有玩家win
          }
        }
      }
    }
  };
  let ReceiveMessage = function (...args) {
    let message = Array.prototype.shift.call(args); // arguments的第一个参数为消息名称
    operations[message].apply(this, args);
  };
  return {
    ReceiveMessage: ReceiveMessage,
  };
})();

function Player(name, teamColor) {
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
  this.state = 'alive'; // 玩家生存状态
}

Player.prototype.win = function () {
  console.log(this.name + ' won ');
};

Player.prototype.lose = function () {
  console.log(this.name + ' lost');
};

/*******************玩家死亡*****************/

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.ReceiveMessage('playerDead', this); // 给中介者发送消息，玩家死亡
};

/*******************移除玩家*****************/

Player.prototype.remove = function () {
  playerDirector.ReceiveMessage('removePlayer', this); // 给中介者发送消息，移除一个玩家
};

/*******************玩家换队*****************/

Player.prototype.changeTeam = function (color) {
  playerDirector.ReceiveMessage('changeTeam', this, color); // 给中介者发送消息，玩家换队
};

let playerFactory = function (name, teamColor) {
  let newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象
  playerDirector.ReceiveMessage('addPlayer', newPlayer); // 给中介者发送消息，新增玩家

  return newPlayer;
};

// 红队：
let player1 = playerFactory('皮蛋', 'red'),
  player2 = playerFactory('小乖', 'red'),
  player3 = playerFactory('宝宝', 'red'),
  player4 = playerFactory('小强', 'red');

// 蓝队：
let player5 = playerFactory('黑妞', 'blue'),
  player6 = playerFactory('葱头', 'blue'),
  player7 = playerFactory('胖墩', 'blue'),
  player8 = playerFactory('海盗', 'blue');

// player1.die();
// player2.die();
// player3.die();
// player4.die();

// player1.remove();
// player2.remove();
// player3.die();
// player4.die();

player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();
