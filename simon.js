var colors = ["red", "green", "blue", "yellow"];
var model = {
    currentBox: 0,
    score: 0,
    moves: []
};


var controller = {
    init: function () { },
    addMove: function () {
        model.moves.push(colors[Math.floor(Math.random() * colors.length)]);
    },
    updateScore: function () {
        model.score++;
    },
    reset: function () {
        model.score = 0;
        model.moves = [];
    }
};

var scoreView = {
    init: function () {
        this.scoreText = document.getElementById("score");
        this.startBtn = document.getElementById("start");
        this.resetBtn = document.getElementById("reset");
        this.startBtn.addEventListener("click", function () {
            controller.addMove();
            controller.updateScore();
            scoreView.render();
            computerView.init();
        });
        this.resetBtn.addEventListener("click", function () {
            controller.reset();
            scoreView.render();
        });
        scoreView.render();
    },
    render: function () {
        this.scoreText.textContent = model.score;
    }
};
var computerView = {
    init: function () {
        computerView.render();
    },
    render: function () {
        var moves = model.moves;
        console.log("moves: " + moves);
        var current;
        var arrlength = moves.length;
        for (var i = 0; i < arrlength; i++) {
            this.delayIteration(i, moves, current, this.lightUp);
        }
    },
    delayIteration: function (i, arr, currentDiv, blinker) {
        setTimeout(function () {
            currentDiv = document.getElementById(arr[i]);
            blinker(currentDiv);
            this.audio = document.getElementById(arr[i] + "-audio");
            this.audio.play();
        }, 1000 * i);
    },
    lightUp: function (item) {
        $(item).addClass("active");
        setTimeout(function () {
            $(item).removeClass("active");
        }, 500);
    }
};
var playerView = {
    init: function () {
        this.parentDiv = document.getElementById("parent-div");
        playerView.render();
    },
    render: function () {
        var counter = 0;
        this.parentDiv.addEventListener("click", function (e) {
            //ignore clicks on parent div
            if (e.target !== e.currentTarget) {
                //run code if clicked element is not parent div
                this.item = document.getElementById(e.target.id);
                console.log("player: " + model.player);
                console.log("counter: " + counter);
                console.log("id: " + typeof e.target.id, "current move: " + typeof model.moves[counter]);
                console.log("id: " + e.target.id, "current move: " + model.moves[counter]);
                computerView.lightUp(this.item);
                if (e.target.id !== model.moves[counter]) {
                    console.log("wrong");
                    setTimeout(function () {
                        computerView.init();
                    }, 1000);
                } else {
                    controller.addPlayerMove(e.target.id);

                    counter++;
                    console.log(counter);
                    if (
                        model.player.length == model.moves.length &&
                        model.player.length !== 0
                    ) {
                        controller.resetPlayer();
                        counter = 0;

                        console.log("newRound");
                        setTimeout(function () {
                            controller.addMove();
                            controller.updateScore();
                            scoreView.render();
                            computerView.init();
                        }, 2000);
                    }
                }
            }
        });
    }
};
scoreView.init();
playerView.init();
