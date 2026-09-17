# Security Specification & Test Payloads for KREASIKERTAS.STUDIO

## Data Invariants
1. User profile `/users/{userId}` can only be read and written by the authenticated user whose `request.auth.uid == userId`.
2. Saved prompts `/users/{userId}/savedPrompts/{promptId}` belong strictly to the owner (`userId == request.auth.uid`).
3. ID fields must be valid alphanumeric strings within safe length bounds (`isValidId()`).
4. Timestamps must be valid strings or server timestamps.
5. All operations require authentication (`isSignedIn()`).
6. No user can read or write another user's profile or saved prompts.

## The Dirty Dozen Test Payloads
1. Unauthenticated read attempt to `/users/user123` -> PERMISSION_DENIED
2. Unauthenticated write attempt to `/users/user123` -> PERMISSION_DENIED
3. User A trying to read `/users/userB` -> PERMISSION_DENIED
4. User A trying to write `/users/userB` -> PERMISSION_DENIED
5. User A trying to list `/users/userB/savedPrompts` -> PERMISSION_DENIED
6. User A trying to create prompt inside `/users/userB/savedPrompts/prompt1` -> PERMISSION_DENIED
7. User A creating prompt in own collection with malicious ID (`/users/userA/savedPrompts/../../../etc`) -> PERMISSION_DENIED
8. User A creating prompt with missing required fields -> PERMISSION_DENIED
9. User A writing oversized prompt text > 500KB (Denial of Wallet) -> PERMISSION_DENIED
10. Spoofed admin role injection on user document -> PERMISSION_DENIED
11. Arbitrary top-level collection write attempt -> PERMISSION_DENIED
12. Attempt to update immutable field `id` or `userId` -> PERMISSION_DENIED
