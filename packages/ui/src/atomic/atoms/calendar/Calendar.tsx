import React, { useState } from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Wrapper } from './styled';

import esLocale from '@fullcalendar/core/locales/es';
import viLocate from '@fullcalendar/core/locales/vi';

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export const Calendar = ({ initData }: any) => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  console.log(currentEvents);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    console.log(selectInfo);
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,

        // display: 'background',
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
    // this.setState({
    //   currentEvents: events,
    // });
  };

  return (
    <Wrapper>
      <div className='demo-app'>
        {/*{this.renderSidebar()}*/}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locales={[esLocale, viLocate]}
            locale={viLocate}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // weekends={this.state.weekendsVisible}
            events={initData}
            initialEvents={initData} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /*/you can update a remote database when these fire:*/
            eventAdd={function (data) {
              console.dir(data.event);
            }}
            // titleFormat={'dddd, MMMM D, YYYY'}
            eventChange={function (data) {
              console.dir(data.event);
            }}
            eventRemove={function () {}}
          />
        </div>
      </div>
    </Wrapper>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}
