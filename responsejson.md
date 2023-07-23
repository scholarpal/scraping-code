# Model 

### SchoolComments
Get 1 School by Slug

- id : 12
- slug : string
- photo : urlString
- photos[] : array of string
- name : string
- location : string
- latitude : int
- longtitude : int
- ratings : Object
  - faciliy : int
  - teacher : int
  - organization : int
  - curiculum : int 
- Comments : Array of Object
  - created_at : date
  - rating : int
  - category : string (facility/teacher/organization/curiculum)
  - comment : string
  - user 

### Users
- id
- username
- email 
- phone_number 
- otp_code 
- verify_status
- school 
- avatar 

### Events
- 