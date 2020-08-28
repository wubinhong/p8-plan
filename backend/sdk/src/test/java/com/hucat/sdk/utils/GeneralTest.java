package com.hucat.sdk.utils;

import com.google.common.hash.Hashing;
import com.google.common.io.Files;
import com.hucat.sdk.BaseTest;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
                Thread.sleep(2000);
                return "Hello";
            }
        });
        print(submit1.get());
    }

    @Test
    public void test() {
        // 889c1fb782eb1e7338ca83176b55542fcf847f95ec9bd12feec6a5b1c5df495a
        String source = "sdfasf2222555";
        String sha256hex = Hashing.sha256().hashString(source, StandardCharsets.UTF_8).toString();
        log.info("Result: {}", sha256hex);
        // log.info("Length: {} | {}", result.length, Hex.encodeHexString(result));
        log.info("Result: {}", CryptUtils.encrypt("sdfasf2222"));
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
    }

}
