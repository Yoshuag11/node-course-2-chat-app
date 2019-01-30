const socket = io();

socket.on( 'connect', () => {
	console.log( 'Connected to the server' );
} );
socket.on( 'disconnect', () => console.log( 'Disconnected from server' ) );
socket.on( 'newMessage', function ( message ) {
	console.log( 'New message', message );

	const li = jQuery( '<li></li>' );

	li.text( `${ message.from }: ${ message.text }` );
	$( '#messages' ).append( li );
} );
$( '#message-form' ).on( 'submit', function ( e ) {
	e.preventDefault();

	socket.emit( 'createMessage', {
			from: 'User',
			text: $( '[name=message]' ).val()
		}, function ( data ) {
			console.log( 'Got it', data );
		} );
} );