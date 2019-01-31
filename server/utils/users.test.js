const expect = require( 'expect' );

const { Users } = require( './users' );

describe( 'Users', () => {
	let users;

	beforeEach( () => {
		users = new Users();
		users.users = [ {
			id: 1,
			name: 'Mike',
			room: 'Node Course'
		}, {
			id: 2,
			name: 'Jen',
			room: 'React Course'
		}, {
			id: 3,
			name: 'Kar',
			room: 'Node Course'
		} ];
	} );
	it( 'should add new user', () => {
		const users = new Users();
		const user = {
			id: 123,
			name: 'Hector',
			room: 'The office fans'
		};
		const resUser = users.addUser( user.id, user.name, user.room );

		expect( users.users ).toEqual( [ user ] );
	} );
	it( 'should return names for node course', () => {
		const userList = users.getUserList( 'Node Course' );

		expect( userList ).toEqual( [ 'Mike', 'Kar' ] );
	} );
	it( 'should return names for react course', () => {
		const userList = users.getUserList( 'React Course' );

		expect( userList ).toEqual( [ 'Jen' ] );
	} );
	it( 'should remove a user', () => {
		const userId = 1;
		const user = users.removeUser( userId );

		expect( user.id ).toBe( userId );
		expect( users.users.length ).toBe( 2 );
	} );
	it( 'should not remove a user', () => {
		const userId = 5;
		const user = users.removeUser( userId );

		expect( user ).toBe( undefined );
		expect( users.users.length ).toBe( 3 );
	} );
	it( 'should find user', () => {
		const userId = 2;
		const user = users.getUser( userId );

		expect( user.id ).toBe( userId );
	} );
	it( 'should not find user', () => {
		const userId= 99;
		const user = users.getUser( userId );

		expect( user ).toBe( undefined );
	} );
} );