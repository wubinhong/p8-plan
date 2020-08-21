package com.hucat.sdk.consts;

public class Globals {

    /**
     * 编码集
     */
    public final static String CHARSET_UTF8 = "UTF-8";

    /**
     * The most common ISO Date Format {@code yyyy-MM-dd},
     * e.g. "2000-10-31".
     */
    public final static String ISO_DATE = "yyyy-MM-dd";

    /**
     * The most common ISO Time Format {@code HH:mm:ss},
     * e.g. "01:30:00".
     */
    public final static String ISO_TIME = "HH:mm:ss";

    /**
     * The most common ISO DateTime Format {@code yyyy-MM-dd HH:mm:ss},
     * e.g. "2000-10-31 01:30:00".
     * <p>This is the default if no annotation value is specified.
     */
    public final static String ISO_DATE_TIME = "yyyy-MM-dd HH:mm:ss";

    /**
     * Base on time pattern {@link #ISO_TIME}
     *
     * @see #ISO_DATE
     */
    public final static String TIME24HOURS_PATTERN = "([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]";

}
