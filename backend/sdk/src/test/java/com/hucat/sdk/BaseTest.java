package com.hucat.sdk;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hucat.sdk.consts.Globals;
import com.hucat.sdk.utils.JSONUtils;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@SpringBootConfiguration
@ActiveProfiles("unit") // 使用专用的单元测试profile，该模式下不需要集成dubbo
@Slf4j
public abstract class BaseTest {
    /**
     * print through {@link ObjectMapper}
     *
     * @param object object to print
     */
    protected void print(Object object) {
        printByFastJson(JSONUtils.parseByJackson(object));
    }

    /**
     * print through fast json supplied by alibaba
     *
     * @param object object to print
     */
    protected void printByFastJson(Object object) {
        log.info("==> result: {}", JSON.toJSONStringWithDateFormat(object, Globals.ISO_DATE_TIME, SerializerFeature.PrettyFormat));
    }

    /**
     * get pretty json string for oject
     *
     * @param object object to convert
     * @return pretty json string for specified object
     */
    protected String prettyJsonString(Object object) {
        return JSON.toJSONStringWithDateFormat(object, Globals.ISO_DATE_TIME, SerializerFeature.PrettyFormat);
    }
}
