package com.simplicite.extobjects.DemoCustomDisp;

import com.simplicite.util.AppLog;
import com.simplicite.util.tools.HTMLTool;
import com.simplicite.util.tools.Parameters;
import com.simplicite.webapp.web.JQueryWebPage;

public class DemoCustomDisp extends com.simplicite.webapp.web.JQueryWebPageExternalObject {
	private static final long serialVersionUID = 1L;

	@Override
	public String displayBody(Parameters params) {
		try {
			JQueryWebPage wp = getPage();
			wp.appendJSInclude(HTMLTool.simpliciteClientJS());
			wp.appendJSInclude(HTMLTool.getResourceJSURL(this, "CLASS"));
			wp.appendCSSInclude(HTMLTool.getResourceCSSURL(this, "STYLES"));
			wp.append(HTMLTool.getResourceHTMLContent(this, "HTML"));
			wp.setReady(getName() + ".render(" + params.toJSONObject().put("_authtoken", getGrant().getAuthToken()).put("_ajaxkey", getGrant().getAjaxKey()).toString() + ")");
			return wp.toString();
		} catch (Exception e) {
			AppLog.error(getClass(), "display", null, e, getGrant());
			return e.getMessage();
		}
	}
}
