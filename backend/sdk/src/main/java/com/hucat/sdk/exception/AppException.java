package com.hucat.sdk.exception;

/**
 * Create on 9/9/16
 *
 * @author wubinhong
 */
public class AppException extends HucatException {

    private static final long serialVersionUID = 1L;

    public AppException(String message) {
        super(message);
    }

    public AppException() {
        super();
    }

    public AppException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppException(Throwable cause) {
        super(cause);
    }

    public AppException(int code, String message) {
        super(message);
        this.code = code;
    }

}
