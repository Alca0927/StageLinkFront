import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// ❌ 모든 CSS import 제거 (v6 이상 자동 적용됨)

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    const title = prompt('일정 제목을 입력하세요:');
    if (title) {
      setEvents([...events, { title, start: arg.date, allDay: true }]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={events}
      dateClick={handleDateClick}
      editable={true}
      selectable={true}
    />
  );
};

export default CalendarView;
