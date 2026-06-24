package com.openjvm.runtime;

import java.util.List;
import java.util.Map;

public class ExecutionFrame {
    private int programCounter;
    private String currentInstruction;
    private List<Integer> operandStack;
    private Map<String, Integer> localVariables;
    private String stepExplanation;

    public ExecutionFrame() {}

    public ExecutionFrame(int programCounter, String currentInstruction, List<Integer> operandStack, 
                          Map<String, Integer> localVariables, String stepExplanation) {
        this.programCounter = programCounter;
        this.currentInstruction = currentInstruction;
        this.operandStack = operandStack;
        this.localVariables = localVariables;
        this.stepExplanation = stepExplanation;
    }

    public int getProgramCounter() { return programCounter; }
    public void setProgramCounter(int programCounter) { this.programCounter = programCounter; }

    public String getCurrentInstruction() { return currentInstruction; }
    public void setCurrentInstruction(String currentInstruction) { this.currentInstruction = currentInstruction; }

    public List<Integer> getOperandStack() { return operandStack; }
    public void setOperandStack(List<Integer> operandStack) { this.operandStack = operandStack; }

    public Map<String, Integer> getLocalVariables() { return localVariables; }
    public void setLocalVariables(Map<String, Integer> localVariables) { this.localVariables = localVariables; }

    public String getStepExplanation() { return stepExplanation; }
    public void setStepExplanation(String stepExplanation) { this.stepExplanation = stepExplanation; }
}