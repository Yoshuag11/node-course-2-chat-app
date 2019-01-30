const moment = require( 'moment' );
// const date = new Date();
// const months = [ 'Jan', 'Feb' ];

// console.log( date.getMonth() + 1 );
// const date = moment();

// date.
// 	add( 1, 'years' ).
// 	subtract( 9, 'months' );

// console.log( date.format( 'MMM Do, YYYY' ) );

const date = moment();

console.log( date.format( 'h:mma' ) );