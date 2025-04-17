package com.my.kiosk.stock.classes;

import java.util.List;

import lombok.Data;

@Data
public class RecaptchaResponse {
    private boolean success;
    private String challenge_ts;
    private String hostname;
    private List<String> errorCodes;
}
