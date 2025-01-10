// Define thresholds and maximum values for normalization
const ukPercentageThreshold = 5; // 5% UK followers
const absoluteUKThreshold = 10000; // 10,000 UK followers
const maxWeightedEngagement = 50; // Arbitrary max for weighted engagement
const maxWeightedGrowth = 50; // Arbitrary max for weighted growth

// Define weights for each metric
const weights = {
    uk_percentage: 0.25,
    absolute_uk_followers: 0.25,
    engagement_rate: 0.25,
    growth_rate: 0.25 // Adjust this weight as needed
};

function calculateScore() {
    // Get input values
    const followerCount = parseFloat(document.getElementById("follower_count").value);
    const ukPercentage = parseFloat(document.getElementById("uk_percentage").value);
    const engagementRate = parseFloat(document.getElementById("engagement_rate").value);
    const growthRate = parseFloat(document.getElementById("growth_rate").value);

    // Simple validation
    if (isNaN(followerCount) || isNaN(ukPercentage) || isNaN(engagementRate) || isNaN(growthRate)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }

    // Calculate absolute UK followers
    const absoluteUKFollowers = (followerCount * ukPercentage) / 100;

    // Normalize UK percentage
    const ukPercentageScore = Math.min(ukPercentage / ukPercentageThreshold, 1);

    // Normalize absolute UK followers
    const absoluteUKScore = Math.min(absoluteUKFollowers / absoluteUKThreshold, 1);

    // Weight engagement by platform size
    const weightedEngagementRate = engagementRate * Math.log10(followerCount);
    const engagementScore = Math.min(weightedEngagementRate / maxWeightedEngagement, 1);

    // Weight growth rate by platform size
    const weightedGrowthRate = growthRate * Math.log10(followerCount);
    const growthScore = Math.min(weightedGrowthRate / maxWeightedGrowth, 1);

    // Calculate total score
    const normalizedScore = (
        weights.uk_percentage * ukPercentageScore +
        weights.absolute_uk_followers * absoluteUKScore +
        weights.engagement_rate * engagementScore +
        weights.growth_rate * growthScore
    );

    // Scale to 0–10
    const finalScore = (normalizedScore * 10).toFixed(1);

    // Add explanatory text
    let ratingDescription;
    if (finalScore >= 8) {
        ratingDescription = "Highly Impressive";
    } else if (finalScore >= 5) {
        ratingDescription = "Moderate Potential";
    } else {
        ratingDescription = "Needs Improvement";
    }

    // Display the results
    document.getElementById("result").innerHTML = `
        <p><strong>Calculated Score:</strong> ${finalScore} / 10</p>
        <p><strong>Rating:</strong> ${ratingDescription}</p>
        <p><strong>Absolute UK Followers:</strong> ${Math.round(absoluteUKFollowers)}</p>
    `;
}
