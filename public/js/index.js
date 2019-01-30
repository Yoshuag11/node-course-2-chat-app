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


	const $messageTextBox = $( '[name=message]' );

	socket.emit( 'createMessage', {
			from: 'User',
			text: $messageTextBox.val()
		}, function () {
			$messageTextBox.val( '' );
		} );
} );
socket.on( 'newLocationMessage', message => {
	const $li = $( '<li></li>' );
	const $a = $( '<a target="_blank">My current location</a>' );

	$li.text( `${ message.from }: ` );
	$a.attr( 'href', message.url );
	$li.append( $a );
	$( '#messages' ).append( $li );
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