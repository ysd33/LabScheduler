
import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('turbolinks:load', function(){
	var calendarEl = document.getElementById('calendar');

	// 現在の日付取得
	var now = new Date();
	
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

		//--------------------
		//	イベント
		//--------------------
		events: [
		],

		// 予定のない時間クリック
		dateClick: function(info) {
			// alert('Clicked on: ' + info.dateStr);
			// console.log(info.view);
			console.log(info);
		},

		// イベントクリック
		eventClick: function(info) {
			console.log(info);
		}
	});

	calendar.render();
});
