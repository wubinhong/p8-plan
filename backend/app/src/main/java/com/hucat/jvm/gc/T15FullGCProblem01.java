package com.hucat.jvm.gc;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import lombok.Data;

/**
 * Demonstrate how to invoke GC process.
 * Command line
 * $ java -Xms20M -Xmx20M -XX:+PrintGC com.hucat.jvm.gc.T15FullGCProblem01
 *
 * # Other jvm tools
 * $ jps
 * $ jinfo $(jps |grep 'T15FullGCProblem01' |awk '{print $1}')
 * $ jstack $(jps |grep 'T15FullGCProblem01' |awk '{print $1}') |more
 * 1. 查死锁；2. 哪个线程占用的cpu最高
 * $ jmap $(jps |grep 'T15FullGCProblem01' |awk '{print $1}')
 * $ jstat $(jps |grep 'T15FullGCProblem01' |awk '{print $1}') 数据格式太难看，用其他的工具
 * $ arthas
 */
public class T15FullGCProblem01 {

    @Data
    private static class CardInfo {
        private BigDecimal price = new BigDecimal(0.0);
        private String name = "kevin";
        private int age = 0;
        private Date birthday = new Date();

        private void m() {
//            System.out.println(new Date());
        }
    }

    private static ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(50, new ThreadPoolExecutor.DiscardPolicy());

    public static void main(String[] args) throws InterruptedException {
        executor.setMaximumPoolSize(50);
        for (;;) {
            modelFit();
            Thread.sleep(100);
        }
    }

    private static void modelFit() {
        getAllCardInfoList().forEach(info -> {
            executor.scheduleWithFixedDelay(info::m, 2, 3, TimeUnit.SECONDS);
        });
    }

    private static List<CardInfo> getAllCardInfoList() {
        List<CardInfo> list = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            list.add(new CardInfo());
        }
        return list;
    }
}
