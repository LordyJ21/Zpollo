# TODO List for Google Calendar Integration

## Completed Tasks
- [x] Review project structure and existing OAuth setup
- [x] Plan Google Calendar integration for patient appointment notifications
- [x] Add googleapis dependency to backend/package.json
- [x] Update userModel.js to store Google access and refresh tokens
- [x] Modify passport.js to request calendar scope and store tokens
- [x] Create googleCalendar.js utility for calendar operations
- [x] Update bookAppointment in userController.js to create calendar events
- [x] Update cancelAppointment in userController.js to delete calendar events
- [x] Update appointmentCancel in doctorController.js to delete calendar events
- [x] Update appointmentComplete in doctorController.js to update calendar events
- [x] Handle token expiry and refresh

## Pending Tasks
- [ ] Test OAuth flow with calendar scope
- [ ] Test appointment booking/cancellation with calendar events
- [ ] Update README.md with Google Calendar feature
- [x] Fix date parsing issue in Google Calendar integration (slotDate format: day_month_year)
