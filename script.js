// Define thresholds and maximum values for normalization
const ukPercentageThreshold = 5; // 5% UK followers
const absoluteUKThreshold = 10000; // 10,000 UK followers
const maxWeightedEngagement = 50; // Arbitrary max for weighted engagement
const maxWeightedGrowth = 50; // Arbitrary max for weighted growth

// Define weights for each metric
const weights = {
    uk_percentage: 0.25,
    absolute_uk_followers: 0.25,
    engagement_rate: 0.2,
    follower_count: 0.2,
    growth_rate: 0.1 // Adjust this weight as needed
};

function calculateScore() {
    // Get input values
    const followerCount = parseFloat(document.getElementById("follower_count").value);
    const ukPercentage = parseFloat(document.getElementById("uk_percentage").value);
    const engagementRate = parseFloat
