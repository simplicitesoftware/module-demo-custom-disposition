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
        session.info(`User: ${user.firstname} ${user.lastname} (${user.login})`);
        $('#democustomdisp-user').text(`Hello ${user.firstname} ${user.lastname} (${user.login})`);

        const scopes = $('#democustomdisp-scopes').empty();
        for (const app of user.apps)
            if (app.scope != user.scopeName)
                scopes.append($('<a class="text-primary"/>').attr('href', `/ui?scope=${app.scope}`).text(app.label)).append($('<span/>').text(' | '));

        const prd = session.getBusinessObject('DemoProduct');
        await prd.getMetaData();
        $('#democustomdisp-products-title').append(prd.getPluralLabel());
        const products = await prd.search({ demoPrdAvailable: true });
        const catalog = $('<div class="row row-cols-5"/>');
        for (const product of products) {
            catalog.append($('<div class=p-2 col"/>')
                .append($('<div class="shadow card"/>')
                    .append($('<img class="p-4 card-img-top"/>').attr('src', prd.getFieldDocumentURL('demoPrdPicture', product)))
                    .append($('<h5 class="p-1 card-title"/>').text(prd.getFieldValue('demoPrdName', product)))
                    .append($('<h6 class="p-1 card-subtitle"/>').text(prd.getFieldValue('demoPrdReference', product)))
                    .append($('<p class="p-2 card-text"/>').html(prd.getFieldValue('demoPrdDescription', product)))
            ));
        }
        $('#democustomdisp-products').html(catalog);
    }
}
