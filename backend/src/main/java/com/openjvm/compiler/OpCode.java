package com.openjvm.compiler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpCode {
    private String instruction; // e.g., bipush, iload, istore, iadd
    private String argument;    // e.g., "5", "1" (register slot)
    private String description; // Educational breakdown of the instruction behavior
}