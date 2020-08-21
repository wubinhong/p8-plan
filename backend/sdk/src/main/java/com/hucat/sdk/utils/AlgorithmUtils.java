package com.hucat.sdk.utils;

import org.apache.commons.lang3.ArrayUtils;

import java.util.List;

/**
 * Create on 10/14/16
 * 算法相关的工具栏
 *
 * @author wubinhong
 */
public class AlgorithmUtils {

    /**
     * 获取最大公约数，如：[18, 42, 54] --> 6
     *
     * @param arr 目标数组
     * @return 最大公约数
     * @see #gcd(int, int)
     */
    public static int gcd(int[] arr) {
        int gcd = arr[0];
        for (int i = 1; i < arr.length; i++)
            gcd = gcd(gcd, arr[i]);
        return gcd;
    }

    /**
     * 求最大公倍数（greatest common divisor）
     * Some implementations here are not working correctly if both numbers are negative. gcd(-12, -18) is 6, not -6.
     *
     * @return greatest common divisor
     */
    public static int gcd(int a, int b) {
        if (b == 0) {
            return Math.abs(a);
        }
        return gcd(b, a % b);
    }

    /**
     * @see #gcd(int[])
     */
    public static long gcd(long[] arr) {
        long gcd = arr[0];
        for (int i = 1; i < arr.length; i++)
            gcd = gcd(gcd, arr[i]);
        return gcd;
    }

    public static long gcd(long a, long b) {
        if (b == 0) {
            return Math.abs(a);
        }
        return gcd(b, a % b);
    }

    /**
     * 数组公约化后
     *
     * @param arr 目标数组
     * @return 公约化后的数组，如：[18, 42, 54] --> [3, 4, 9]
     */
    public static long[] gcdArr(long[] arr) {
        long[] gcdArr = ArrayUtils.addAll(arr, null);
        long gcd = gcd(gcdArr);
        for (int i = 0; i < gcdArr.length; i++) {
            gcdArr[i] = gcdArr[i] / gcd;
        }
        return gcdArr;
    }

    /**
     * @see #gcdArr(long[])
     */
    public static int[] gcdArr(int[] arr) {
        int[] gcdArr = ArrayUtils.addAll(arr, null);
        int gcd = gcd(gcdArr);
        for (int i = 0; i < gcdArr.length; i++) {
            gcdArr[i] = gcdArr[i] / gcd;
        }
        return gcdArr;
    }

    public static long[] gcdList(List<Long> list) {
        long[] retArr = new long[list.size()];
        for (int i = 0; i < list.size(); i++) {
            retArr[i] = list.get(i);
        }
        return gcdArr(retArr);
    }

}
