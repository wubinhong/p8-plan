package com.hucat.sdk.utils;

import lombok.extern.slf4j.Slf4j;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;

import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by liujiuwu on 2015/12/30.
 */
@Slf4j
public class PinyinUtils {

    /**
     * 全角转半角的 转换函数
     *
     * @param QJstr
     * @return
     * @throws UnsupportedEncodingException
     */
    public static final String full2HalfChange(String QJstr) throws UnsupportedEncodingException {
        StringBuffer outStrBuf = new StringBuffer("");
        String Tstr = "";
        byte[] b = null;

        for (int i = 0; i < QJstr.length(); i++) {
            Tstr = QJstr.substring(i, i + 1);
            // 全角空格转换成半角空格
            if (Tstr.equals("　")) {
                outStrBuf.append(" ");
                continue;
            }

            b = Tstr.getBytes("unicode");
            // 得到 unicode 字节数据
            if (b[2] == -1) {// 表示全角？
                b[3] = (byte) (b[3] + 32);
                b[2] = 0;
                outStrBuf.append(new String(b, "unicode"));
            } else {
                outStrBuf.append(Tstr);
            }
        }
        return outStrBuf.toString();
    }

    /**
     * 半角转全角
     *
     * @param QJstr
     * @return
     * @throws UnsupportedEncodingException
     */
    public static final String half2Fullchange(String QJstr) throws UnsupportedEncodingException {
        StringBuffer outStrBuf = new StringBuffer("");
        String Tstr = "";
        byte[] b = null;
        for (int i = 0; i < QJstr.length(); i++) {
            Tstr = QJstr.substring(i, i + 1);
            if (Tstr.equals(" ")) {// 半角空格
                outStrBuf.append(Tstr);
                continue;
            }

            b = Tstr.getBytes("unicode");
            if (b[2] == 0) { // 半角?
                b[3] = (byte) (b[3] - 32);
                b[2] = -1;
                outStrBuf.append(new String(b, "unicode"));
            } else {
                outStrBuf.append(Tstr);
            }
        }
        return outStrBuf.toString();
    }

    /**
     * 汉字转拼音,只转一个拼音
     *
     * @param words
     * @param isFirst
     * @return
     */
    public static String toSinglePy(String words, boolean isFirst) {
        if (StringUtils.isEmpty(words)) {
            return "";
        }
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setVCharType(HanyuPinyinVCharType.WITH_V);
        format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        StringBuilder ret = new StringBuilder();
        try {
            words = full2HalfChange(words);
            for (char word : words.toCharArray()) {
                if (Character.toString(word).matches("[\\u4E00-\\u9FA5]+")) {// 汉字
                    String[] py = PinyinHelper.toHanyuPinyinStringArray(word, format);
                    ret.append(isFirst ? py[0].charAt(0) : py[0]);
                } else if (Character.toString(word).matches("[\\u0061-\\u007A]+")) {// 小写字母
                    ret.append(Character.toString(word));
                } else if (Character.toString(word).matches("[\\u0041-\\u005A]+")) {// 大写字母
                    ret.append(Character.toString(word));
                } else if (Character.toString(word).matches("[\\u0030-\\u0039]+")) {// 数字
                    ret.append(Character.toString(word));
                }
            }
        } catch (Exception e) {
            log.error("convert error!", e);
        }
        return ret.toString();
    }

    /**
     * 汉字转拼音
     *
     * @param words
     * @param isFirst 是否只取首字母
     * @return
     */
    public static List<String> toPy(String words, boolean isFirst) {
        if (StringUtils.isEmpty(words)) {
            return new ArrayList<>();
        }
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setVCharType(HanyuPinyinVCharType.WITH_V);
        format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        Set<String> pyGathered = new HashSet<>();
        try {
            words = full2HalfChange(words);
            for (char word : words.toCharArray()) {
                if (Character.toString(word).matches("[\\u4E00-\\u9FA5]+")) {// 汉字
                    Set<String> polyPhones = new HashSet<>(Arrays.asList(PinyinHelper.toHanyuPinyinStringArray(word, format)));
                    pyGathered = polyPhoneCombine(pyGathered, polyPhones, isFirst);
                } else if (Character.toString(word).matches("[\\u0061-\\u007A]+")) {// 小写字母
                    Set<String> polyPhones = new HashSet<>();
                    polyPhones.add(Character.toString((char) (word)));
                    pyGathered = polyPhoneCombine(pyGathered, polyPhones, isFirst);
                } else if (Character.toString(word).matches("[\\u0041-\\u005A]+")) {// 大写字母
                    Set<String> polyPhones = new HashSet<>();
                    polyPhones.add(Character.toString((char) (word)));
                    pyGathered = polyPhoneCombine(pyGathered, polyPhones, isFirst);
                } else if (Character.toString(word).matches("[\\u0030-\\u0039]+")) {// 数字
                    Set<String> polyPhones = new HashSet<>();
                    polyPhones.add(Character.toString((char) (word)));
                    pyGathered = polyPhoneCombine(pyGathered, polyPhones, isFirst);
                }
            }
        } catch (Exception e) {
            log.error("convert error!", e);
        }
        return new ArrayList<String>(pyGathered);
    }

    /**
     * 多音字组合
     *
     * @param combinedPys 已经组合的多音字拼音字符串
     * @param polyPhones  多音字拼音字符串
     * @param isFirst     是否只取首字母
     * @return 重新新组合后的拼音字符串
     */
    private static Set<String> polyPhoneCombine(Set<String> combinedPys, Set<String> polyPhones, boolean isFirst) {
        Set<String> newCombinedPys = new HashSet<>();
        if (isFirst) {
            if (!combinedPys.isEmpty()) {
                for (String combinedPy : combinedPys) {
                    for (String polyPhone : polyPhones) {
                        newCombinedPys.add(combinedPy + polyPhone.charAt(0));
                    }
                }
            } else {
                for (String py : polyPhones) {
                    newCombinedPys.add(String.valueOf(py.charAt(0)));
                }
            }
        } else {
            if (!combinedPys.isEmpty()) {
                for (String combinedPy : combinedPys) {
                    for (String polyPhone : polyPhones) {
                        newCombinedPys.add(combinedPy + polyPhone);
                    }
                }
            } else {
                for (String py : polyPhones) {
                    newCombinedPys.add(String.valueOf(py));
                }
            }
        }
        return newCombinedPys;
    }
}
