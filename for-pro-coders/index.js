var board, game = new Chess();

// TO DEBUG CODE:
// console.log(variable)
// will print the variable to the console

/* Step #1   ======================== */
/* TODO: Implement This Function!     */
/* Randomly return a legal move       */
/* Solution: step-1/end/index.js      */
/* ================================== */
var calculateBestMove = function(game) {
    /* Step 1: Randomly return a legal move */
    /**
     * API Methods Needed:
     * game.moves()  => Returns a list of possible legal moves
     */




    /* Step 2: Update this function to take into consideration board value */
    /* Delete Step 1's Code! */
    /* This function should find and return the best possible move to play */
    /**
     * API Methods Needed:
     * game.moves()  => Returns a list of possible legal moves
     * game.move(gameMove)  => Executes the given move.
     * game.undo()   => Undos the last move
     * game.board()  => Returns the current game board.
     *                  Pass game.board() into evaluateBoard().
     * 
     * You will need to call game.move() before calling evaluateBoard().
     *
     * Note: The "best move" is the move that will help the AI (black) win!
     * evaluateBoard() returns a positive value if white is winning, and a negative value if black is winning
     * Therefore, you want to *minimize* the result of evaluateBoard()!
     */
};


/* Step #2   ======================== */
/* TODO:                              */
/*  1. Implement getPieceValue        */
/*  2. Implement evaluateBoard        */
/*  3. Update calculateBestMove       */
/* Solution: step-2/end/index.js      */
/* ================================== */
function getPieceValue(piece) {
    /**
     * API Methods Needed:
     * piece.type  ==> A single character representing the type of the piece
     *                 if piece.type === 'p': Piece is Pawn
     *                 piece.type === 'r': Rook
     *                 'n': Knight
     *                 'b': Bishop
     *                 'q': Queen
     *                 'k': King
     *
     * piece.color ==> A single character representing the color of the piece
     *                 if piece.color === 'w': Piece is White
     *                 if piece.color === 'b': Piece is Black
     *
     * Returns: The value of the piece, using the following rules:
     * 1. If the piece is white, return the positive value of the piece.
     * 2. If the piece is black, return the negative value of the piece.
     * 3. Each piece is worth the following value:
     *    Pawn = 10
     *    Knight, Bishop = 30
     *    Rook = 50
     *    Queen = 90
     *    King = 900

     * Look at step-2/piece-values.png for a handy guide!
     */
};

function evaluateBoard(board) {
    /**
     * Use getPieceValue() to determine the "value" of the board!
     * Value of the board = sum of the value of all the pieces on the board
     *
     * API Methods Needed:
     * board[i][j] = the piece on the board at (i, j)
     * board is an 8x8 array
     *
     * Pro tip: getPieceValue(board[i][j]) returns the value of the piece at (i, j)!
     * 
     * Note: evaluateBoard returns the value of the board assuming white is positive and black is negative
     * (eg. A positive result means white is winning)
     */
};





/* Step #3    ======================= */
/* TODO:                              */
/*  1. Go to the helper code section and update the getBestMove() function */
/*  1. Implement minimax              */
/*  2. Implement minimaxRoot          */
/* Solution: step-3/end/index.js      */
/* ================================== */
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
    window.setTimeout(makeBestMove, 250);
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