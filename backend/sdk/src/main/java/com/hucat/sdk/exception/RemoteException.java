package com.hucat.sdk.exception;

/**
 * Create on 9/9/16
 *
 * @author wubinhong
 */
public class RemoteException extends HucatException {

    private static final long serialVersionUID = 1L;

    public RemoteException(String message) {
        super(message);
    }

    public RemoteException() {
        super();
    }

    public RemoteException(String message, Throwable cause) {
        super(message, cause);
    }

    public RemoteException(Throwable cause) {
        super(cause);
    }

    public RemoteException(int code, String message) {
        super(message);
        this.code = code;
    }


}
