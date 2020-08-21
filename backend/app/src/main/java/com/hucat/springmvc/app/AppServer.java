package com.hucat.springmvc.app;

import com.hucat.sdk.utils.StringUtils;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.lang.management.ManagementFactory;
import java.util.HashMap;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

/**
 * Default launch server
 */
@SpringBootApplication(scanBasePackages = {"com.hucat.springmvc"})
@Slf4j
public class AppServer {

    public static void main(String[] args) {
        SpringApplication.run(AppServer.class, args);

        // System info collection
        Map<Object, Object> sysInfo = new HashMap<>();
        System.getProperties().forEach(sysInfo::put);
        // System.getenv().forEach(sysInfo::put);
        sysInfo.put("maxMemory", Runtime.getRuntime().maxMemory() / 1024 / 1024 + " M");
        sysInfo.put("maxMemoryMXBean", ManagementFactory.getMemoryMXBean().getHeapMemoryUsage().getMax() / 1024 / 1024 + " M");
        log.info("System info:\n{}", StringUtils.prettyPrint(sysInfo));

        log.info("App server launch complete!");
    }

}
