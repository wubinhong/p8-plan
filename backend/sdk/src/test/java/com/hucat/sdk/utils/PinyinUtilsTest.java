package com.hucat.sdk.utils;

import com.hucat.sdk.BaseTest;

import org.junit.Assert;
import org.junit.Test;

public class PinyinUtilsTest extends BaseTest {

    @Test
    public void toPy() {
        print( PinyinUtils.toSinglePy("2347371_（芒果）微百科-一禅小和尚-衣不如新，人不如故，已经不合适的，将来也不会合适了20180521-1652-VOD高清发布-189489662.mpg",true));
        print( PinyinUtils.toSinglePy("2347371_（芒果）微百科-一禅小和尚-衣不如新，人不如故，已经不合适的，将来也不会合适了20180521-1652-VOD高清发布-189489662.mpg",false));
//        print(PinyinUtils.toPy("互相伤害呀！", false));
        Assert.assertTrue(true);
    }

}
