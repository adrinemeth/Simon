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
       //will handle flashing of tiles
    }
};
scoreView.init();
