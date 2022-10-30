DECLARE @tagName nvarchar(35) = '##tagName##';

WITH scores AS (
  SELECT SUM(score) score
  FROM Posts p
    INNER JOIN posttags pt ON pt.postid = COALESCE(p.parentid, p.id)
    INNER JOIN tags t ON t.id = pt.tagid
  WHERE 
    Tagname = @tagName
    AND owneruserid IS NOT NULL
    AND posttypeid IN (1,2) -- only questions and answers
    AND communityowneddate IS NULL
  GROUP BY owneruserid    
)

SELECT score, COUNT(*) AS amount
FROM scores
WHERE score > 0
GROUP BY score    
ORDER BY score DESC