function run(pc_line) {
    updateLabels();
    update();
    if (pc_line == undefined) pc_line = 0;
    pc = pc_line;
    const line = codeField.value.split("\n")[pc];
    if (line == undefined || line == "") {
        if (line == "") run(pc + 1);
        return;
    }


    const params = line.split(" ");

    const cmdName = params[0].toUpperCase();

    if (isNaN(params[1])) params[1] = getValue(params[1]);
    const x = parseInt(params[1]);
    
    if (cmdName == "LODD") {
        ac = memory[x];
    }
    else if (cmdName == "STOD") {
        memory[x] = ac;
    }
    else if (cmdName == "ADDD") {
        ac = ac + memory[x];
    }
    else if (cmdName == "SUBD") {
        ac = ac - memory[x];
    }
    else if (cmdName == "JPOS") {
        if (ac >= 0)
            pc = x - 1;
    }
    else if (cmdName == "JZER") {
        if (ac == 0)
            pc = x - 1;
    }
    else if (cmdName == "JUMP") {
        pc = x - 1;
    }
    else if (cmdName == "LOCO") {
        ac = x;
    }
    else if (cmdName == "LODL") {
        ac = memory[sp + x];
    }
    else if (cmdName == "STOL") {
        memory[sp + x] = ac;
    }
    else if (cmdName == "ADDL") {
        ac = ac + memory[sp + x];
    }
    else if (cmdName == "ADDL") {
        ac = ac - memory[sp + x];
    }
    else if (cmdName == "JNEG") {
        if (ac < 0)
            pc = x - 1;
    }
    else if (cmdName == "JNZE") {
        if (ac != 0)
            pc = x - 1;
    }
    else if (cmdName == "CALL") {
        sp = sp - 1;
        memory[sp] = pc;
        pc = x - 1;
    }
    else if (cmdName == "PSHI") {
        sp = sp - 1;
        memory[sp] = memory[ac];
    }
    else if (cmdName == "POPI") {
        memory[ac] = memory[sp];
        sp = sp + 1;
    }
    else if (cmdName == "PUSH") {
        sp = sp - 1;
        memory[sp] = ac;
    }
    else if (cmdName == "POP") {
        ac = memory[sp];
        sp = sp + 1;
    }
    else if (cmdName == "RETN") {
        pc = memory[sp] - 1;
        sp = sp + 1;
    }
    else if (cmdName == "SWAP") {
        const store = ac;
        ac = sp;
        sp = store;
    }
    else if (cmdName == "INSP") {
        sp = sp + x;
    }
    else if (cmdName == "DESP") {
        sp = sp - x;
    }
    else if (cmdName == "HALT") {
        return;
    } else {
        alert("Unknow command, PC = " + pc);
        return;
    }
    
    run(pc + 1);
}

function getValue(name) {
    for (let i = 0; i < variables.length; i++) {
        if (name == variables[i].name)
            return variables[i].value;
    }
    return undefined;
}