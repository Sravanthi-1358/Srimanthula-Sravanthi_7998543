-- =====================================================
-- EVENT MANAGEMENT SQL PROJECT - 25 EXERCISES
-- =====================================================

-- 1. User Upcoming Events
SELECT u.user_id, u.full_name, e.title, e.start_date
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events e ON r.event_id = e.event_id
WHERE e.status = 'upcoming'
ORDER BY e.start_date;


-- 2. Top Rated Events
SELECT e.event_id, e.title, AVG(f.rating) AS avg_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(f.feedback_id) >= 1
ORDER BY avg_rating DESC;


-- 3. Inactive Users (last 90 days)
SELECT *
FROM Users
WHERE user_id NOT IN (
    SELECT DISTINCT user_id FROM Registrations
    WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
);


-- 4. Peak Session Hours (10 AM - 12 PM)
SELECT event_id, COUNT(*) AS sessions_count
FROM Sessions
WHERE HOUR(start_time) BETWEEN 10 AND 11
GROUP BY event_id;


-- 5. Most Active Cities
SELECT u.city, COUNT(DISTINCT r.user_id) AS total_users
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_users DESC
LIMIT 5;


-- 6. Event Resource Summary
SELECT e.event_id, e.title, COUNT(r.resource_id) AS total_resources
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title;


-- 7. Low Feedback Alerts
SELECT u.full_name, f.comments, e.title
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3;


-- 8. Sessions per Upcoming Event
SELECT e.event_id, e.title, COUNT(s.session_id) AS total_sessions
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title;


-- 9. Organizer Event Summary
SELECT u.user_id, u.full_name,
       COUNT(e.event_id) AS total_events,
       SUM(CASE WHEN e.status='upcoming' THEN 1 ELSE 0 END) AS upcoming,
       SUM(CASE WHEN e.status='completed' THEN 1 ELSE 0 END) AS completed,
       SUM(CASE WHEN e.status='cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM Users u
LEFT JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, u.full_name;


-- 10. Feedback Gap
SELECT e.event_id, e.title
FROM Events e
WHERE EXISTS (SELECT 1 FROM Registrations r WHERE r.event_id = e.event_id)
AND NOT EXISTS (SELECT 1 FROM Feedback f WHERE f.event_id = e.event_id);


-- 11. Daily New User Count
SELECT registration_date, COUNT(*) AS total_users
FROM Users
GROUP BY registration_date;


-- 12. Event with Maximum Sessions
SELECT event_id, COUNT(*) AS total_sessions
FROM Sessions
GROUP BY event_id
HAVING COUNT(*) = (
    SELECT MAX(cnt)
    FROM (
        SELECT COUNT(*) AS cnt
        FROM Sessions
        GROUP BY event_id
    ) t
);


-- 13. Average Rating per City
SELECT e.city, AVG(f.rating) AS avg_rating
FROM Feedback f
JOIN Events e ON f.event_id = e.event_id
GROUP BY e.city;


-- 14. Most Registered Events
SELECT e.event_id, e.title, COUNT(r.user_id) AS total_registrations
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC
LIMIT 3;


-- 15. Event Session Time Conflict
SELECT s1.event_id, s1.session_id, s2.session_id
FROM Sessions s1
JOIN Sessions s2
ON s1.event_id = s2.event_id
AND s1.session_id < s2.session_id
WHERE s1.start_time < s2.end_time
AND s1.end_time > s2.start_time;


-- 16. Unregistered Active Users (last 30 days)
SELECT *
FROM Users u
WHERE u.registration_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
AND NOT EXISTS (
    SELECT 1 FROM Registrations r WHERE r.user_id = u.user_id
);


-- 17. Multi-Session Speakers
SELECT speaker_name, COUNT(*) AS total_sessions
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1;


-- 18. Resource Availability Check
SELECT e.event_id, e.title
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;


-- 19. Completed Events with Feedback Summary
SELECT e.event_id, e.title,
       COUNT(DISTINCT r.user_id) AS total_registrations,
       AVG(f.rating) AS avg_rating
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title;


-- 20. User Engagement Index
SELECT u.user_id, u.full_name,
       COUNT(DISTINCT r.event_id) AS events_attended,
       COUNT(f.feedback_id) AS feedback_submitted
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name;


-- 21. Top Feedback Providers
SELECT u.user_id, u.full_name,
       COUNT(f.feedback_id) AS total_feedback
FROM Users u
JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY total_feedback DESC
LIMIT 5;


-- 22. Duplicate Registrations Check
SELECT user_id, event_id, COUNT(*) AS cnt
FROM Registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;


-- 23. Registration Trends
SELECT DATE_FORMAT(registration_date, '%Y-%m') AS month,
       COUNT(*) AS total_registrations
FROM Registrations
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY month;


-- 24. Average Session Duration per Event
SELECT event_id,
       AVG(TIMESTAMPDIFF(MINUTE, start_time, end_time)) AS avg_duration
FROM Sessions
GROUP BY event_id;


-- 25. Events Without Sessions
SELECT e.event_id, e.title
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL;