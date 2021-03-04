

import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



document.addEventListener('DOMContentLoaded', function(){

	// 現在の日付取得
	var now = new Date();
	
	// イベント取得関数
	function getEvents(res) {
		var events = [];

		var eventsJson = res.events;
		var usersJson = res.users;

		// ユーザー配列作成
		var usersArray = Array();
		for (var usr in usersJson) {
			var usrID = usersJson[usr]['id']
			var usrName = usersJson[usr]['name']
			var usrEmail = usersJson[usr]['email']

			// usersArray[usrID-1] = usrName+'['+usrEmail+']'
			usersArray[usrID-1] = {
				'Name': usrName,
				'Email': usrEmail
			}
		}


		for (var eve in eventsJson) {
			var currentEvent = eventsJson[eve];

			// 値分割
			var cur_date = currentEvent['date']
			var cur_start = currentEvent['start'].substring(10,16)
			var cur_end = currentEvent['end'].substring(10,16)
			var cur_allDay = currentEvent['allday']
			var cur_user = currentEvent['userid']

			// 値成形
			var title = usersArray[cur_user-1]['Name'];
			var start = cur_date + cur_start;
			var end = cur_date + cur_end;
			var allDay = Boolean(cur_allDay);
			var extendProps = {
				'email': usersArray[cur_user-1]['Email']
			};

			events.push({
				'title': title,
				'start': start,
				'end': end,
				'allDay': allDay,
				'extendProps': extendProps
			})

		}

		return events;
	};

	// モーダルスイッチ
	function ShowModal(modalElement) {
		modalElement.removeClass("_slideDown");
		modalElement.addClass("_slideUp");
	};

	function CloseModal(modalElement) {
		modalElement.removeClass("_slideUp");
		modalElement.addClass("_slideDown");
	};
	
	// fullcalendar本体
	var calendarEl = document.getElementById('calendar');
	var calendar = new Calendar(calendarEl, {
		// プラグイン
		plugins: [ timeGridPlugin, interactionPlugin ],

		// 日本語表示
		locale: 'ja',

		// スクロールなし
		contentHeight: 'auto',

		// ヘッダー表示	
		headerToolbar: {
			left: 'today prev,next',
			center: '',
			right: ''
		},

		// 規定ボタン表示内容
		buttonText: {
			prev: '前週',
			next: '翌週',
			today: '今週'
		},


		//--------------------
		//	カレンダー内表示
		//--------------------
		// 終日情報表示
		allDaySlot: false,

		// 表示開始時刻と終了時刻
		slotMinTime: "07:00:00",
		slotMaxTime: "22:00:00",

		// 今日を一番左に表示
		firstDay: now.getDay(),

		selectable: false,

		//--------------------
		//	予定一覧
		//--------------------
		events: function(info, successCallback, failureCallback){
			$.ajax({
				type: 'GET',
				url: '/darkroom.json',
			}).done(function(res){
				successCallback(getEvents(res));
			})
		},

		//--------------------
		//	クリックイベント
		//--------------------
		//	予定なし
		dateClick: function(info) {
			var date = info.date;
			const year		= date.getFullYear();
			const month		= date.getMonth() + 1;
			const day		= date.getDate();
			const hour		= date.getHours();
			const minute	= date.getMinutes();

			var eventDate = year + '-' + ('00'+month).slice(-2) + '-' + ('00'+day).slice(-2);
			var startTime = ('00'+hour).slice(-2) + ':' + ('00'+minute).slice(-2);
			var endTime = ('00'+(hour+1)).slice(-2) + ':' + ('00'+minute).slice(-2);

			$.ajax({
				type: 'GET',
				url: '/darkroom/new',
			}).done(function(res){
				// formに反映
				document.getElementById("event-date").value = eventDate;
				document.getElementById("event-starttime").value = startTime;
				document.getElementById("event-endtime").value = endTime;
				document.getElementById("event-date").onchange();
				document.getElementById("event-starttime").onchange();
				document.getElementById("event-endtime").onchange();

				// createeventModal出現
				ShowModal($("#createeventModal"));
				// showeventModal消す
				CloseModal($("#showeventModal"));
			})
		},

		//	予定あり
		eventClick: function(info) {
			var eventData = info.event;

			var userName = eventData.title;
			var date = eventData.startStr.substring(0,10)
			var startTime = eventData.startStr.substring(11,16)
			var endTime = eventData.endStr.substring(11,16)

			// showeventModal出現
			ShowModal($("#showeventModal"));
			// createeventModal消す
			CloseModal($("#createeventModal"));
		}
	});

	calendar.render();
});

