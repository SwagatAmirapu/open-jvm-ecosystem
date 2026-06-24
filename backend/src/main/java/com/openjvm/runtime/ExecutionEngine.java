package com.openjvm.runtime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import com.openjvm.compiler.OpCode;

public class ExecutionEngine {

    public List<ExecutionFrame> simulate(List<OpCode> instructions) {
        List<ExecutionFrame> frames = new ArrayList<>();
        Stack<Integer> virtualStack = new Stack<>();
        Map<String, Integer> virtualRegisters = new HashMap<>();

        // Inverse lookup to read variable aliases inside memory displays
        Map<String, String> registerToNameMap = new HashMap<>();

        for (int pc = 0; pc < instructions.size(); pc++) {
            OpCode op = instructions.get(pc);
            String instr = op.getInstruction();
            String arg = op.getArgument();

            switch (instr) {
                case "bipush":
                    virtualStack.push(Integer.parseInt(arg));
                    break;

                case "istore":
                    if (!virtualStack.isEmpty()) {
                        int val = virtualStack.pop();
                        // Extract original variable identifier tag from description text string strings
                        String varLabel = extractVarName(op.getDescription(), "register _" + arg);
                        virtualRegisters.put(varLabel, val);
                        registerToNameMap.put(arg, varLabel);
                    }
                    break;

                case "iload":
                    String varLabel = registerToNameMap.getOrDefault(arg, "var_slot_" + arg);
                    int val = virtualRegisters.getOrDefault(varLabel, 0);
                    virtualStack.push(val);
                    break;

                case "iadd":
                    if (virtualStack.size() >= 2) {
                        int v2 = virtualStack.pop();
                        int v1 = virtualStack.pop();
                        virtualStack.push(v1 + v2);
                    }
                    break;
            }

            // Capture deep copy snapshots of mutable collection frames
            List<Integer> stackSnapshot = new ArrayList<>(virtualStack);
            Map<String, Integer> registersSnapshot = new HashMap<>(virtualRegisters);

            frames.add(new ExecutionFrame(
                pc,
                op.getInstruction() + " " + op.getArgument(),
                stackSnapshot,
                registersSnapshot,
                op.getDescription()
            ));
        }

        return frames;
    }

    private String extractVarName(String description, String anchor) {
        try {
            int start = description.indexOf("(");
            int end = description.indexOf(")");
            if (start != -1 && end != -1) {
                return description.substring(start + 1, end);
            }
        } catch (Exception e) {
            // fallback
        }
        return anchor;
    }
}