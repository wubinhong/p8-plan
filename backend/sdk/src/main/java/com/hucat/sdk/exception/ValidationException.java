package com.hucat.sdk.exception;

/**
 * Create on 9/9/16
 *
 * @author wubinhong
 */
public class ValidationException extends AppException {

    private static final long serialVersionUID = 1L;

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException() {
        super();
    }

    public ValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public ValidationException(Throwable cause) {
        super(cause);
    }

    public ValidationException(int code, String message) {
        super(message);
        this.code = code;
    }

}
