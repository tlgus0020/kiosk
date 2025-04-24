package com.my.kiosk.sms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send")
    public String sendSms(@RequestBody Map<String, String> payload) {
        String to = payload.get("to");
        String message = payload.get("message");
        String date = payload.get("data");

        try {
            smsService.sendSms(to, message);
            return "SMS 전송 성공";
        } catch (Exception e) {
            return "에러: " + e.getMessage();
        }
    }
}
