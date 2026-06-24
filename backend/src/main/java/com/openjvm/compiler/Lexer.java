package com.openjvm.compiler;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.openjvm.compiler.Token.TokenType;

public class Lexer {
    
    // Define structural token regex patterns in order of priority
    private static final Pattern KEYWORD_PAT = Pattern.compile("^(int|double|String|void|public|class)\\b");
    private static final Pattern NUMBER_PAT = Pattern.compile("^[0-9]+");
    private static final Pattern IDENTIFIER_PAT = Pattern.compile("^[a-zA-Z_][a-zA-Z0-9_]*");
    private static final Pattern ASSIGN_PAT = Pattern.compile("^=");
    private static final Pattern MATH_PAT = Pattern.compile("^[+\\-*/]");
    private static final Pattern SEMICOLON_PAT = Pattern.compile("^;");
    private static final Pattern WHITESPACE_PAT = Pattern.compile("^\\s+");

    public List<Token> tokenize(String sourceCode) {
        List<Token> tokens = new ArrayList<>();
        String input = sourceCode;

        while (!input.isEmpty()) {
            // 1. Strip away leading whitespace
            Matcher wsMatcher = WHITESPACE_PAT.matcher(input);
            if (wsMatcher.find()) {
                input = input.substring(wsMatcher.end());
                continue;
            }

            // 2. Sequential rule evaluation matching matching bounds
            Matcher matcher = KEYWORD_PAT.matcher(input);
            if (matcher.find()) {
                tokens.add(new Token(TokenType.KEYWORD, matcher.group()));
                input = input.substring(matcher.end());
                continue;
            }

            matcher = NUMBER_PAT.matcher(input);
            if (matcher.find()) {
                tokens.add(new Token(TokenType.NUMBER, matcher.group()));
                input = input.substring(matcher.end());
                continue;
            }

            matcher = IDENTIFIER_PAT.matcher(input);
            if (matcher.find()) {
                tokens.add(new Token(TokenType.IDENTIFIER, matcher.group()));
                input = input.substring(matcher.end());
                continue;
            }

            matcher = ASSIGN_PAT.matcher(input);
            if (matcher.find()) {
                tokens.add(new Token(TokenType.ASSIGN_OP, matcher.group()));
                input = input.substring(matcher.end());
                continue;
            }

            matcher = MATH_PAT.matcher(input);
            if (matcher.find()) {
                tokens.add(new Token(TokenType.MATH_OP, matcher.group()));
                input = input.substring(matcher.end());
                continue;
            }

            matcher = SEMICOLON_PAT.matcher(input);
            if (matcher.find()) {
                tokens.add(new Token(TokenType.SEMICOLON, matcher.group()));
                input = input.substring(matcher.end());
                continue;
            }

            // 3. Fallback tracking boundary for unexpected/illegal syntax bounds
            tokens.add(new Token(TokenType.UNKNOWN, input.substring(0, 1)));
            input = input.substring(1);
        }

        return tokens;
    }
}