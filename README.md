# EMPLOYEES MANAGEMENT SYSTEM API

[Postman Collection URL for Testing, download as JSON (click here...)](https://drive.google.com/file/d/1BTQ5V619FJF_M4fU8bjQjRNUf6loPkjP/view?usp=sharing)



## API Routes

### Auth

All endpoints under `/v1/auth` do **not** require authentication except where noted.

| Method | Endpoint                | Description                | Body/Query Params |
|--------|-------------------------|----------------------------|-------------------|
| POST   | /v1/auth/register      | Register a new user        | email, password, firstName, lastName |
| POST   | /v1/auth/login         | Login                      | email, password   |
| GET    | /v1/auth/regenerate-tokens | Regenerate tokens     | Header: refresh-token |
| GET    | /v1/auth/logout        | Logout                     | Header: access-token |
| POST   | /v1/auth/activate      | Activate user account      | Header: activate-token, password |

### Admin

All endpoints under `/v1/admin` require `access-token` header and admin privileges.

| Method | Endpoint                | Description                        | Body/Query Params |
|--------|-------------------------|------------------------------------|-------------------|
| GET    | /v1/admin/list-users   | List all users                     |                   |
| GET    | /v1/admin/list-organizations | List all organizations      |                   |
| DELETE | /v1/admin/user-delete  | Delete a user                      | Query: _id        |
| POST   | /v1/admin/user-invite  | Invite a user                      | email, firstName, lastName, role |

### Organization

All endpoints under `/v1/organization` require `access-token` header and manager privileges unless otherwise noted.

| Method | Endpoint                    | Description                      | Body/Query Params |
|--------|-----------------------------|----------------------------------|-------------------|
| POST   | /v1/organization/create    | Create an organization           | name, description |
| POST   | /v1/organization/update    | Update organization info         | name, description |
| GET    | /v1/organization/about     | Get organization info            |                   |
| POST   | /v1/organization/add-employee | Add employee to organization | email, firstName, lastName |
| GET    | /v1/organization/list-employees | List employees              |                   |
| POST   | /v1/organization/delete-employee | Remove employee             | Query: _id, Header: organization-id |

### Project

All endpoints under `/v1/project` require `access-token` and `organization-id` headers. Manager privileges required for create, update, delete.

| Method | Endpoint                | Description                | Body/Query Params |
|--------|-------------------------|----------------------------|-------------------|
| POST   | /v1/project/create     | Create a project           | name, description |
| GET    | /v1/project/list       | List all projects          |                   |
| POST   | /v1/project/update     | Update a project           | Query: _id, name, description |
| POST   | /v1/project/delete     | Delete a project           | Query: _id        |
| GET    | /v1/project/           | Get project by ID          | Query: _id        |

### Job Event

All endpoints under `/v1/job-event` require `access-token` and `organization-id` headers. Manager privileges required for create, update, delete. Users can list and view.

| Method | Endpoint                | Description                | Body/Query Params |
|--------|-------------------------|----------------------------|-------------------|
| POST   | /v1/job-event/add      | Create a job event         | title, project, (optional: description, employees, start, end, status) |
| GET    | /v1/job-event/list     | List all job events        |                   |
| POST   | /v1/job-event/update   | Update a job event         | Query: _id, any job event field |
| POST   | /v1/job-event/delete   | Delete a job event         | Query: _id        |
| GET    | /v1/job-event/         | Get job event by ID        | Query: _id        |

---

**Headers:**

- `access-token`: Required for all authenticated endpoints
- `organization-id`: Required for organization, project, and job-event endpoints
- `refresh-token`: Required for token regeneration
- `activate-token`: Required for account activation

**General Notes:**

- All endpoints return JSON responses.
- Validation errors return 400 with details.
- Auth errors return 401/403.
