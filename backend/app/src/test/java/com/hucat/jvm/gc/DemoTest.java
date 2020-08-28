package com.hucat.jvm.gc;

import org.junit.Test;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
@SpringBootConfiguration
public class DemoTest {

    private Demo demo = new Demo();

    @Test
    public void sayHello() {
        log.info("Launch sayHello...");
        log.info("java.version: {}", System.getProperty("java.version"));
        log.info("He said: {}", demo.getHelloWorld());
    }

}