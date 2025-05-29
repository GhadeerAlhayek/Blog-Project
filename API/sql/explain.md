1. users

Purpose: Stores user account information.
Key Fields:

    username, email: Unique identifiers.

    password_hash: Secured password storage.

    role: Either regular user or admin.

    created_at, updated_at: Track account creation and updates.

2. user_providers

Purpose: Links a user to third-party auth providers (e.g., Google, GitHub).
Key Fields:

    provider_name, provider_user_id: Identify which external provider and user account.

    Foreign key to users: Links each provider account to a local user.

3. categories

Purpose: Organizes stories into labeled groups.
Key Fields:

    label, slug: Human-readable and URL-friendly identifiers.

4. stories

Purpose: Holds main content written by users (e.g., blog posts or articles).
Key Fields:

    title, slug, content: Main story info.

    status: Draft or published.

    author_id: Links to the author (users).

    category_id: Organizes the story.

    deleted_at: Soft delete support.

5. images

Purpose: Associates images with stories.
Key Fields:

    url: Image file location.

    alt_text: Description for accessibility.

    Linked to stories.

6. comments

Purpose: User-generated comments on stories.
Key Fields:

    message: Text of the comment.

    status: Moderation status.

    parent_id: Enables threaded/nested comments.

    Linked to both users and stories.

7. post_likes

Purpose: Tracks which users liked which stories.
Composite Key: user_id + story_id ensures a user can only like a story once.
8. comment_likes

Purpose: Tracks which users liked which comments.
Composite Key: user_id + comment_id.
9. notifications

Purpose: Sends alerts or updates to users (e.g., “Someone liked your comment”).
Key Fields:

    type, reference_id: Define what the notification is about.

    is_read: Whether the user saw the notification.

10. visitors

Purpose: Tracks anonymous or non-logged-in users visiting the platform.
Key Fields:

    ip_address, browser, device: Visitor details.

    Can be linked to signups or story views.

11. story_views

Purpose: Logs when a visitor views a story.
Key Fields:

    visitor_id, story_id: Links the action to a person and story.

12. signups

Purpose: Manages email-based signups and invitations.
Key Fields:

    email, token, expires_at: For email verification or invites.

    is_used: Whether the signup link has been used.

    Can link to a user or visitor.