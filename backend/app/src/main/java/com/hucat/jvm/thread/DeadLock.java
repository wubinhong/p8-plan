package com.hucat.jvm.thread;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DeadLock {

    public static void main(String[] args) {
        String lock1 = "LOCK1";
        String lock2 = "LOCK2";
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (lock1) {
                    log.info("Task init: {} is locked!", lock1);
                    sleep(1000);
                    // Next turn to lock2
                    synchronized (lock2) {
                        log.info("Next task: {} is locked!", lock2);
                        sleep(1000);
                    }
                }

            }
        });
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (lock2) {
                    log.info("Task init: {} is locked!", lock2);
                    sleep(1000);
                    // Next turn to lock2
                    synchronized (lock1) {
                        log.info("Next task: {} is locked!", lock1);
                        sleep(1000);
                    }
                }
            }
        });
        // Launch thread
        t1.start();
        t2.start();
    }

    public static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
