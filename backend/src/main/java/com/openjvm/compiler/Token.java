package com.openjvm.compiler;

public class Token {
    public enum TokenType {
        KEYWORD, IDENTIFIER, NUMBER, ASSIGN_OP, MATH_OP, SEMICOLON, UNKNOWN
    }

    private TokenType type;
    private String value;

    public Token() {}

    public Token(TokenType type, String value) {
        this.type = type;
        this.value = value;
    }

    public TokenType getType() { return type; }
    public void setType(TokenType type) { this.type = type; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}