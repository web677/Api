(function(){

    const MOCK_URL = "http://ac-OnsG2j7w.clouddn.com/8b90ee2250190dc4f7a1.json";
    const REMOVE_HISTORY_URL = "http://ac-OnsG2j7w.clouddn.com/8b90ee2250190dc4f7a1.json";
    var resultUrl = "";

    class Toast {

        static open(content, toastClass){
            let $toast = $("#J_singleton_toast");
            let toastOnClass = "text-toast-on";
            let custClass = typeof toastClass === "string" ? toastClass : '';

            if ($toast.length == 0) {
                $toast = $(`<div id="J_singleton_toast" class="text-toast ${custClass}"></div>`).appendTo('body');
            }
            else {
                $toast[0]['className'] = `text-toast ${custClass}`;
            }

            $toast.html(content).removeClass(toastOnClass).css({ marginLeft: 0 });

            setTimeout(function () {
                $toast.css({ marginLeft: Math.round(($(window).width() - ($toast.outerWidth ? $toast.outerWidth() : $toast.width())) / 2) + 'px' }).addClass(toastOnClass);
            }, 0);
        }
    }

    const editor = CodeMirror.fromTextArea(document.getElementById("J_json_editor"), {
        lineNumbers: true,
        mode: "application/json",
        matchBrackets: true,
        smartIndent: true,
        indentUnit: 4,
        tabSize: 4,
        theme: "eclipse"
    });

    editor.setValue(
`{
    status: 1,
    data: {

    },
    info: "success"
}`)
    editor.setSize("100%", 400);

    $("#J_mock").on("click", mockHander);
    $(".J_copy").on("click", copyResult);
    $(".J_edit").on("click", editHistory);
    $(".J_remove").on("click", removeHistory);



    function mockHander(){
        var jsonText = editor.getValue();
        var protocol = $(".J_protocol:checked").val();
        var des = $("#J_description").val();
        var mockId = $("#J_mock_id").val();

        if (jsonText == ""){
            Toast.open("请输入需要mock的json数据");
            return
        }

        if (protocol == ""){
            Toast.open("请选择接口协议类型");
            return
        }

        if (des == "") {
            Toast.open("请输入接口描述");
            return
        }

        $("#J_result").val("");
        resultUrl = "";

        $.getJSON(MOCK_URL, { jsonText: jsonText, protocol: protocol, des: des, mockId: mockId}, function (res) {
            if(res.status == 1){
                $("#J_result").val(res.data.url);
                $("#J_mock_id").val(res.data.mockid);
                Toast.open("Mock成功！")
            }else{
                Toast.open(res.info)
            }
        })
        
    }

    function copyResult() {

        if ($("#J_result").val() == ""){
            Toast.open("暂未获取到mock结果");
            return
        }

        document.getElementById("J_result").select();
        try{
            document.execCommand('copy');
            Toast.open("复制成功！")
        }catch(e){
            Toast.open("按 Ctrl/Command + C 复制！")
        }
        
    }

    function editHistory() {
        var $parent = $(this).parents(".J_history_item");

        var value = $parent.data("json");
        var mockId = $parent.data("mockid");
        var protocol = $parent.data("protocol");
        var des = $parent.data("des");

        $("#J_mock_id").val(mockId);
        editor.setValue(JSON.parse(value));
        $(`.J_protocol[value=${protocol}]`).prop("checked", true);
        $("#J_description").val(des);

    }

    function removeHistory(){
        var $parent = $(this).parents(".J_history_item");

        var mockId = $parent.data("mockid");

        $.getJSON(REMOVE_HISTORY_URL, {mockId: mockId}, function(res){
            if(res.status == 1){
                Toast.open("删除成功！");
                $parent.remove();
            }else{
                Toast.open(res.info)
            }
        })
    }

})()