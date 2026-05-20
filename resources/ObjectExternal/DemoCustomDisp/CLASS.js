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
        const session = simplicite.session({
            endpoint: simplicite.constants.ENDPOINT_UI,
            authtoken: params._authtoken, // set in Java
            ajaxkey: params._ajaxkey // set in Java
        });
        session.info(`Lib version: ${simplicite.constants.MODULE_VERSION}`);

        const user = await session.getGrant();
        console.log(user);
        session.info(`User: ${user.firstname} ${user.lastname} (${user.login})`);

        const prd = session.getBusinessObject('DemoProduct');
        const products = await prd.search({ demoPrdAvailable: true });
        const catalog = $('<div class="row row-cols-5"/>');
        for (const product of products) {
            catalog.append($('<div class="col"/>')
                .append($('<div class="m-1 shadow card"/>')
                    .append($('<img class="p-4 card-img-top"/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', product)))
                    .append($('<h5 class="p-1 card-title"/>').text(product.demoPrdName))
                    .append($('<h6 class="p-1 card-subtitle"/>').text(product.demoPrdReference))
                    .append($('<p class="p-2 card-text"/>').html(product.demoPrdDescription))
            ));
        }

        const scopes = $('<div/>');
        for (const app of user.apps) {
        	const name = app.scope; 
            if (name != user.scopeName)
                scopes.append($('<a/>', { href: `/ui?scope=${name}` }).text(app.label)).append($('<span/>').text(' | '));
        }

        $('#democustomdisp')
            .append($('<div class="alert alert-secondary"/>')
                .append($('<div/>').text(`Hello ${user.firstname} ${user.lastname} (${user.login})`))
                .append(scopes.append($('<a/>', { href: '/logout' }).text('Logout'))))
            .append($('<h1/>').text('Product catalog'))
            .append(catalog);
    }
}
