/* global simplicite */

var DemoCustomDispPage = DemoCustomDispPage || (() => {
	function render(params) {
		const app = simplicite.session({
			endpoint: 'ui',
			authtoken: params._authtoken, // set in Java
			ajaxkey: params._ajaxkey // set in Java
		});
		app.info(`Lib version: ${simplicite.constants.MODULE_VERSION}`);

		app.getGrant().then(user => {
			app.info(`User: ${user.firstname} ${user.lastname} (${user.login})`);
			const prd = app.getBusinessObject('DemoProduct');
			prd.search({ demoPrdAvailable: true }).then(list => {
				const ul = $('<ul/>');
				for (const item of list) {
					ul.append($('<li/>').data('item', item)
						.append($('<img/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', item)))
						.append($('<h1/>').text(item.demoPrdName))
						.append($('<h2/>').text(item.demoPrdReference))
						.append($('<p/>').html(item.demoPrdDescription))
					);
				}
				$('#democustomdisppage')
					.html($('<h1/>').text('Product catalog'))
					.append($('<p/>')
						.append($('<span/>').text(`Hello ${user.firstname} ${user.lastname} (${user.login}) | `))
						.append($('<a/>', { href: '/ui?scope=Home' }).text('Home'))
						.append($('<span/>').text(' | '))
						.append($('<a/>', { href: '/logout' }).text('Logout'))
					)
					.append(ul);
			});
		});
	}

	return { render: render };
})();