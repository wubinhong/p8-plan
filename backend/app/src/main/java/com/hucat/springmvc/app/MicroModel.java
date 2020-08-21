package com.hucat.springmvc.app;

import com.hucat.springmvc.app.enums.ModelStatus;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;

@Data
@Slf4j
public class MicroModel<T> implements Serializable {

    private static final long serialVersionUID = 5464991789274947173L;

    private Long timestamp;
    private ModelStatus status;
    private long code;
    private T data;

    public MicroModel() {
    }

    public MicroModel(MicroModel<T> model) {
        this.timestamp = model.timestamp;
        this.status = model.status;
        this.code = model.code;
        this.data = model.data;
    }

    public static <T> MicroModel<T> create() {
        MicroModel<T> model = new MicroModel<>();
        model.setTimestamp(System.currentTimeMillis());
        return model;
    }

    public MicroModel<T> failed(long code) {
        this.status = ModelStatus.FAILED;
        this.code = code;
        return this;
    }

    public MicroModel<T> failed() {
        return this.failed(ErrorCode.EC_SYS);
    }

    public MicroModel<T> body(T data) {
        if (data != null) {
            this.data = data;
        }
        return this.success();
    }

    public MicroModel<T> success() {
        this.status = ModelStatus.SUCCESS;
        this.code = ErrorCode.EC_SUCCESS;
        return this;
    }
}
