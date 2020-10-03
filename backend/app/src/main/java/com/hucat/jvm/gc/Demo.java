package com.hucat.jvm.gc;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Demo {

    public String getHelloWorld() {
        return String.format("Hello, %s", System.currentTimeMillis());
    }

    public static void main(String[] args) {
        System.out.println("Demo run...");
        log.info("Demo Start...");
        System.out.println("maxMemory: " + Runtime.getRuntime().maxMemory());
        System.out.println(String.format("maxMemory: %sM", Runtime.getRuntime().maxMemory() / 1024 / 1024));
        while (true) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
