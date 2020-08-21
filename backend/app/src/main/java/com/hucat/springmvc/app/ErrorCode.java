package com.hucat.springmvc.app;

public class ErrorCode {

    /**
     * 系统异常
     **/
    public final static int EC_SUCCESS = 0;// 正常响应
    public final static int EC_SYS = 500;// 系统错误
    public final static int EC_PARAM = 501;// 参数错误
    public final static int EC_NO_FOUND = 502;// 数据不存在
    public final static int EC_SIGN_ERROR = 503;// 签名失败，无法完成请求
    public final static int EC_FORMAT_ERROR = 504;// 发送数据格式错误
    public final static int EC_LACK_PARAM = 505;// 缺少必需的参数
    public final static int EC_LACK_CLIENT_HEADER = 506;// 缺少必须的请求头信息(x-tianchi-client)
    public final static int EC_BAD_REQUEST = 507;// 未知来源的非法请求
    public final static int EC_LACK_SITE_TOKEN_HEADER = 508;// 缺少子站点Token头信息(x-site-token)

    /**
     * 授权异常
     **/
    public final static int EC_ADMIN_NOT_LOGIN = 1001;// 用户未登录
    public final static int EC_ADMIN_LOGIN_FAIL = 1002;// 登录账号或密码错误
    public final static int EC_ADMIN_RE_LOGIN = 1003;// 已经登录，禁止重复登录
    public final static int EC_ADMIN_LOGOUT_FAIL = 1004;// 退出登录失败
    public final static int EC_ADMIN_NOT_EXISTS = 1005;// 用户不存在
    public final static int EC_ADMIN_REG_FAIL = 1006;// 注册失败
    public final static int EC_ADMIN_MOBILE_NOT_EXISTS = 1007;// 手机号不存在
    public final static int EC_ADMIN_EMAIL_NOT_EXISTS = 1008;// 邮箱不存在
    public final static int EC_ADMIN_EMAIL_CODE_ERROR = 1009;// 邮箱验证码错误
    public final static int EC_ADMIN_MOBILE_OR_EMAIL_ERROR = 1010;// 手机号或邮箱不存在
    public final static int EC_ADMIN_LOGIN_PARAM_ERROR = 1011;// 请填写账号和密码
    public final static int EC_ADMIN_REG_PARAM_ERROR = 1012;// 请填写账号
    public final static int EC_ADMIN_FINDPWD_MOBILE_ERROR = 1013;// 请填写手机号
    public final static int EC_ADMIN_FINDPWD_EMAIL_ERROR = 1014;// 请填写邮箱
    public final static int EC_ADMIN_FINDPWD_MOBILE_EMAIL_ERROR = 1015;// 请填写找回密码时使用的手机号或邮箱
    public final static int EC_ADMIN_INVITE_ADVISER_ERROR = 1016;// 顾问不能邀请其他顾问
    public final static int EC_ADMIN_INVITE_NOT_EXISTS = 1017;// 邀请人不存在
    public final static int EC_ADMIN_NOT_PERMISSION = 1018;// 用户没有权限
    public final static int EC_ADMIN_MOBILE_EXISTS = 1019;// 手机号码已经存在
    public final static int EC_ADMIN_NOT_BIND_MOBILE = 1020;// 未绑定手机
    public final static int EC_ADMIN_STOCK_PUBLISH_AUTH = 1021;// 专业资料不完整，请先进行专业认证
    public final static int EC_ADMIN_FORBIDDEN = 1022;// 已被禁用

    // 用户管理
    public final static int EC_USER_FORBIDDEN = 2001;//用户禁用
    public final static int EC_USER_STB_FORBIDDEN = 2002;//设备禁用
    public final static int EC_USER_STB_NOT_EXIST = 2003;//设备非法
    public final static int EC_USER_IDENTITY_ID_REPEAT = 2004; //证件号码重复
    public final static int EC_USER_STB_EXIST = 2005;//设备存在
    public final static int EC_USER_STB_CRASH_LOG_SAVE_FAILED = 2006; //设备错误日志保存失败
    public final static int EC_USER_STB_NONE = 2007; //终端未开户
    public final static int EC_USER_STB_INVALID = 2008; //终端无效
    public final static int EC_USER_STB_EXPIRE = 2009; //终端过期
    public final static int EC_USER_STB_SUSPEND = 2010; //终端停机
    public final static int EC_USER_STB_CANCEL = 2011; //终端销户


    // 设备管理
    public final static int EC_STB_CREATE_FAIL = 2101; //新增设备失败
    public final static int EC_STB_UPDATE_FAIL = 2102; //修改设备失败
    public final static int EC_STB_DELETE_FAIL = 2103; //删除设备失败

    /**
     * admin模块
     **/
    // 3000-3099预留给admin用户管理模块
    public final static int EC_ADMIN_PWD_ERROR = 3001;// 密码不符合规范
    public final static int EC_ADMIN_EXISTS = 3002;//用户名或邮箱已存在
    public final static int EC_ADMIN_PWD_SHORTED = 3003;//密码太短
    // 3100-3169预留给节目管理模块
    public final static int EC_CONTENT_PROGRAMME_NOT_EXIST = 3100;//节目不存在
    public final static int EC_CONTENT_PROGRAMME_SAVE_FAIL = 3101;//节目保存失败
    public final static int EC_CONTENT_PROGRAMME_DELETE_FAIL = 3102;//节目保存失败
    public final static int EC_CONTENT_LIVE_CHANNEL_SAVE_FAIL = 3103;//直播频道设置失败
    public final static int EC_CONTENT_LIVE_CHANNEL_DELETE_FAIL = 3104;//直播频道设置删除失败
    public final static int EC_CONTENT_PROGRAMME_TYPE_SAVE_FAIL = 3105;//节目二级分类设置失败
    public final static int EC_CONTENT_PROGRAMME_VIDEO_EXIST = 3106;//节目视频存在
    public final static int EC_CONTENT_PROGRAMME_VIDEO_SAVE_FAIL = 3107;//节目视频保存失败
    public final static int EC_CONTENT_PROGRAMME_VIDEO_NOT_EXIST = 3108;//节目视频不存在
    public final static int EC_CONTENT_PROGRAMME_VIDEO_ALREADY_EXIST = 3109;//节目对应子集已经存在
    public final static int EC_CONTENT_PROGRAMME_IN_SUBJECT = 3110;//节目包含在专题中
    public final static int EC_CONTENT_PROGRAMME_IS_RECOMMENDED = 3111;//节目在推荐位
    public final static int EC_CONTENT_PROGRAMME_IS_VISIBLE = 3112;//节目没有下架
    public final static int EC_CONTENT_PROGRAMME_VIDEO_LIST_IS_EMPTY = 3113;//节目视频列表为空
    public final static int EC_CONTENT_PROGRAMME_VIDEO_SORT_REPEAT = 3114;//节目集数重复
    public final static int EC_CONTENT_PROGRAMME_VIDEO_SORT_EXIST = 3115;//节目集数存在
    public final static int EC_CONTENT_PROGRAMME_VIDEO_DELETE_FAIL = 3116;//节目删除失败
    public final static int EC_CONTENT_PROGRAMME_IMPORT_PARTIAL_SUCCESS = 3117;//节目导入部分成功
    public final static int EC_CONTENT_PROGRAMME_IMPORT_FAIL = 3118;//节目导入失败
    public final static int EC_CONTENT_PROGRAMME_VIDEO_IMPORT_FAIL = 3119;//节目视频导入失败


    // 3170-3189预留专题模块
    public final static int EC_CONTENT_SUBJECT_NOT_EXIST = 3170;  //专题不存在
    public final static int EC_CONTENT_SUBJECT_DELETE_FAILED = 3171;//专题删除失败
    public final static int EC_CONTENT_SUBJECT_SAVE_FAILED = 3172; //专题创建失败
    public final static int EC_CONTENT_SUBJECT_MODIFIED_FAILED = 3173; //专题修改失败
    public final static int EC_CONTENT_SUBJECT_IS_RECOMMENDED = 3174;//专题在栏目推荐位
    public final static int EC_CONTENT_SUBJECT_IS_VISIBLE = 3175;//专题没有下架

    // 3190-3199预留给栏目管理
    public final static int EC_CONTENT_NAV_BAR_SAVE_FAIL = 3190; //栏目保存失败
    public static final int EC_CONTENT_NAV_BAR_NOT_EXIST = 3191; //指定栏目不存在
    public static final int EC_CONTENT_NAV_BAR_DELETE_FAIL = 3192; //栏目删除失败

    // 3200-3299人物模块
    public final static int EC_CONTENT_FIGURE_EXISTS = 3200; //人物已存在
    public final static int EC_CONTENT_FIGURE_NOT_EXISTS = 3201; //人物不存在
    public final static int EC_CONTENT_FIGURE_PHOTO_UPLOAD_FAILED = 3202; //人物照片上传失败
    public final static int EC_CONTENT_FIGURE_PHOTO_DELETE_FAILED = 3203; //人物照片删除失败
    public final static int EC_CONTENT_FIGURE_IMPORT_FAIL = 3204;//人物批量导入失败
    public final static int EC_CONTENT_FIGURE_IS_VISIBLE = 3205; //人物没有下架
    public final static int EC_CONTENT_FIGURE_IN_SUBJECT = 3206;//人物包含在专题中
    public final static int EC_CONTENT_FIGURE_IS_RECOMMENDED = 3207;//人物在推荐位
    public final static int EC_CONTENT_FIGURE_IS_HOT_FIGURE = 3208;//人物是热门人物
    public final static int EC_CONTENT_FIGURE_IN_PROGRAMME = 3209;//人物包含在节目中
    public final static int EC_CONTENT_FIGURE_IN_PROGRAMME_VIDEO = 3210;//人物包含在节目视频中

    // 3400-3499推荐布局模块
    public final static int EC_CONTENT_SUBJECT_LAYOUT_NOT_EXISTS = 3400; //专题布局不存在
    public final static int EC_CONTENT_SUBJECT_LAYOUT_EXISTS = 3401;//专题布局已存在
    public final static int EC_CONTENT_LAYOUT_SET_FAIL = 3402;// 栏目布局设置失败
    public final static int EC_CONTENT_LAYOUT_NOT_EXISTS = 3403;//栏目布局不存在


    // 3300-3399storage-center模块
    public final static int EC_STORAGE_EXISTS = 3300;//媒体资源已经存在
    public final static int EC_STORAGE_INVALID_FORMAT = 3301;//媒体文件格式非法
    public final static int EC_STORAGE_TRANSCODE_TASK_FAILED = 3302;//视频转码任务失败
    public final static int EC_STORAGE_TS_FILE_UPLOAD_FAIL = 3303;//TS文件上传失败
    public final static int EC_STORAGE_M3U8FILE_UPLOAD_FAIL = 3304;//M3U8文件上传失败
    public final static int EC_STORAGE_FILE_SAVE_FAIL = 3305;//媒体文件保存失败
    public final static int EC_STORAGE_VIDEO_IN_PROGRAMME = 3306;// 视频在节目中存在
    public final static int EC_STORAGE_VIDEO_RESOLUTION_NOT_MATCH = 3307;// 上传视频分辨率不匹配
    public final static int EC_STORAGE_VIDEO_IN_CAROUSEL_CHANNEL = 3308;//视频在轮播频道中存在
    public final static int EC_STORAGE_VIDEO_NOT_FOUND = 3309; //视频未找到
    public final static int EC_STORAGE_VIDEO_INCOMPLETE = 3310; //无效视频
    public final static int EC_STORAGE_VIDEO_STATUS_PROHIBIT_DELETE = 3311;// 视频状态不允许删除
    public final static int EC_STORAGE_VIDEO_DEFINITION_ABSENT = 3320;  // 视频定义文件不存在
    public final static int EC_STORAGE_BAD_VIDEO_DEFINITION = 3321;  // 无效的视频定义
    public final static int EC_STORAGE_VIDEO_EXPORT_TASK_DELETE_FAIL = 3322;  // 导出视频任务删除失败
    public final static int EC_STORAGE_VIDEO_EXPORT_NOT_EXISTS = 3323;  // 导出视频任务删不存在
    public final static int EC_STORAGE_VIDEO_UPLOAD_MASTER_FAILED = 3324; // 视频上传主站失败
    public final static int EC_STORAGE_MASTER_INVOKE_FAILED = 3325; // 调用主站接口失败
    public final static int EC_STORAGE_GET_MASTER_VIDEO_FAILED = 3326; // 调用主站接口失败
    public final static int EC_STORAGE_VIDEO_UPLOADIND = 3327; // 正在上传
    public final static int EC_STORAGE_VIDEO_UPLOAD_SUCCESS = 3328; // 上传完成
    public final static int EC_STORAGE_VIDEO_DOWNLOADING = 3329; // 正在上传
    public final static int EC_STORAGE_VIDEO_DOWNLOAD_SUCCESS = 3330; // 上传完成

    // 3500-3599 ad-center模块
    public final static int EC_AD_LIVE_CHANNEL_LAYOUT_SET_FAIL = 3500;//直播频道设置失败
    public final static int EC_AD_LIVE_CHANNEL_LAYOUT_MODIFY_FAIL = 3501;//直播频道修改失败
    public final static int EC_AD_LIVE_CHANNEL_NOT_FOUND = 3502;//直播频道查找失败
    public final static int EC_AD_GENERAL_AD_SAVE_FAIL = 3503;//全局广告保存失败
    public final static int EC_AD_GENERAL_AD_MODIFY_FAIL = 3504;//全局广告修改失败
    public final static int EC_AD_GENERAL_AD_DELETE_FAIL = 3505;//全局广告删除失败
    public final static int EC_AD_GENERAL_AD_NOT_FOUND = 3506;//全局广告查找失败
    public final static int EC_AD_RECOMMEND_LAYOUT_AD_SET_FAIL = 3507;//推荐布局广告设置失败
    public final static int EC_AD_RECOMMEND_LAYOUT_AD_NOT_FOUND = 3508;//推荐布局广告查询失败
    public final static int EC_AD_PROGRAMME_AD_SAVE_FAIL = 3509;//节目广告保存失败
    public final static int EC_AD_PROGRAMME_AD_MODIFY_FAIL = 3510;//节目广告修改失败
    public final static int EC_AD_PROGRAMME_AD_DELETE_FAIL = 3511;//节目广告删除失败
    public final static int EC_AD_PROGRAMME_AD_NOT_FOUND = 3512;//节目广告查找失败
    public final static int EC_AD_MATERIAL_SAVE_FAIL = 3513;//广告素材保存失败
    public final static int EC_AD_MATERIAL_MODIFY_FAIL = 3514;//广告素材修改失败
    public final static int EC_AD_MATERIAL_DELETE_FAIL = 3515;//广告素材删除失败

    // 直播模块 3600-3699
    public final static int EC_LIVE_CAROUSEL_VIDEO_LIST_EMPTY = 3601; //添加轮播视频列表为空
    public final static int EC_LIVE_CHANNEL_NOT_EXIST = 3602;//频道不存在
    public final static int EC_LIVE_CAROUSEL_VIDEO_INVALID = 3603;//轮播视频无效
    public final static int EC_LIVE_CHANNEL_VISIBLE_FAIL = 3604; //频道上下架失败
    public final static int EC_LIVE_CHANNEL_PROGRAMME_LIST_IMPORT_FAILED = 3605; //直播频道节目单导入失败
    public final static int EC_LIVE_CHANNEL_NAME_EXISTS = 3606; //频道名字存在
    public final static int EC_LIVE_CHANNEL_INNER_NAME_EXISTS = 3607; //频道内部名字存在
    public final static int EC_LIVE_CHANNEL_MULTICAST_ADDRESS_EXISTS = 3608; //频道组播地址存在
    public final static int EC_LIVE_CHANNEL_NUM_EXISTS = 3609; //频道号已存在
    public final static int EC_LIVE_CHANNEL_RECOMMENDED_IN_LAYOUT = 3610; //频道在推荐位
    public final static int EC_LIVE_CHANNEL_RECOMMENDED_IN_CHANNEL_LAYOUT = 3611; //频道在频道布局推荐位
    public final static int EC_LIVE_CHANNEL_HAS_NO_VIDEO = 3612; //频道没有关联视频
    public final static int EC_LIVE_CHANNEL_RECORD_START_FAILED = 3613;//频道启用录制失败
    public final static int EC_LIVE_CHANNEL_RECORD_STOP_FAILED = 3614;//频道停用录制失败
    public final static int EC_LIVE_SERVER_INVOKE_FAILED = 3615;//直播、轮播服务调用失败
    public final static int EC_LIVE_CHANNEL_RECORD_ADDRESS_EXISTS = 3616;//频道录制地址存在

    // SYS模块 3700-3799
    public final static int EC_SYS_CLIENT_VERSION_EXIST = 3700; //版本号已存在
    public final static int EC_SYS_SITE_NAME_DUPLICATED = 3710; // 站点名重复
    public final static int EC_SYS_SITE_NOT_FOUND = 3711; // 站点未找到
    public final static int EC_SYS_CONFIG_SITE_NOT_CONFIG = 3712; //尚未配置主站
    public final static int EC_SYS_CONFIG_MASTER_SITE_NOT_CONFIG = 3713; //主站点域名未配置
    public final static int EC_SYS_CONFIG_SITE_TOKEN_CONFIG_ERR = 3714; //主站token配置失败
    public final static int EC_SYS_MASTER_INVOKE_FAILED = 3715; //主站接口调用失败
    public final static int EC_SYS_GET_SERVER_HOST_IP_FAILED = 3716; // 获取服务器IP地址失败

    // BO模块 3800-3869
    public final static int EC_BO_PRODUCT_NAME_REPEAT = 3800; //产品包名称重复
    public final static int EC_BO_PRODUCT_NOT_EXIST = 3801; //产品包不存在
    public final static int EC_BO_PRODUCT_AUTHENTICATE_FAILED = 3802;//鉴权失败
    public final static int EC_BO_PRODUCT_AUTHENTICATE_FAILED_NONE = 3803;//您尚未办理套餐业务，需到广电收费营业厅办理
    public final static int EC_BO_PRODUCT_AUTHENTICATE_FAILED_EXPIRE = 3804;//已过期
    public final static int EC_BO_PRODUCT_AUTHENTICATE_FAILED_SUSPEND = 3805;//已停机
    public final static int EC_BO_PRODUCT_AUTHENTICATE_EXCEPTION = 3806;//鉴权异常

    // OTT Master 模块 3870-3899
    public final static int EC_MASTER_RECEIVE_VIDEO_SPLIT_INTERRUPTED = 3870; // 主站点接收视频切片被中断
    public final static int EC_MASTER_UPLOAD_VIDEO_SPLIT_FAILED = 3871; // 上传视频切片至FastDFS失败
    public final static int EC_MASTER_UPLOAD_VIDEO_M3U8_FAILED = 3872; // 上传视频m3u8至FastDFS失败
    public final static int EC_MASTER_VIDEO_ALREADY_UPLOADED = 3873; // 视频已经成功上传
    public final static int EC_MASTER_VIDEO_NOT_GRANTED = 3874; // 无权访问该视频
    public final static int EC_MASTER_VIDEO_SPLIT_SORT_GT_TOTAL = 3875; // 视频切片序号大于总切片数
    public final static int EC_MASTER_STORAGE_SERVICE_NOT_FOUND = 3876; // 存储服务实例找到
}