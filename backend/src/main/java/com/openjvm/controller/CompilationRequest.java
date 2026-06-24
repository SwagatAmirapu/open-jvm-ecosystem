package com.openjvm.controller;

public class CompilationRequest {
    private String sourceCode;

    public CompilationRequest() {}

    public CompilationRequest(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public String getSourceCode() { return sourceCode; }
    public void setSourceCode(String sourceCode) { this.sourceCode = sourceCode; }
}