package com.hucat.sdk.exception;

/**
 * Custom exception for hucat
 *
 * @author wubinhong
 */
public class HucatException extends Exception {

    private static final long serialVersionUID = -4005533212942494208L;

    protected int code;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public HucatException() {
        super();
    }

    public HucatException(Throwable cause) {
        super(cause);
    }

    public HucatException(String message) {
        super(message);
    }

    public HucatException(String message, Throwable root) {
        super(message, root);
    }

    public HucatException(int code, String message) {
        super(message);
        this.code = code;
    }
}
