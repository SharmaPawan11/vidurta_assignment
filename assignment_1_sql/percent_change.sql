
SELECT
  to_char(date_trunc('month', created_at), 'YYYY-MM-DD') AS date,
  COUNT(created_at) AS count,
  ROUND(CAST(100 * (COUNT(created_at) - LAG(COUNT(created_at)) OVER w)::float / (LAG(COUNT(created_at)) OVER w) AS numeric), 1) || '%' as percent_growth
FROM assignment
GROUP BY 1
WINDOW w AS (ORDER BY to_char(date_trunc('month', created_at), 'YYYY-MM-DD'));