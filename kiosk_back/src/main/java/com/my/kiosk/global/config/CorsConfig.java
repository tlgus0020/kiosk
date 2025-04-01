package com.my.kiosk.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 URL 패턴 허용
                        .allowedOrigins("*") // 모든 origin 허용
                        .allowedMethods("*") // GET, POST, PUT, DELETE 등 전부 허용
                        .allowedHeaders("*") // 모든 헤더 허용
                        .allowCredentials(false); // 인증정보 포함 여부 (true 필요 시 allowedOrigins에 * 못 씀)
            }
        };
    }
}
