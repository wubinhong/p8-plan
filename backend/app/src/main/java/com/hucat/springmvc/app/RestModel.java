package com.hucat.springmvc.app;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@EqualsAndHashCode(callSuper = true)
public class RestModel<T> extends MicroModel<T> {

    private static final long serialVersionUID = 2300809594032275053L;

    private static final String format = "%25s : %s";

    private String message;

    private RestModel() {
        super();
    }

    private RestModel(MicroModel<T> model) {
        super(model);
    }

    public static <T> RestModel<T> create() {
        RestModel<T> model = new RestModel<>();
        model.setTimestamp(System.currentTimeMillis());
        return model;
    }

    public static <T> RestModel create(MicroModel<T> microModel) {
        RestModel<T> restModel = new RestModel<>(microModel);
        restModel.message = restModel.codeToMessage();
        return restModel;
    }

    // 覆盖方法，返回子类对象，方便链式调用
    // 初始化错误码对应的msg

    public RestModel<T> failed() {
        super.failed();
        this.message = codeToMessage();
        return this;
    }

    public RestModel<T> failed(long code) {
        super.failed(code);
        this.message = codeToMessage();
        return this;
    }

    public RestModel<T> body(T data) {
        super.body(data);
        this.message = codeToMessage();
        return this;
    }

    public RestModel<T> success() {
        super.success();
        this.message = codeToMessage();
        return this;
    }

    //扩展方法
    public RestModel<T> failed(String message) {
        super.failed();
        this.message = message;
        return this;
    }

    public RestModel<T> success(String message) {
        super.success();
        this.message = message;
        return this;
    }

    public RestModel<T> failed(long code, String message) {
        super.failed(code);
        this.message = message;
        return this;
    }
    //根据code返回msg
    private String codeToMessage() {
        return ErrorMsg.message(this.getCode());
    }
}
