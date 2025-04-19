## API Documentation

This README provides a straightforward, example-driven guide to the Expense-Sharing App API. All routes are prefixed with `/api` and require JSON input/output. Use `Content-Type: application/json` and include cookies for authenticated routes.

---

### Common Setup
- **Base URL:** 
    Localhost: `http://localhost:5001/api`
    Render: `https://behance-builders-lrx5.onrender.com/api`
- **Headers:**
  - `Content-Type: application/json`
  - Send cookies (`credentials: 'include'`) for protected routes.

---

### Authentication Routes

**1. POST `/login`**
- **Purpose:** Sign in with email and password.
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": { "uid": "abc123", "email": "user@example.com" }
  }
  ```

**2. POST `/signup`**
- **Purpose:** Register a new user.
- **Body:**
  ```json
  {
    "email": "newuser@example.com",
    "password": "newPassword",
    "username": "uniqueName"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "user": { "uid": "xyz789", "email": "newuser@example.com" }
  }
  ```

**3. POST `/forgot-password`**
- **Purpose:** Send password reset email.
- **Body:**
  ```json
  { "email": "user@example.com" }
  ```
- **Success Response (200):** `{ "success": true, "message": "Password reset email sent" }`

**4. POST `/logout`**
- **Purpose:** Clear the session cookie.
- **Body:** _None_
- **Success Response (200):** `{ "success": true, "message": "Logged out" }`

---

### User Routes

**GET `/me`**
- **Purpose:** Retrieve the logged-in user’s profile.
- **Auth:** Requires session cookie.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": {
      "uid": "abc123",
      "email": "user@example.com",
      "username": "uniqueName",
      "createdAt": "2025-04-15T12:00:00Z"
    }
  }
  ```

**POST `/groups/:groupId/invite`**
- **Purpose:** Invite another user to a group by email.
- **Auth:** Requires session cookie.
- **Parameters:**
  - `:groupId` in URL path.
- **Body:**
  ```json
  { "email": "invitee@example.com" }
  ```
- **Success Response (200):** `{ "success": true, "message": "User invited" }`

---

### Group Routes

**POST `/create-group`**
- **Purpose:** Create a new group.
- **Auth:** Requires session cookie.
- **Body:**
  ```json
  {
    "title": "Trip to Lagos",
    "description": "Summer vacation"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "groupId": "group123",
    "group": { /* group data */ }
  }
  ```

**GET `/groups`**
- **Purpose:** List all groups the user belongs to.
- **Auth:** Requires session cookie.
- **Success Response (200):**
  ```json
  {
    "success": true,
    "groups": [ /* array of group objects */ ]
  }
  ```

**DELETE `/groups/:groupId`**
- **Purpose:** Delete a group (only the owner can delete).
- **Auth:** Requires session cookie.
- **Parameters:** `:groupId` in URL path.
- **Success Response (200):** `{ "success": true, "message": "Group deleted successfully" }`

---

### Expense Routes

**POST `/:groupId/create-expense`**
- **Purpose:** Add an expense to a group.
- **Auth:** Requires session cookie.
- **Parameters:** `:groupId` in URL path.
- **Body:**
  ```json
  {
    "description": "Lunch at cafe",
    "amount": 2500
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "expenseId": "exp456",
    "expense": { /* expense data */ }
  }
  ```

**DELETE `/expenses/:expenseId`**
- **Purpose:** Remove an expense by its ID.
- **Auth:** Requires session cookie.
- **Parameters:** `:expenseId` in URL path.
- **Success Response (200):** `{ "success": true, "message": "Expense deleted" }`

---

## Handling Errors
- **400 Bad Request:** Malformed input or validation failure.
- **401 Unauthorized:** Missing or invalid authentication.
- **403 Forbidden:** Authenticated but not allowed (e.g., deleting another user’s group).
- **404 Not Found:** Resource doesn’t exist.
- **500 Internal Server Error:** Unexpected server failure.

---

## Tips for Frontend Integration
1. Use `fetch` or `axios` with `credentials: 'include'` to send cookies.
2. Always set `Content-Type: application/json`.
3. Check response JSON for `success` flags and messages to guide UI flows.
4. Handle errors by displaying `message` from the response.