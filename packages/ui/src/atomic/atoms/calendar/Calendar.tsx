import { DateSelectArg, EventApi, formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import { Wrapper } from './styled';

import { css } from '@emotion/css';
import esLocale from '@fullcalendar/core/locales/es';
import viLocate from '@fullcalendar/core/locales/vi';
import { COLOR } from '@org/utils';
interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export const Calendar = ({
  initData,
  renderEventContent,
  handleEventClick,
  moreLinkContent,
  eventChange,
  createEvent,
}: any) => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  // const [isCreate, setIsCreate] = useState<EventApi[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    console.log(selectInfo);
    calendarApi.unselect(); // clear date selection

    // createEvent({
    //   start: selectInfo.startStr,
    //   end: selectInfo.endStr,
    // });
    createEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
  };

  // const handleEventClick = (clickInfo: EventClickArg) => {
  //   handleEventClick()
  //   // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //   //   clickInfo.event.remove();
  //   // }
  // };

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
            timeZone={'Asia/Ho_Chi_Minh'}
            locales={[esLocale, viLocate]}
            locale={viLocate}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // weekends={this.state.weekendsVisible}
            events={initData}
            // initialEvents={initData} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            // moreLinkContent={moreLinkContent}
            moreLinkClassNames={css`
              border: 1px solid ${COLOR.Secondary};
              &:hover {
                background-color: ${COLOR.Secondary};
                color: ${COLOR.Primary};
              }
            `}
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /*/you can update a remote database when these fire:*/
            eventAdd={function (data) {
              console.dir(data.event);
              // eventAdd(data.event)
            }}
            // titleFormat={'dddd, MMMM D, YYYY'}
            eventChange={function (data) {
              console.log('🚀 ~ file: Calendar.tsx:110 ~ data:', data);
              eventChange(data.event);
            }}
            eventRemove={function () {}}
            eventMouseEnter={function (data) {
              // console.dir(data.event);
            }}
            dayCellClassNames={css`
              //height: 200px;
            `}
            eventMinHeight={200}
            // height={900}
            // dayCellContent={(data) => {
            //   // console.dir(data);
            // }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}
