package com.hucat.sdk.utils;

import com.hucat.sdk.BaseTest;
import org.junit.Test;

import java.io.File;

public class FileUtilsTest extends BaseTest {

    @Test
    public void getMimeType() {
        FileUtils.getMimeType(new File("/data/storage/tmp/1.jpg"));
    }

    @Test
    public void removeEmptySubDirectories() {
        FileUtils.removeEmptySubDirectories(new File("/data/storage/aa"));
    }

}
