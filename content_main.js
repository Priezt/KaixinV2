var incremented_job_id = 0;
$(init);

function init(){
	inject_css();
	redefine_update_block();
	inject_preview_div();
	rebind_link_event();
	tick();
}

function tick(){
	check_new_update_block();
	window.setTimeout("tick()", 5000);
}

function check_new_update_block(){
	var new_update_blocks = $(".gw1").not(".update_block");
	if(new_update_blocks.size() > 0){
		console.log("new update blocks found: " + new_update_blocks.size());
		new_update_blocks.addClass("update_block");
		new_update_blocks.hover(function(){
			$(this).addClass("block_focus");
		},function(){
			$(this).removeClass("block_focus");
		});
		new_update_blocks.find("a[href*='/repaste/']").click(function(event){
			console.log($(this).attr("title"));
			preview_open($(this).attr("href"), $(this).attr("title"));
			event.preventDefault();
		});
		new_update_blocks.find("a[href^='/repaste/']").click(function(event){
			console.log($(this).attr("title"));
			preview_open($(this).attr("href"), $(this).attr("title"));
			event.preventDefault();
		});
		new_update_blocks.find("a[href^='/!repaste/']").click(function(event){
			console.log($(this).attr("title"));
			preview_open($(this).attr("href"), $(this).attr("title"));
			event.preventDefault();
		});
	}else{
		console.log("no new update blocks found");
	}
}

function inject_preview_div(){
	var preview_div = $("<div></div>");
	preview_div.attr("id", "preview_div");
	preview_div.hide();
	preview_div.insertAfter($(".srr"));
	//$("body").append(preview_div);
}

function rebind_link_event(){
	console.log("rebind link event");
	$(".srl a[href*='/repaste/']").click(function(event){
		console.log($(this).attr("title"));
		preview_open($(this).attr("href"), $(this).attr("title"));
		event.preventDefault();
	});
	$(".srl a[href^='/repaste/']").click(function(event){
		console.log($(this).attr("title"));
		preview_open($(this).attr("href"), $(this).attr("title"));
		event.preventDefault();
	});
	$(".srl a[href^='/!repaste/']").click(function(event){
		console.log($(this).attr("title"));
		preview_open($(this).attr("href"), $(this).attr("title"));
		event.preventDefault();
	});
}

function _close_button_div(title_link){
	var close_button_div = $("<div></div>");
	close_button_div.addClass("close_button_div");
	var close_button = $("<div>Close</div>");
	close_button.addClass("close_button");
	close_button.click(leave_preview_mode);
	close_button_div.append(close_button);
	close_button_div.append(title_link);
	return close_button_div;
}

function _title_link(url, title){
	var result = $("<a>"+title+"</a>");
	result.attr("href", "http://www.kaixin001.com" + url);
	result.attr("target", "_blank");
	result.click(leave_preview_mode);
	return result;
}

function _loading(){
	var loading_div = $("<center><progress></progress></center>");
	return loading_div;
}

function _preview_content_div(){
	var content_div = $("<div></div>");
	content_div.addClass("content_div");
	content_div.css("height", window.innerHeight - 150);
	content_div.append(_loading());
	return content_div;
}

function preview_open(url, title){
	$("#preview_div").empty();
	$("#preview_div").append(_close_button_div(_title_link(url, title)));
	$("#preview_div").append($("<br>"));
	$("#preview_div").append(_preview_content_div());
	incremented_job_id++;
	$.get("http://www.kaixin001.com" + url, get_ajax_call_back(incremented_job_id));
	enter_preview_mode();
}

function get_ajax_call_back(iid){
	var cb = function(data){
		var jid = iid;
		console.log("got ajax result");
		if(incremented_job_id > jid){
			console.log("old job found, skip");
			return;
		}
		var html = fetch_html(data);
		cache_hidden_html(html);
		html = jsearch("#repasteCon").html();
		var dv = $("<div></div>");
		dv.html(html);
		dv.css("zoom", "0.8");
		$(".content_div").empty();
		$(".content_div").append(dv);
	};
	return cb;
}

function enter_preview_mode(){
	console.log("enter preview mode");
	$("#main .m1").first().hide();
	$("div#maincontent").css('float', 'left');
	$(".lite_home_content").addClass("main_stream_preview_mode");
	$(".srr").hide();
	var offset = $(".srl").offset();
	$("#preview_div").css("left", offset.left + 570);
	$("#preview_div").css("top", 30);
	$("#preview_div").css("height", window.innerHeight - 90);
	$("#preview_div").show();
}

function leave_preview_mode(){
	console.log("leave preview mode");
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

