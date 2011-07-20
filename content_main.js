$(init);

function init(){
	inject_css();
	redefine_update_block();
	inject_preview_div();
	rebind_link_event();
}

function inject_preview_div(){
	var preview_div = $("<div>abc</div>");
	preview_div.attr("id", "preview_div");
	preview_div.hide();
	//preview_div.insertAfter($(".srr"));
	$("body").append(preview_div);
}

function rebind_link_event(){
	console.log("rebind link event");
	$(".srl a[href^='/!repaste/']").click(function(event){
		console.log($(this).attr("title"));
		preview_open($(this).attr("href"));
		event.preventDefault();
	});
}

function preview_open(url){
	enter_preview_mode();
}

function enter_preview_mode(){
	$("#main .m1").first().hide();
	$(".lite_home_content").addClass("main_stream_preview_mode");
	$(".srr").hide();
	$("#preview_div").show();
}

function leave_preview_mode(){
	$("#main .m1").first().show();
	$(".lite_home_content").removeClass("main_stream_preview_mode");
	$(".srr").show();
	$("#preview_div").hide();
}

function redefine_update_block(){
	console.log("redefine update block");
	$(".gw1").addClass("update_block");
	$(".gw1").hover(function(){
		$(this).addClass("block_focus");
	},function(){
		$(this).removeClass("block_focus");
	});
}

function inject_css(){
	console.log("inject css");
	$("head").append(content_css.getString());
}

