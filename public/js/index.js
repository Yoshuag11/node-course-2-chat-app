const socket = io();

socket.on( 'connect', () => {
	console.log( 'Connected to the server' );
	// socket.emit( 'createMessage', {
	// 	from: 'hector@example.com',
	// 	text: 'Hey. This is Daniel'
	// } );
} );
socket.on( 'disconnect', () => console.log( 'Disconnected from server' ) );
socket.on( 'newMessage', function ( message ) {
	console.log( 'New message', message );
} );