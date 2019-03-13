var board, game = new Chess();
var positionCount;

/* ================================== */
/* TODO:                              */
/*  1. Implement minimax              */
/*  2. Implement minimaxRoot          */
/* Solution: step-3/end/index.js      */
/* ================================== */
var minimaxRoot = function(depth, game, isMaximisingPlayer) {
    var newGameMoves = game.moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i];
        game.move(newGameMove);

        // Call minimax! Make sure to decrease depth and update isMaximizingPlayer.
        var value = /* TODO: Call minimax! */

        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

// TODO implement this function!!
// This should return the "score" of the best move
var minimax = function (depth, game, isMaximisingPlayer) {
    positionCount++;
    // Different depth implementation this time:
    // Depth starts out at 3, then is decremented each layer
    // So when depth === 0, stop the recursion
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.moves();

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);

            // TODO: Update bestMove!
            var moveValue = minimax(depth - 1, game, !isMaximisingPlayer);
            bestMove = Math.max(bestMove, /* Something goes here... */);

            game.undo();
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);

            // TODO: Update bestMove!
            var moveValue = minimax(depth - 1, game, !isMaximisingPlayer);
            bestMove = Math.min(bestMove, /* Something goes here... */);

            game.undo();
        }
        return bestMove;
    }
};




















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

    if (piece === null) {
        return 0;
    }

    // This function will return the absolute value of the piece,
    // ignoring the piece's color.
    var getAbsoluteValue = function (piece) {
        if (piece.type === 'p') {
            return 10;
        } else if (piece.type === 'r') {
            return 50;
        } else if (piece.type === 'n') {
            return 30;
        } else if (piece.type === 'b') {
            return 30 ;
        } else if (piece.type === 'q') {
            return 90;
        } else if (piece.type === 'k') {
            return 900;
        }

        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece);

    // TODO: If piece.color === 'w', return absoluteValue
    //       Else, return -absoluteValue
    if (piece.color === 'w') {
        return absoluteValue;
    } else {
        return -absoluteValue;
    }
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
     */

    var totalEvaluation = 0;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            // Hmm... maybe add something to totalEvaluation here?
            totalEvaluation += getPieceValue(board[i][j]);
        }
    }

    return totalEvaluation;
};


/* ================================== */
/* Helper Code                        */
/* ================================== */

var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }

    positionCount = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());

    var d = new Date().getTime();
    var bestMove = minimaxRoot(depth, game, true);
    var d2 = new Date().getTime();
    var moveTime = (d2 - d);
    var positionsPerS = ( positionCount * 1000 / moveTime);

    $('#position-count').text(positionCount);
    $('#time').text(moveTime/1000 + 's');
    $('#positions-per-s').text(positionsPerS);
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