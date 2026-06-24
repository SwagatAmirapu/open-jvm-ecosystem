package com.openjvm.compiler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.openjvm.compiler.Token.TokenType;

public class BytecodeCompiler {

    public List<OpCode> compile(List<Token> tokens) {
        List<OpCode> opCodes = new ArrayList<>();
        Map<String, Integer> registerTable = new HashMap<>();
        int nextRegisterSlot = 1; // Slot 0 is usually reserved in standard JVM

        int i = 0;
        while (i < tokens.size()) {
            // Match pattern: int [IDENTIFIER] = [NUMBER or EXPRESSION];
            if (tokens.get(i).getType() == TokenType.KEYWORD && tokens.get(i).getValue().equals("int")) {
                i++; // step over 'int'
                
                if (i < tokens.size() && tokens.get(i).getType() == TokenType.IDENTIFIER) {
                    String varName = tokens.get(i).getValue();
                    i++; // step over identifier
                    
                    if (i < tokens.size() && tokens.get(i).getType() == TokenType.ASSIGN_OP) {
                        i++; // step over '='
                        
                        // Check if it's a simple assignment: int a = 5;
                        if (i < tokens.size() && tokens.get(i).getType() == TokenType.NUMBER && 
                            (i + 1 < tokens.size() && tokens.get(i + 1).getType() == TokenType.SEMICOLON)) {
                            
                            String numberVal = tokens.get(i).getValue();
                            
                            // Map variable name to an internal register slot index if not registered
                            registerTable.putIfAbsent(varName, nextRegisterSlot++);
                            int regSlot = registerTable.get(varName);

                            // Generate Op-Codes
                            opCodes.add(new OpCode("bipush", numberVal, "Push literal integer value " + numberVal + " onto the operand stack frame."));
                            opCodes.add(new OpCode("istore", String.valueOf(regSlot), "Pop top element off stack and write into local variable register _" + regSlot + " (" + varName + ")."));
                            i += 2; // step over number and ';'
                        } 
                        // Check if it's a math expression statement: int result = a + b;
                        else if (i < tokens.size() && tokens.get(i).getType() == TokenType.IDENTIFIER) {
                            String leftVar = tokens.get(i).getValue();
                            i++; // step over first identifier
                            
                            if (i < tokens.size() && tokens.get(i).getType() == TokenType.MATH_OP && tokens.get(i).getValue().equals("+")) {
                                i++; // step over '+'
                                
                                if (i < tokens.size() && tokens.get(i).getType() == TokenType.IDENTIFIER) {
                                    String rightVar = tokens.get(i).getValue();
                                    i++; // step over second identifier
                                    
                                    if (i < tokens.size() && tokens.get(i).getType() == TokenType.SEMICOLON) {
                                        
                                        registerTable.putIfAbsent(varName, nextRegisterSlot++);
                                        int targetReg = registerTable.get(varName);
                                        
                                        int leftReg = registerTable.getOrDefault(leftVar, 0);
                                        int rightReg = registerTable.getOrDefault(rightVar, 0);

                                        // Generate visual math evaluation operations pipeline
                                        opCodes.add(new OpCode("iload", String.valueOf(leftReg), "Load integer value from local register slot _" + leftReg + " (" + leftVar + ") onto the stack."));
                                        opCodes.add(new OpCode("iload", String.valueOf(rightReg), "Load integer value from local register slot _" + rightReg + " (" + rightVar + ") onto the stack."));
                                        opCodes.add(new OpCode("iadd", "", "Pop top two values off the operand stack, calculate their integer sum, and push the result back onto the stack."));
                                        opCodes.add(new OpCode("istore", String.valueOf(targetReg), "Pop expression execution result and write into local variable register _" + targetReg + " (" + varName + ")."));
                                        i++; // step over ';'
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                i++; // Fallback pointer movement increment
            }
        }
        return opCodes;
    }
}