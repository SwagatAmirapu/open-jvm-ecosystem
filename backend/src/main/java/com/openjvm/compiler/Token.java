package com.openjvm.compiler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    public enum TokenType {
        KEYWORD,      // int
        IDENTIFIER,   // a, score, result
        NUMBER,       // 5, 12
        ASSIGN_OP,    // =
        MATH_OP,      // +, -, *, /
        SEMICOLON,    // ;
        UNKNOWN       // Unrecognized strings
    }

    private TokenType type;
    private String value;
}