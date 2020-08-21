package com.hucat.sdk.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.DynaBean;
import org.apache.commons.beanutils.DynaProperty;
import org.apache.commons.beanutils.PropertyUtilsBean;

import java.beans.PropertyDescriptor;
import java.util.Iterator;
import java.util.Map;

/**
 * Create on 8/31/16
 *
 * @author wubinhong
 */
@Slf4j
public class BeanUtils extends org.apache.commons.beanutils.BeanUtils {

    public static void copyProperties(Object dest, Object orig) {
        copyProperties(dest, orig, false);
    }

    /**
     * <p>Copy property values from the origin bean to the destination bean
     * for all cases where the property names of orig is not null</p>
     * <p>For more details see <code>BeanUtilsBean</code>.</p>
     *
     * @param dest         dest object
     * @param orig         original object
     * @param nullOverride if true then override all property of dest with orig despite orig's property is null
     * @see #copyProperties(Object, Object)
     */
    @SuppressWarnings("rawtypes")
    public static void copyProperties(Object dest, Object orig, boolean nullOverride) {
        try {
            if (nullOverride) {
                copyProperties(dest, orig);
            } else {
                // Validate existence of the specified beans
                PropertyUtilsBean propertyUtils = BeanUtilsBean.getInstance().getPropertyUtils();
                if (dest == null) {
                    throw new IllegalArgumentException("No destination bean specified");
                }
                if (orig == null) {
                    throw new IllegalArgumentException("No origin bean specified");
                }
                // Copy the properties, converting as necessary
                if (orig instanceof DynaBean) {
                    DynaProperty origDescriptors[] = ((DynaBean) orig).getDynaClass().getDynaProperties();
                    for (int i = 0; i < origDescriptors.length; i++) {
                        String name = origDescriptors[i].getName();
                        if (propertyUtils.isWriteable(dest, name)) {
                            Object value = ((DynaBean) orig).get(name);
                            if (value != null) {
                                copyProperty(dest, name, value);
                            }
                        }
                    }
                } else if (orig instanceof Map) {
                    Iterator names = ((Map) orig).keySet().iterator();
                    while (names.hasNext()) {
                        String name = (String) names.next();
                        if (propertyUtils.isWriteable(dest, name)) {
                            Object value = ((Map) orig).get(name);
                            if (value != null) {
                                copyProperty(dest, name, value);
                            }
                        }
                    }
                } else /* if (orig is a standard JavaBean) */ {
                    PropertyDescriptor origDescriptors[] =
                            propertyUtils.getPropertyDescriptors(orig);
                    for (int i = 0; i < origDescriptors.length; i++) {
                        String name = origDescriptors[i].getName();
                        if ("class".equals(name)) {
                            continue; // No point in trying to set an object's class
                        }
                        if (propertyUtils.isReadable(orig, name) &&
                                propertyUtils.isWriteable(dest, name)) {
                            try {
                                Object value = propertyUtils.getSimpleProperty(orig, name);
                                if (value != null) {
                                    copyProperty(dest, name, value);
                                }
                            } catch (NoSuchMethodException e) {
                                // Should not happen
                                log.info("impossible!", e);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("bean copy error! orig[{}] -> dest[{}]", dest, orig);
        }
    }

}
