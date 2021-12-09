# Event-Attendance-Tracker

My Mid-point Thesis project.

The documentation can be found in `documentation.pdf`. It is one week behind the development however and some features have been added after the document has been written.

Project is discontinued. You may fork and work on it.

---

# A sniplet from the documentation and the answer to why we did this


## Intoduction

Since the start of the pandemic, many companies have been forced to shut down their offices and migrate over to working from home. This sudden change have ledto an increased demand for remote work environments. And thanks to the increasein demand, online events like meetings, gatherings, classes, and similar cooperative activities have seen exponential growth in both number and magnitude over the courseof the pandemic.

Study in[1]shows that, while the availability of online events positively impact the performance of attendees, it also negatively impacts the attendance.

In both face-to-face events and online events, if the attendance system requires anaction from the instructor, then the event time will be disrupted each time the instructor allows a late attendee into the meeting[2]. The solution to this problem lies with the automation of the system.

There have been various research and proposed systems on the subject, but unfortunately most of these approaches could not provide an accurate and reliable way to validate attendance and keep track of it. We will examine two of these approaches in Chapter 2.

We would like to propose a new way of validating and keeping track of attendance using a code. This code will be generated with unique credentials of the attendee and the unique credentials of the event put through a hash function to create a one-time-use code.

Because the unique credentials in the system is used, each code will also be unique. This approach eliminates the problem of distinguishing between attendants per event and distinguishing between events per attendant.

There have been research on how we could increase the attendance. One such research is[3], and we have taken two of the bullet points from this paper.

-	The system should have sound and reasonable attendance policies withconsequences for absence,
-	Good attendance should be valued and rewarded

We have incorporated the first principle into the tracking system and the second principle into the filtering system.

