package com.openjvm.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openjvm.compiler.BytecodeCompiler;
import com.openjvm.compiler.Lexer;
import com.openjvm.compiler.OpCode;
import com.openjvm.compiler.Token;
import com.openjvm.runtime.ExecutionEngine;
import com.openjvm.runtime.ExecutionFrame;

@RestController
@RequestMapping("/api/compiler")
@CrossOrigin(origins = "*") // Allows configuration connection hooks from frontend clients
public class CompilerController {

    private final Lexer lexer = new Lexer();
    private final BytecodeCompiler compiler = new BytecodeCompiler();
    private final ExecutionEngine engine = new ExecutionEngine();

    @PostMapping("/compile")
    public List<ExecutionFrame> compileAndSimulate(@RequestBody CompilationRequest request) {
        // 1. Run String Lexical Scanning Analysis
        List<Token> tokens = lexer.tokenize(request.getSourceCode());

        // 2. Down-compile Flat Token Arrays into Intermediate Bytecode Op-Codes
        List<OpCode> instructions = compiler.compile(tokens);

        // 3. Process instructions inside Virtual JVM and return snapshot timeline logs
        return engine.simulate(instructions);
    }
}