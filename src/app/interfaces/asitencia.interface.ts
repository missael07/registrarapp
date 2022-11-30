export interface Attendance {
    name: string,
    date: Date,
    asignature: string
}

export interface AttendanceList {
    date: Date,
    attendees: string[]
}

export interface Attendee{
    name: string
}