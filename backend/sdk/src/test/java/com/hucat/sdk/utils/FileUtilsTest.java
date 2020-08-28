package com.hucat.sdk.utils;

import com.hucat.sdk.BaseTest;
import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

import java.io.File;

@Slf4j
public class FileUtilsTest extends BaseTest {

    @Test
    public void getMimeType() {
        log.info("mimeType: {}", FileUtils.getMimeType(new File("~/Downloads/Avatar.png")));
    }

    @Test
    public void removeEmptySubDirectories() {
        log.info("java.version: {}", System.getProperty("java.version"));
        FileUtils.removeEmptySubDirectories(new File("~/Downloads/aa/kk/bb"));
    }

}
