package com.hucat.sdk.utils;

import com.hucat.sdk.consts.Globals;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;

/**
 * 加解密相关工具类
 *
 * @author wubinhong
 */
@Slf4j
public class CryptUtils {

    /**
     * 密钥
     */
    private static final String privateKey = "Crackers and the thief will suffer misfortune";

    /**
     * 可逆加密
     *
     * @param source 需要加密的内容
     * @return
     */
    public static String encrypt(final String source) {
        try {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            secureRandom.setSeed(privateKey.getBytes());
            kgen.init(128, secureRandom);
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            byte[] byteContent = source.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            log.info("Length: {} | {}", result.length, Hex.encodeHexString(result));
            String e = Base64.encodeBase64String(result);
            return e; // 加密
        } catch (Exception e) {
            log.error("encrypt error!", e);
        }
        return null;
    }

    /**
     * 可逆解密
     *
     * @param encryptedStr
     * @return
     */
    public static String decrypt(final String encryptedStr) {
        try {
            byte[] content = Base64.decodeBase64(encryptedStr);
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            secureRandom.setSeed(privateKey.getBytes());
            kgen.init(128, secureRandom);
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            cipher.init(Cipher.DECRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(content);
            String r = new String(result, "UTF-8");
            return r; // 解密
        } catch (Exception e) {
            log.error("decrypt error!", e);
        }
        return null;
    }

    /**
     * 用于生成密码盐
     *
     * @return
     */
    public static String generateToken() {
        return new BigInteger(130, new SecureRandom()).toString(32);
    }

    public static String sha256Hex(String str) {
        return DigestUtils.sha256Hex(str);
    }

    public static String md5Hex(String str) {
        return DigestUtils.md5Hex(str);
    }

    public static String md5Digest(String src) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
            byte[] b = md.digest(src.getBytes(Globals.CHARSET_UTF8));
            return byte2HexStr(b);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static String byte2HexStr(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            String s = Integer.toHexString(b & 0xFF);
            if (s.length() == 1)
                sb.append("0");
            sb.append(s.toUpperCase());
        }
        return sb.toString();
    }

    public static String encodeBase64(String src) {
        try {
            byte[] encodedBytes = Base64.encodeBase64(src.getBytes(Globals.CHARSET_UTF8));
            return new String(encodedBytes, Globals.CHARSET_UTF8);
        } catch (UnsupportedEncodingException e) {
            log.error("", e);
            return null;
        }
    }

    public static String decodeBase64(String dest) {
        try {
            byte[] decodeBytes = Base64.decodeBase64(dest.getBytes(Globals.CHARSET_UTF8));
            return new String(decodeBytes, Globals.CHARSET_UTF8);
        } catch (UnsupportedEncodingException e) {
            log.error("", e);
            return null;
        }
    }
}
