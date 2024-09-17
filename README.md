1 - Fix for getCatsInfo API

Issue:

	•	Unhandled exception in refreshToken due to incorrect property access (data.value.key instead of data.key).

Fix:

	•	Changed data.value.key to data.key in workers/getcatsworker.js.
	•	Added error handling with try-catch blocks.

Files Changed:

	•	workers/getcatsworker.js

2 - Add correlationId Header

Implementation:

	•	Created middleware to handle correlationId.
	•	Modified response headers to include correlationId.
	•	Passed correlationId to worker threads.

Files Changed:

	•	index.js
	•	utils/correlationIdMiddleware.js
	•	utils/generateNewWorker.js

3 - Terminate Idle Workers

Implementation:

	•	Added idle timeout in workers.
	•	Workers terminate after 15 minutes of inactivity.
	•	Main server recreates workers when needed.
	•	Added logging for worker termination and creation.