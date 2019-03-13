let board, game = new Chess();
const query = new URLSearchParams(window.location.search);
let srng = new Math.seedrandom(query.get("seed") || "jeffrey-chess-seed");

var calculateBestMove = function(game) {

    // Clone the board
    let testBoard = new Chess(game.fen());
    let best = 0;
    let bestScore = evaluateBoard(testBoard.move(game.moves()[0]));
    for (let i = 1; i < game.moves().length(); i ++) {
        let score = evaluateBoard(testBoard.move(game.moves()[i]));
        if (score > bestScore) {
            bestScore = score;
            best = i;
        }
        testBoard.undo();

    }

    return game.moves()[best];

};


function getPieceValue(piece) {

    let pieceValues = {
      p:10,
      k:30,
      b:30,
      r:50,
      q:90,
      k:900
    };

    return pieceValues[piece.type] * (piece.color === "w" ? 1 : -1);
};

function evaluateBoard(board) {

    let value = 0;
    for (let i = 0; i < board.length; i ++) {
        for (let j = 0; j < board[i].length; j ++) {
            value += getPieceValue(board[i][j]);
        }
    }
    return value;

};

var minimaxRoot = function(depth, game, isMaximisingPlayer) {
    // This function should find the optimal move and return it.
    // isMaximisingPlayer is true when we are playing as the AI.
    // When called, isMaximizingPlayer will be true.

    // Depth is initially positive. When depth reaches zero, the recursion will stop.
    // Therefore, we want to *decrement* depth each time.

    // Note: This function is returning the optimal *move*, not the score of the optimal move!
};

// TODO implement this function!!
// This should return the "score" of the best move
// IMPORTANT NOTE!!!
// The "score" of the best move is positive if the AI (black) is winning
// Therefore, this function should return the *negative* result of evaluateBoard
// since evaluateBoard returns a positive number when White (the human player) is winning
var minimax = function (depth, game, isMaximisingPlayer) {
    // This is just to keep track of how many times the function is called
    positionCount++;


    // isMaximizingPlayer is true if we are playing as AI
    // When isMaximizingPlayer is true, we are trying to *maximize* our "score"
    // Remember that our "score" is the *negative* result of evaluateBoard

    // Depth is initially a positive number.
    // Each time we go down another recursive step, we want to *decrement* depth.
    // When depth reaches zero, we want to exit out of the recursion and return the score of the current game board.

    // Remember, for each new call to minimax, we want to:
    // a. Decrement depth by one
    // b. Toggle isMaximizingPlayer

    // If you are stuck, look at step-3/start/index.js
    // If you are really stuck, look at step-3/end/index.js

    /**
     * API Methods Needed:
     * game.moves()  => Returns a list of possible legal moves
     * game.move(gameMove)  => Executes the given move.
     * game.undo()   => Undos the last move
     * game.board()  => Returns the current game board.
     *                  Pass game.board() into evaluateBoard().
     * Math.max(a, b) => returns the larger of a, b
     * Math.min(a, b) => returns the smaller of a, b
     * 
     * You will need to call game.move() before calling evaluateBoard().
     *
     * Note: The "best move" is the move that will help the AI (black) win!
     * evaluateBoard() returns a positive value if white is winning, and a negative value if black is winning
     * Therefore, the "score" for the game board is the negative result of evaluateBoard
     */
};



/* ================================== */
/* Helper Code                        */
/* ================================== */

// FOR STEP THREE, PLEASE READ!!!
// On step three, update getBestMove to this function:
// var getBestMove = function (game) {
//     if (game.game_over()) {
//         alert('Game over');
//     }

//     positionCount = 0;
//     var depth = parseInt($('#search-depth').find(':selected').text());

//     var d = new Date().getTime();
//     var bestMove = minimaxRoot(depth, game, true);
//     var d2 = new Date().getTime();
//     var moveTime = (d2 - d);
//     var positionsPerS = ( positionCount * 1000 / moveTime);

//     $('#position-count').text(positionCount);
//     $('#time').text(moveTime/1000 + 's');
//     $('#positions-per-s').text(positionsPerS);
//     return bestMove;
// };
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }
    var bestMove = calculateBestMove(game);
    return bestMove;
};

var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    game.move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
};

var renderMoveHistory = function (moves) {
    var historyElement = $('#move-history').empty();
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + ( moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);
};

var onDrop = function (source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    renderMoveHistory(game.history());

    // This is necessary for the drop to render properly!
    setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};
var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);