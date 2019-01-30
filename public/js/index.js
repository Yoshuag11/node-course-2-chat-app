const socket = io();

socket.on( 'connect', () => {
	console.log( 'Connected to the server' );
} );
socket.on( 'disconnect', () => console.log( 'Disconnected from server' ) );
socket.on( 'newMessage', function ( message ) {
	const formattedTime = moment( message.createdAt ).format( 'h:mm a' );
	const template = $( '#message-template' ).html();
	const html = Mustache.render(
		template, {
			text: message.text,
			from: message.from,
			createdAt: formattedTime
		} );

	$( '#messages' ).append( html );
} );
socket.on( 'newLocationMessage', message => {
	const formattedTime = moment( message.createdAt ).format( 'h:mm a' );
	const template = $( '#location-message-template' ).html();
	const html = Mustache.render(
		template, {
			url: message.url,
			from: message.from,
			createdAt: formattedTime
		} );

	$( '#messages' ).append( html );
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