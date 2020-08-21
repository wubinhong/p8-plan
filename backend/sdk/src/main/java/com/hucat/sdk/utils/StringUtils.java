package com.hucat.sdk.utils;

import java.util.Map;
import java.util.Map.Entry;

public class StringUtils extends org.apache.commons.lang3.StringUtils {

    public static final String DEFAULT_PRETTY_FORMAT = "%25s : %s";

    /**
     * @param map
     * @param format default "%25s : %s"
     * @return
     */
    public static String prettyPrint(Map<Object, Object> map, String format) {
        if (map == null || map.size() == 0) return null;
        StringBuilder sb = new StringBuilder();
        for (Entry<Object, Object> entry : map.entrySet()) {
            sb.append(String.format(format, entry.getKey(), entry.getValue())).append("\n");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    /**
     * @see #prettyPrint(Map, String)
     */
    public static String prettyPrint(Map<Object, Object> map) {
        return prettyPrint(map, DEFAULT_PRETTY_FORMAT);
    }

    /**
     * 获取匿名手机号
     *
     * @param mobile 手机号
     * @return 返回匿名手机号
     */
    public static String getMobileAnonym(String mobile) {
        if (mobile != null && mobile.length() > 7) {
            return mobile.substring(0, 3) + "****" + mobile.substring(mobile.length() - 4, mobile.length());
        } else {
            return "****";
        }
    }

    /**
     * @see org.springframework.util.StringUtils#trimAllWhitespace(String)
     */
    public static String trimAllWhitespace(String str) {
        return org.springframework.util.StringUtils.trimAllWhitespace(str);
    }

    /**
     * 比较2个版本字符串的大小
     *
     * @param v1 版本1，如：2.0.0
     * @param v2 版本2，如：2.0.1
     * @return 0：如果v1 = v2；-1：如果v1 < v2；1：如果v1 > v2
     */
    public static int compareVersion(String v1, String v2) {
        String[] vArr1 = v1.split("\\.");
        String[] vArr2 = v2.split("\\.");
        int i = 0;
        // set index to first non-equal ordinal or length of shortest version string
        while (i < vArr1.length && i < vArr2.length && vArr1[i].equals(vArr2[i])) {
            i++;
        }
        // compare first non-equal ordinal number
        if (i < vArr1.length && i < vArr2.length) {
            int diff = Integer.valueOf(vArr1[i]).compareTo(Integer.valueOf(vArr2[i]));
            return Integer.signum(diff);
        }
        // the strings are equal or one string is a substring of the other
        // e.g. "1.2.3" = "1.2.3" or "1.2.3" < "1.2.3.4"
        return Integer.signum(vArr1.length - vArr2.length);
    }

}
