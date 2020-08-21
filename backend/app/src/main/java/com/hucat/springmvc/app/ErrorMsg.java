package com.hucat.springmvc.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class ErrorMsg {

    private static String ERROR_CODE_PREFIX = "EC_";

    private static MessageSource messageSource;

    @Autowired
    public void setMessageSource(MessageSource messageSource) {
        ErrorMsg.messageSource = messageSource;
    }

    public static String message(long code) {
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage(ERROR_CODE_PREFIX + code, null, locale);
    }
}
