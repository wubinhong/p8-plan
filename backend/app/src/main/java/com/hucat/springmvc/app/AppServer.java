package com.hucat.springmvc.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Default launch server
 */
@SpringBootApplication(scanBasePackages = {"com.hucat.springmvc"})
@Slf4j
public class AppServer {

    public static void main(String[] args) {
        SpringApplication.run(AppServer.class, args);
        log.info("App server launch complete!");
    }

}
