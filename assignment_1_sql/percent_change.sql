SELECT
  (cast(date_trunc('month', created_at) AS date)) as date,
  COUNT(created_at)::int AS count,
  ROUND(CAST(100 * (COUNT(created_at) - LAG(COUNT(created_at)) OVER w)::float / (LAG(COUNT(created_at)) OVER w) AS numeric), 1) || '%' as percent_growth
FROM assignment
GROUP BY 1
WINDOW w AS (ORDER BY (cast(date_trunc('month', created_at) AS date)));