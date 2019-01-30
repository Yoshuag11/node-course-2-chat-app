const socket = io();

socket.on( 'connect', () => {
	console.log( 'Connected to the server' );
} );
socket.on( 'disconnect', () => console.log( 'Disconnected from server' ) );
socket.on( 'newMessage', function ( message ) {
	const formattedTime = moment( message.createdAt ).format( 'h:mm a' );

	const li = jQuery( '<li></li>' );

	li.text( `${ message.from } ${ formattedTime }: ${ message.text }` );
	$( '#messages' ).append( li );
} );
socket.on( 'newLocationMessage', message => {
	const formattedTIme = moment( message.createdAt ).format( 'h:mm a' );
	const $li = $( '<li></li>' );
	const $a = $( '<a target="_blank">My current location</a>' );

	$li.text( `${ message.from } ${ formattedTIme }: ` );
	$a.attr( 'href', message.url );
	$li.append( $a );
	$( '#messages' ).append( $li );
} );

$( '0#message-form' ).on( 'submit', function ( e ) {
	e.preventDefault();


	const $messageTextBox = $( '[name=message]' );

	socket.emit( 'createMessage', {
			from: 'User',
			text: $messageTextBox.val()
		}, function () {
			$messageTextBox.val( '' );
		} );
} );

const $locationButton = $( '#send-location' );

$locationButton.on( 'click', function () {
	if ( !navigator.geolocation ) {
		return alert( 'Geolocation not supported by your browser.' );
	}

	$locationButton.
		text( 'Sending location...' ).
		prop( 'disabled', true );

	navigator.geolocation.getCurrentPosition(
		function ( position ) {
			$locationButton.
				text( 'Send Location' ).
				prop( 'disabled', false );
			socket.emit( 'createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			} );
		}, function () {
			$locationButton.
				text( 'Send Location' ).
				prop( 'disabled', false );
			alert( 'Unable to fetch location.' );
		}
	);
} );