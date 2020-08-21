package com.hucat.sdk.exception;

/**
 * Indicates a problem at the service layout.
 *
 * @author wubinhong
 */
public class ServiceException extends HucatException {

    private static final long serialVersionUID = -3412261828511947898L;

    public ServiceException(String message, Throwable root) {
        super(message, root);
    }

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(int code, String message) {
        super(message);
        this.code = code;
    }


}
