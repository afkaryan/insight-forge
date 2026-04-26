import JobApplication from '../models/JobApplication.js';

export const getAnalyticsService = async (userId) => {
  const defaultStats = {
    saved: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
  };

  const stats = await JobApplication.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  stats.forEach(stat => {
    defaultStats[stat._id] = stat.count;
  });

  const totalApplications = await JobApplication.countDocuments({ 
    user: userId, 
    status: { $ne: 'saved' } 
  });

  // 1. Applications Per Week (Last 4 weeks)
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  
  const weeklyApps = await JobApplication.aggregate([
    { 
      $match: { 
        user: userId, 
        status: { $ne: 'saved' },
        appliedDate: { $exists: true, $ne: null, $type: 'date' },
        appliedDate: { $gte: fourWeeksAgo } 
      } 
    },
    {
      $group: {
        _id: {
          year: { $year: "$appliedDate" },
          week: { $week: "$appliedDate" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.week": 1 } }
  ]);

  // Format weekly apps for easier frontend charting
  const formattedWeeklyApps = weeklyApps.map(item => ({
    week: `Week ${item._id.week}, ${item._id.year}`,
    applications: item.count
  }));

  // 2. Average Match Score for Applied Jobs
  const averageScoreResult = await JobApplication.aggregate([
    { 
      $match: { 
        user: userId, 
        status: { $in: ['applied', 'interviewing', 'offer', 'rejected'] },
        matchScore: { $exists: true, $ne: null }
      } 
    },
    {
      $group: {
        _id: null,
        averageScore: { $avg: "$matchScore" }
      }
    }
  ]);
  
  const averageMatchScore = averageScoreResult.length > 0 ? Math.round(averageScoreResult[0].averageScore) : 0;

  // 3. Interview Statistics
  const interviewStats = {
    totalInterviews: defaultStats['interviewing'] + defaultStats['offer'] + defaultStats['rejected'],
    activeInterviews: defaultStats['interviewing'],
    conversionRate: 0
  };
  
  if (totalApplications > 0) {
     const reachedInterviewCount = defaultStats['interviewing'] + defaultStats['offer'];
     interviewStats.conversionRate = Math.round((reachedInterviewCount / totalApplications) * 100);
  }

  return {
    statusCounts: defaultStats,
    totalApplications,
    applicationsPerWeek: formattedWeeklyApps,
    averageMatchScore,
    interviewStats
  };
};
