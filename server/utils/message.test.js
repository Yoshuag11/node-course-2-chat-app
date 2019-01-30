const expect = require( 'expect' );

const { generateMessage, generateLocationMessage } = require( './message' );

describe( 'generateMessage', () => {
	it( 'should generate correct message object', () => {
		const from = 'Hector';
		const text = 'Some message';
		const message = generateMessage( from, text );

		expect( message ).toMatchObject( { from, text } );
		expect( typeof message.createdAt ).toBe( 'number' );
	} );
} );
describe( 'generateLocationMessage', () => {
	it( 'should generate correct location object', () => {
		const from = 'Hector';
		const latitude = 15;
		const longitude = 19;
		const url = `https://www.google.com/maps?q=${ latitude },${ longitude }`;
		const message = generateLocationMessage( from, latitude, longitude );

		expect( message ).toMatchObject( { from, url } )
		expect( typeof message.createdAt ).toBe( 'number' );
	} );
} );