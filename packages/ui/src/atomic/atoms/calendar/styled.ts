import styled from '@emotion/styled';

export const Wrapper = styled.div`
  b {
    /* used for event dates/times */
    margin-right: 3px;
  }

  .demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

  .demo-app-sidebar {
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
  }

  .demo-app-sidebar-section {
    padding: 2em;
  }

  .demo-app-main {
    flex-grow: 1;
    padding: 2rem 0;
  }

  .fc {
    /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
  }
  .fc-daygrid-event-harness {
    i {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 160px;
      //height: 1.2em;
      white-space: nowrap;
    }
  }
`;
