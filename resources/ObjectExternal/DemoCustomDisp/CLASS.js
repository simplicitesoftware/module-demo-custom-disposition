/* global simplicite */

/**
 * Custom disposition
 * @class
 */
class DemoCustomDisp { // eslint-disable-line no-unused-vars
	/**
	 * Render
	 * @param params Parameters
 	 */
	static async render(params) {
		const app = simplicite.session({
			endpoint: 'ui',
			authtoken: params._authtoken, // set in Java
			ajaxkey: params._ajaxkey // set in Java
		});
		app.info(`Lib version: ${simplicite.constants.MODULE_VERSION}`);

		const user = await app.getGrant();
		console.log(user);
		app.info(`User: ${user.firstname} ${user.lastname} (${user.login})`);

		const prd = app.getBusinessObject('DemoProduct');
		const list = await prd.search({ demoPrdAvailable: true });
		const ul = $('<ul/>');
		for (const item of list) {
			ul.append($('<li/>').data('item', item)
				.append($('<img/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', item)))
				.append($('<h1/>').text(item.demoPrdName))
				.append($('<h2/>').text(item.demoPrdReference))
				.append($('<p/>').html(item.demoPrdDescription))
			);
		}
		
        const scopes = $('<div/>');
        for (const scope of user.apps) {
        	const name = scope.home || scope.scope /* v7+ */; 
            if (name != user.scopeName)
                scopes.append($('<a/>', { href: `/ui?scope=${name}` }).text(scope.label)).append($('<span/>').text(' | '));
        }

		$('#democustomdisp')
			.append($('<div/>')
				.append($('<div/>').text(`Hello ${user.firstname} ${user.lastname} (${user.login})`))
				.append(scopes.append($('<a/>', { href: '/logout' }).text('Logout'))))
			.append($('<h1/>').text('Product catalog'))
			.append(ul);
	}
}