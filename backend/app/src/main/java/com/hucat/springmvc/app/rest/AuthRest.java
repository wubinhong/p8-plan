package com.hucat.springmvc.app.rest;

import com.hucat.springmvc.app.RestModel;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
//@RequestMapping(path = BaseRest.ADMIN_V1 + "/auth", produces = {APPLICATION_JSON_VALUE})
public class AuthRest {

    @GetMapping("/")
    @ApiOperation("测试，勿删")
    public RestModel getTest(@RequestParam(required = false) String username) {
        log.info("测试！！！Test...");
        return RestModel.create().body(System.currentTimeMillis());
    }

}
