package com.hucat.sdk.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Create on 9/26/16
 * 签名工具（被大量应用在支付参数校验上）
 *
 * @author wubinhong
 */
public class SignatureUtils {

    /**
     * 签名（暂时只支持md5签名）
     *
     * @param params          要前面的参数map
     * @param secretKey       拼接密钥（防止破解）
     * @param ignoreParamName 需要忽略的参数（防止反复签名）
     * @return
     */
    public static String sign(Map<String, Object> params, String secretKey, String ignoreParamName) {
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        List<String> sortedParams = keys.stream()
                .filter(key -> !key.equals(ignoreParamName)
                        && !StringUtils.isEmpty(params.get(key) == null ? null : params.get(key).toString()))
                .map(key -> String.format("%s=%s", key, params.get(key))).collect(Collectors.toList());
        String join = StringUtils.join(sortedParams, "&");
        return CryptUtils.md5Hex(String.format("%s&key=%s", join, secretKey)).toUpperCase();
    }

}
