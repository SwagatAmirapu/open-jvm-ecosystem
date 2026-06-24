package com.openjvm.runtime;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExecutionFrame {
    private int programCounter;               // Current instruction line index pointer
    private String currentInstruction;         // e.g., "bipush 5"
    private List<Integer> operandStack;       // Snapshot of elements inside the LIFO Stack
    private Map<String, Integer> localVariables; // Snapshot of variable keys bound to values
    private String stepExplanation;           // Human-readable breakdown for student debugging
}