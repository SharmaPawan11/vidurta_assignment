INSERT INTO assignment SELECT * from generate_series('2016-02-01T00:00:00','2016-02-01T02:54:00', INTERVAL '1 minute');
INSERT INTO assignment SELECT * from generate_series('2016-03-01T00:00:00','2016-03-01T05:37:00', INTERVAL '1 minute');
INSERT INTO assignment SELECT * from generate_series('2016-04-01T00:00:00','2016-04-01T05:44:00', INTERVAL '1 minute');
INSERT INTO assignment SELECT * from generate_series('2016-05-01T00:00:00','2016-05-01T04:54:00', INTERVAL '1 minute');
INSERT INTO assignment SELECT * from generate_series('2016-06-01T00:00:00','2016-06-01T05:29:00', INTERVAL '1 minute');