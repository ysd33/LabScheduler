
import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('turbolinks:load', function(){
	var calendarEl = document.getElementById('calendar');

	var calendar = new Calendar(calendarEl, {
		// plugins: [ dayGridPlugin, interactionPlugin ]
		plugins: [ timeGridPlugin, interactionPlugin ]
	});

	calendar.render();
});
