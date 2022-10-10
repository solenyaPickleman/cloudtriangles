// Reacts to POST /api/solver
// basically a js port based on https://github.com/solenyaPickleman/trianglesolver 

import { NOOP } from "@vue/shared";

let moveset = [ [0,1,3],
[0,2,5],
[1,3,6],
[1,4,8],
[2,4,7],
[2,5,9],
[3,6,10],
[3,7,12 ],
[4,7,11 ],
[4,8,13 ],
[5,8,12],
[5,9,14],
[3,4,5],
[6,7,8],
[7,8,9],
[10,11,12],
[11,12,13],
[12,13,14 ]
] ; 


function validateMove( game, [x,y,z ] ) { 
    return  ( ( game[x] && game[y] &&  !game[z] ) || ( !game[x] && game[y] && game[z] )  )
}

function takeMove(g, [x,y,z]) { 
    let game = [...g ] ;
    game[x] = !game[x] ;
    game[y] = !game[y] ;
    game[z] = !game[z] ;
    return game
}


function step(game) { 
    let valid_moves = moveset.filter( move => validateMove(game , move) ); 
    let children = valid_moves.map( move => takeMove(game, move)) ; 
    return  children.sort((a, b) => 0.5 - Math.random())
}

function isSolved(game) {
   return game.reduce( (x,y) => x+y ) == 1 ; 
}


export function solver(game) { 
    var result  = []; 
    var found = false; 
    function solveGame( game  ) {
        //check final condition 
        if (found) {}
        else { 
            if (isSolved(game) ) { 
                found = true; 
            }
            let children = step(game) ; 
            result.push(game) ;
            for (let child of children) {
                solveGame( child, result );
                if (found) {break}
            };
            if (!found) {result.pop() ;}
        }
    }
    solveGame(game);
    return result ;
}

export async function onRequestPost({ request , env , test  }) {
    const { game }  = await request.json() 
    let solution = solver(game);

    return new Response(JSON.stringify({'solution':solution }),{ headers : { 'content-type': 'application/json;charset=UTF-8' } , status:200, statusText:'OK'});
  }
