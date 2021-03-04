
$(function() {
	dateForm = document.getElementById("event-date");
	starttimeForm = document.getElementById("event-starttime");
	endtimeForm = document.getElementById("event-endtime");

	// 入力フォーム変更検知
	dateForm.onchange = function() {
		document.getElementById("date-content").innerHTML = dateForm.value;
	}

	starttimeForm.onchange = function() {
		document.getElementById("starttime-content").innerHTML = starttimeForm.value;
	}

	endtimeForm.onchange = function() {
		document.getElementById("endtime-content").innerHTML = endtimeForm.value;
	}


	//--------------------
	// モーダル表示制御
	//--------------------
	var modalMain = $('.myModalMain');
	var closeBtn = $('.close')

	var modalHeight = document.getElementById("createeventModal").clientHeight;
	modalMain.css(
		'bottom', -(modalHeight)
	); 

	// var rowHeight = parseInt($(".eventContent").css('height'))/2;
	// $(".eventContent").css(
	// 	'font-size', rowHeight
	// );

	// アニメーション設定
	closeBtn.on('click', function(e){
		// modalBG.fadeOut();
		modalMain.removeClass("_slideUp");
		modalMain.addClass("_slideDown");
	});


	// 初期クラス設定
	// modalMain.addClass("_slideDown");
});

