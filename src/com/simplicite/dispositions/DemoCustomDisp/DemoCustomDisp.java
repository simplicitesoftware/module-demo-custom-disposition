package com.simplicite.dispositions.DemoCustomDisp;

import com.simplicite.util.AppLog;
import com.simplicite.util.tools.HTMLTool;
import com.simplicite.util.tools.Parameters;

/**
 * Custom disposition
 */
public class DemoCustomDisp extends com.simplicite.util.Disposition {
	private static final long serialVersionUID = 1L;

	@Override
	public String display(Parameters params) {
		// Redirect to external object
		return sendRedirect(HTMLTool.getExternalObjectURL("DemoCustomDispPage"));
	}
}
