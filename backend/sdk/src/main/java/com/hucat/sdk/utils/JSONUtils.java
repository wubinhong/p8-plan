package com.hucat.sdk.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hucat.sdk.consts.Globals;

public class JSONUtils {

    public static String toJSONString(Object object) {
        return toJSONString(object, false);
    }

    public static String toJSONString(Object object, boolean prettyFormat) {
        if (!prettyFormat) {
            return toJSONString(object);
        }
        return JSON.toJSONStringWithDateFormat(object, Globals.ISO_DATE_TIME, SerializerFeature.PrettyFormat);
    }

    public static Object parseByJackson(Object object) {
        String value;
        try {
            value = new ObjectMapper().writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return JSON.parse(value);
    }

    public static String toJSONStringByJackson(Object object) {
        return toJSONStringByJackson(object, false);
    }

    /**
     * special json format with {@link ObjectMapper} to avoid exception: "could not initialize proxy - no Session"
     *
     * @param object       object to format
     * @param prettyFormat will print in a pretty format
     * @return
     * @see #parseByJackson(Object)
     */
    public static String toJSONStringByJackson(Object object, boolean prettyFormat) {
        return toJSONString(parseByJackson(object), prettyFormat);
    }

}
