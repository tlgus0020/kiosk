package com.my.kiosk.sms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
    private final String ACCOUNT_SID = "";
    private final String AUTH_TOKEN = "";
    private final String FROM_NUMBER = ""; // Twilio 트라이얼 번호

    public SmsService() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendSms(String to, String body) {
        Message.creator(
            new com.twilio.type.PhoneNumber(to),
            new com.twilio.type.PhoneNumber(FROM_NUMBER),
            body
        ).create();
        
    }
}
