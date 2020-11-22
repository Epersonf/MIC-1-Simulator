function update() {
    variablesField.value = `Processor registers:\nPC: ${pc}
SP: ${sp}
AC: ${ac}
\nGlobal Variables:\n`; 

    for (let i = 0; i < variables.length; i++) {
        variablesField.value += `${variables[i]["name"]}: ${variables[i]["value"]}, points to ${memory[variables[i]["value"]]} \n`;
    }

    variablesField.value += "\nMemory:\n";

    for (let i = 0; i < memorySize; i++) {
        variablesField.value += `M[${i}]: ${memory[i]}\n`;
    }
}

function addValue(name, value) {
    if (name == undefined || name == "" || !isNaN(name) || name == "SP" || name == "PC" || name == "AC") return;
    if (value == undefined || value === "") return;
    value = parseInt(value);

    if (name.toUpperCase().startsWith("M[") && name.endsWith("]")) {
        const index = parseInt(name.toUpperCase().replace("M[", "").replace("]", ""));
        memory[index] = value;
        update();
        return;
    }

    const obj = {
        "name": name,
        "value": value
    };

    for (let i = 0; i < variables.length; i++) {
        if (variables[i].name != obj.name) continue;
        variables[i].value = value;
        update();
        return;
    }

    variables.push(obj);
    update();
}

function updateLabels() {
    const labels = labelsField.value.split("\n");
    for (let i = 0; i < labels.length; i++) {
        if (labels[i] == "") continue;
        addValue(labels[i], i);
    }
}