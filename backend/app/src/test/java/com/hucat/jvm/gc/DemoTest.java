package com.hucat.jvm.gc;

import com.hucat.oop.inherit.WhiteDog;

import org.junit.Test;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
@SpringBootConfiguration
public class DemoTest {

    private Demo demo = new Demo();
    private WhiteDog dog = new WhiteDog();

    @Test
    public void sayHello() {
        log.info("Launch sayHello...");
        log.info("java.version: {}", System.getProperty("java.version"));
        log.info("He said: {}", demo.getHelloWorld());
    }
    
    @Test
    public void dog() throws InterruptedException {
        for (int i = 0; i < 20; i++) {
            Thread.sleep(1000);
            dog.bark();
            dog.beg();
            dog.tellColor();
        }
    }

    @Test
    public void whiteDog() throws InterruptedException {
        for (int i = 0; i < 20; i++) {
            Thread.sleep(1000);
            dog.tellColor();
        }
    }

}