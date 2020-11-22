var pc;
var sp;
var ac;
const memorySize = 20;
var memory = [];
var variables = [];

var runBtn = document.querySelector("#run-btn");
var resetBtn = document.querySelector("#reset-btn");

var labelsField = document.querySelector(".labels");
var codeField = document.querySelector(".code");
var variablesField = document.querySelector(".variables");

var loadStateField = document.querySelector("#load-state");
var varAddBtn = document.querySelector("#add-var-btn");

varAddBtn.addEventListener("click", () => {
    const line = loadStateField.value.split("\n");
    for (let i = 0; i < line.length; i++) {
        if (line == "") continue;
        const params = line[i].split(";");
        addValue(params[0], params[1]);
    }
});
runBtn.addEventListener("click", () => run());
resetBtn.addEventListener("click", reset);

function reset() {
    pc = parseInt(0);
    sp = parseInt(5);
    ac = parseInt(0);
    memory = new Array(memorySize);
    variables = [];

    update();
}

reset();