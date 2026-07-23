package com.simplicite.extobjects.DemoCustomDisp;

import com.simplicite.util.AppLog;
import com.simplicite.util.tools.HTMLTool;
import com.simplicite.util.tools.Parameters;
import com.simplicite.webapp.web.JQueryWebPage;

/**
 * Custom disposition page
 */
public class DemoCustomDisp extends com.simplicite.webapp.web.JQueryWebPageExternalObject {
    private static final long serialVersionUID = 1L;

    @Override
    public String displayBody(Parameters params) {
        try {
            JQueryWebPage wp = getPage();
            wp.appendJSInclude(HTMLTool.simpliciteClientJS());
            wp.appendJSInclude(HTMLTool.getResourceJSURL(this, "CLASS"));
            wp.appendCSSIncludes(HTMLTool.bootstrapCSS());
            wp.appendCSSIncludes(HTMLTool.fontawsomeCSS());
            wp.appendCSSInclude(HTMLTool.getResourceCSSURL(this, "STYLES"));
            wp.setReady(getName() + ".render(" + params.toJSONObject()
                .put("_authtoken", getGrant().getAuthToken())
                .put("_ajaxkey", getGrant().getAjaxKey()).toString() + ")");
            return HTMLTool.getResourceHTMLContent(this, "HTML", true);
        } catch (Exception e) { // Unexpected error
            AppLog.error(e, getGrant());
            return e.getMessage();
        }
    }
}
