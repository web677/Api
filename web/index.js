(function(){

    var editor = CodeMirror.fromTextArea(document.getElementById("J_json_editor"), {
        lineNumbers: true,
        mode: "application/json",
        matchBrackets: true,
        smartIndent: true,
        indentUnit: 4,
        tabSize: 4,
        theme: "eclipse"
    });

    editor.setSize("100%", 400);

    


})()