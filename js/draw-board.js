var fenMap = {
	r: 'bR',
  n: 'bN',
  b: 'bB',
  q: 'bQ',
  m: 'bM',
  k: 'bK',
  p: 'bP',
	R: 'wR',
  N: 'wN',
  B: 'wB',
  Q: 'wQ',
  M: 'wM',
  K: 'wK',
  P: 'wP',
}

var fen = 'rnbqkbnr/8/pppppppp/8/8/PPPPPPPP/8/RNBKQBNR w KQkq - 0 1';

function addFenToSVG(move, id) {
  var fen = move.fen;
  var from = {
    col: move.from.charCodeAt(0) - 97,
    row: 7 - (move.from.charCodeAt(1) - 49),
  }
  var to = {
    col: move.to.charCodeAt(0) - 97,
    row: 7 - (move.to.charCodeAt(1) - 49),
  }
  var size = 200;
  var board = fen.split(' ')[0].split('/').reduce((result, row) => {
    result.push(row.split('').reduce((r, p)=> {
      if(isNaN(parseInt(p))) r.push(fenMap[p]);
      else {
        for(let i=0; i<parseInt(p); i++) {
          r.push('')
        }
      }
      return r;
    }, []))
    return result;
  }, [])

  var draw = SVG().addTo(id).size(size+10, size+10)

  var rect1 = draw.rect(size+10, size+10).fill('#444444').radius(5)

  var sqSize = size/8;

  for(let i=0; i<8; i++) {
    for(let j=0; j<8; j++) {
      var color = (i+j)%2 === 1 ? '#f0d9b5' : '#b58863';
      if(from.col === i && from.row === j || to.col === i && to.row === j ) color = (i+j)%2 === 1 ? '#e0d771' : '#a3a620';
      var rect2 = draw.rect(sqSize, sqSize).fill(color).move(i*sqSize+5, j*sqSize+5)
      if(board[j][i] != '') {
        draw.image(`img/chesspieces/makruk/${board[j][i]}.png`).size(sqSize,sqSize).move(i*sqSize+5, j*sqSize+5);
      }
    }
  }
}