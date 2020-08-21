package com.hucat.sdk.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.Assert;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
public class FileUtils extends org.apache.commons.io.FileUtils {

    public static String getMimeType(File file) {
        MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap();
        return mimeTypesMap.getContentType(file);
    }

    public static void removeEmptySubDirectories(File directory) {
        removeEmptySubDirectories(new ArrayList<>(), directory);
    }

    private static void removeEmptySubDirectories(List<File> emptyDirectories, File directory) {
        getEmptyDirectory(emptyDirectories, directory);
        if (!emptyDirectories.isEmpty()) {
            emptyDirectories.forEach(emptyDirectory -> {
                log.info("Delete empty directory: {} | {}", emptyDirectory, emptyDirectory.delete());
            });
            removeEmptySubDirectories(new ArrayList<>(), directory);
        }
    }


    private static void getEmptyDirectory(List<File> emptyDirectories, File directory) {
        Assert.notNull(emptyDirectories, "init emptyDirectories should not be null");
        if (directory.isDirectory()) {
            File[] files = directory.listFiles();
            if (files == null || files.length == 0) {
                emptyDirectories.add(directory);
            } else {
                Arrays.stream(files).filter(File::isDirectory).forEach(file -> {
                    getEmptyDirectory(emptyDirectories, file);
                });
            }
        }
    }

}
