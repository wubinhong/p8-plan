package com.hucat.sdk.utils;

import java.io.File;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.common.hash.Hashing;
import com.google.common.io.Files;
import com.hucat.sdk.BaseTest;

import org.junit.Assert;
import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GeneralTest extends BaseTest {

    @Test
    public void executorService() throws Exception {
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        Future<?> submit = executorService.submit(new Runnable() {
            @Override
            public void run() {
                print("run.... {}");
                try {
                    // this.wait(1000);
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        print(submit.get());

        Future<String> submit1 = executorService.submit(new Callable<String>() {
            @Override
            public String call() throws Exception {
                print("call....");
                // this.wait(1000);
                Thread.sleep(2000);
                return "Hello";
            }
        });
        String res = submit1.get();
        print(res);
        Assert.assertNotNull(res);
    }

    @Test
    public void test() {
        // 889c1fb782eb1e7338ca83176b55542fcf847f95ec9bd12feec6a5b1c5df495a
        String source = "sdfasf2222555";
        String sha256hex = Hashing.sha256().hashString(source, StandardCharsets.UTF_8).toString();
        log.info("Result: {}", sha256hex);
        // log.info("Length: {} | {}", result.length, Hex.encodeHexString(result));
        log.info("Result: {}", CryptUtils.encrypt("sdfasf2222"));
        Assert.assertEquals(source, CryptUtils.decrypt(CryptUtils.encrypt(source)));
    }

    @Test
    public void dateTime() {
        Assert.assertTrue(true);
        Date now = new Date();
        log.info("offset: {} | {}", now, TimeZone.getDefault().getID());
        String pattern = "E MMM dd HH:mm:ss XXX yyyy";
        // String pattern = "E MMMM dd HH:mm:ss z yyyy";
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        for(String zoneId : ZoneId.getAvailableZoneIds()) {
            if(zoneId.contains("Canada")) {
                df.setTimeZone(TimeZone.getTimeZone(zoneId));
                log.info("{} | {}", String.format("%25s", zoneId), df.format(now));
            }
        }

        pattern = "E MMM dd HH:mm:ss XXX'['VV']' yyyy";
        for(String zoneId : ZoneId.getAvailableZoneIds()) {
            // log.info("zoneId: {}", zoneId);
            if(zoneId.contains("Asia")) {
                ZonedDateTime zdt = ZonedDateTime.ofInstant(Instant.ofEpochMilli(now.getTime()), ZoneId.of(zoneId));
                log.info("{} | {}", String.format("%25s", zoneId), zdt.format(DateTimeFormatter.ofPattern(pattern)));
            }
        }
        log.info("ZonedDateTime.now(): {}", ZonedDateTime.now());
        log.info("DateFormat.getDateInstance: {}", DateFormat.getDateInstance(DateFormat.SHORT, Locale.ENGLISH).format(now));
        log.info("DateFormat.getDateInstance: {}", DateFormat.getDateInstance(DateFormat.MEDIUM, Locale.ENGLISH).format(now));
        log.info("DateFormat.getDateInstance: {}", DateFormat.getDateInstance(DateFormat.LONG, Locale.ENGLISH).format(now));
        log.info("DateFormat.getDateInstance: {}", DateFormat.getDateInstance(DateFormat.FULL, Locale.CHINA).format(now));

    }

    // @Test
    public void hash() throws Exception {
        // 9fa7e704b78b28837962efb468d0c3bf
        URL res = this.getClass().getClassLoader().getResource("logback.xml");
        Assert.assertNotNull(res);
        File file = new File("/Users/wubinhong/Downloads/upload/1080P_霍比特人_2.mkv");
        log.info("File size: {} byte", file.length());
        long start = System.currentTimeMillis();
        log.info("Hash check: {} | {}", Files.hash(file, Hashing.md5()).toString(), System.currentTimeMillis() - start);
        start = System.currentTimeMillis();
        log.info("Hash crc32c: {} | {}", Files.hash(file, Hashing.crc32c()).toString(),
                System.currentTimeMillis() - start);
        start = System.currentTimeMillis();
        log.info("Hash sha256: {} | {}", Files.hash(file, Hashing.sha256()).toString(),
                System.currentTimeMillis() - start);
        start = System.currentTimeMillis();
        log.info("Hash adler32: {} | {}", Files.hash(file, Hashing.adler32()).toString(),
                System.currentTimeMillis() - start);
    }

    @Test
    public void regexpGroup() {
        String input = "9fa7e704b78b28837962efb468d0c3bf";
        // 开头2个字符，相隔14个后，再取2个字符
        // Matcher matcher =
        // Pattern.compile("(\\w{2})\\w{14}(\\w{2})\\w+").matcher(input);
        // 分组后，应该如此：9 fa7e704b 7 8b288379 6 2efb468d 0 c3bf，获取各分组的字符即为：9 7 6 0
        Matcher matcher = Pattern.compile("(\\w)\\w{8}(\\w)\\w{8}(\\w)\\w{8}(\\w)\\w+").matcher(input);
        // print(matcher.find());
        if (matcher.find()) {
            for (int i = 0; i < matcher.groupCount(); i++) {
                print(matcher.group(i + 1));
            }
        }
        Assert.assertTrue(true);
    }

}
