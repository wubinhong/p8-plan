package com.hucat.sdk.consts;

/**
 * 缓存相关配置
 *
 * @author wubinhong
 */
public final class CacheKey {

    /********************************
     * apps layout
     ********************************/
    /**
     * app管理区
     */
    public static final String REGION_APPS_ADMIN = "app_admin";
    /**
     * app接口区
     */
    public static final String REGION_APPS_API = "app_api";

    /**
     * 短信验证码
     */
    public static final String REGION_SMS_IP = "apps_api_sms_ip";

    /**
     * app独立区
     */
    public static final String REGION_APPS_STANDALONE = "app_standalone";

    /**
     * gateway服务区
     */
    public static final String REGION_GATEWAY_SERVER = "gateway_server";

    /**
     * BO服务区
     */
    public static final String REGION_SERVICES_BO = "app_bo";

    /********************************
     * services layout
     ********************************/
    /**
     * 账号区
     */
    public static final String REGION_API_ACCOUNT = "api_user";
    public static final String REGION_SERVICES_ACCOUNT = "service_user";
    /**
     * 管理区
     */
    public static final String REGION_API_ADMIN = "api_admin";
    public static final String REGION_SERVICES_ADMIN = "service_admin";
    /**
     * 文件存储区
     */
    public static final String REGION_API_OSS = "api_oss";
    public static final String REGION_SERVICES_OSS = "service_oss";
    /**
     * 系统存储区
     */
    public static final String REGION_API_SYS = "api_sys";
    public static final String REGION_SERVICES_SYS = "service_sys";
    /**
     * 消息推送存储区
     */
    public static final String REGION_API_MESSAGE = "api_message";
    public static final String REGION_SERVICES_MESSAGE = "service_message";
    /**
     * 交易模块
     */
    public static final String REGION_API_TRADE = "api_trade";
    public static final String REGION_SERVICES_TRADE = "service_trade";

    /**
     * 频道&频道节目鉴权Token
     */
    public static final String REDIS_KEY_PLAY_TOKEN = CacheKey.REGION_SERVICES_BO + "_play_token_";

    /********************************
     * child region method
     ********************************/
    public static String getSubRegionKey(String region, String... subRegions) {
        StringBuilder sb = new StringBuilder().append(region);
        for (String subRegion : subRegions) {
            sb.append("_").append(subRegion);
        }
        return sb.toString();
    }

}
