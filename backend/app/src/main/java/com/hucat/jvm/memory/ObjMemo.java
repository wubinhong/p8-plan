package com.hucat.jvm.memory;
/**
 * 黑马就业班基础视频学习demo
 * For complete access to the course, please refer to website below:
 * https://www.bilibili.com/video/BV1uJ411k7wy?from=search&seid=12806658369692867013
 */
public class ObjMemo {

    public static void main(String[] args) {
        Phone one = new Phone();
        System.out.println(one.brand);
        System.out.println(one.price);
        System.out.println(one.color);
        one.brand = "苹果";
        one.price = 8388.00;
        one.color = "黑色";
        System.out.println(one.brand);
        System.out.println(one.price);
        System.out.println(one.color);
        one.call("乔布斯");
        one.sendMessage();
        while (true) {
            try {
                System.out.println("Loop...");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }


    public static class Phone {
        // 成员变量
        String brand;
        double price;
        String color;

        // 成员方法
        public void call(String who) {
            System.out.println("给" + who + "打电话");
        }
        public void sendMessage() {
            System.out.println("群发短信！");
        }
    }

}
