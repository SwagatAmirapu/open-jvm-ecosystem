package com.openjvm.compiler;

public class OpCode {
    private String instruction;
    private String argument;
    private String description;

    public OpCode() {}

    public OpCode(String instruction, String argument, String description) {
        this.instruction = instruction;
        this.argument = argument;
        this.description = description;
    }

    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }

    public String getArgument() { return argument; }
    public void setArgument(String argument) { this.argument = argument; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}