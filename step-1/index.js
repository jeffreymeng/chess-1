var board, game = new Chess();

/*The "AI" part starts here */
var calculateBestMove =function(game) {

    var newGameMoves = game.moves();

    return newGameMoves[Math.floor(Math.random() * newGameMoves.length)];

};

// UNCOMMENT THIS FOR STEP 1
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }
    var bestMove = calculateBestMove(game);
    return bestMove;
};

// UNCOMMENT THIS FOR STEP TWO
// var positionCount;
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

/* board visualization and games state handling */

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