package com.openjvm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EngineApplication {
    public static void main(String[] args) {
        // Bootstrap the Spring application context and start the embedded Tomcat web server
        SpringApplication.run(EngineApplication.class, args);
    }
}