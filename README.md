# LitScheduleBuilder

## **Project Discription**
A simple custom-made web app that automates student shifts for IT technicians at LIT.

## **Application Requirements**
- Spread sheet GUI for easy reading.
- Manually assignment of shifts.
- A on or off toggle to enable/disable student preferences

## **Functional Requirements Check List**
- *General*
    - Languages: 
        - Front end: HTML CSS 
        - Back end: JS
    - Web application

- *functional checklist*
    - [ ] Basic spread sheet calandar functionality 
    - [ ] Recive and store input of student objects.
    - [ ] Recive and store input of possible shift schedule objects
    - [ ] Develope/Find algorithm to find all possible shift object for given student objects **(Priority!)**
    - TBD tasks:
        - [ ] Display inputed student objects
        - [ ] Display inputed shift objects

## **Example of Functionality**
If the user is putting in student names and then their availability for every day this week (ie: Dan, Mon 9:00-12:00, 14:30-16:00, Tues 8:30-11:30, 16:00-18:00,...)

The user then puts in the possible shifts for the week (Mon-Bergeron 8:30-10:30-12:30,..., WSC 8:30-12:00, 12:00-15:00,....)

The program should spit out a schedule.

If there are gaps, The user can re-run the program until the schedule is full.

User can further manually put shifts in in case of discrepancies, such as a student going over the maximum assigned number of hours.