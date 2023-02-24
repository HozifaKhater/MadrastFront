const category = [
    {
        name: 'Danger',
        value: 'bg-danger'
    },
    {
        name: 'Success',
        value: 'bg-success'
    },
    {
        name: 'Primary',
        value: 'bg-primary'
    },
    {
        name: 'Info',
        value: 'bg-info'
    },
    {
        name: 'Dark',
        value: 'bg-dark'
    },
    {
        name: 'Warning',
        value: 'bg-warning'
    },
];

const calendarEvents = [{
    startEditable: true,
    id: 50,
    title: 'brrrrrrrrrrr',
    start: "2022-12-20",
    end: "2022-12-22",
    className: 'bg-warning text-white',
    allDay: true,
    durationEditable: true,
    editable: true,
}];

export { category, calendarEvents };
export class calendarEventsModel {
    id: string;
    title: string;
    start: string = "";
    end: string = "";
    className: string = "";
    editable: true;
    durationEditable: true;
}
