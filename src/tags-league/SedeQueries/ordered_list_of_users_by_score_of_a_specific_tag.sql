DECLARE @tagName nvarchar(35) = '##tagName##'

Select OwnerUserId as [User Link]
       , sum(score) score
       , count(*) [# posts]
       , sum(case posttypeid when 1 then score else 0 end) [question score]
       , sum(case posttypeid when 2 then score else 0 end) [answer score]
       , sum(case posttypeid when 1 then 1 else 0 end) [# questions]
       , sum(case posttypeid when 2 then 1 else 0 end) [# answers]
from Posts p
inner join posttags pt on pt.postid = coalesce(p.parentid, p.id)
inner join tags t on t.id = pt.tagid
WHERE 
    Tagname = @tagName
and owneruserid is not null
and posttypeid in (1,2) -- only questions and answers
and communityowneddate is null
group by owneruserid    
order by sum(score) desc