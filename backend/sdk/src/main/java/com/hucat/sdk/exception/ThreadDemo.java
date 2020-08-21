package com.hucat.sdk.exception;


public class ThreadDemo {

    /**
     * 这是一个JavaDoc<br>
     * 这是另外一行
     * @param args 输入参数
     * @throws InterruptedException Throw Exception when thread is interrupted.
     */
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Start...");

        Thread thread = new Thread(() -> {
            while (true) {
                System.out.println("[Sub-Thread]: " + System.currentTimeMillis());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.setDaemon(false);
        thread.start();

        int i = 0;
        while (i++ < 5) {
            System.out.println("[Main-Thread]: " + i);
            Thread.sleep(1000);
        }
    }

}
