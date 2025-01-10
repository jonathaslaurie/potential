// Define thresholds and maximum values for normalization
const ukPercentageThreshold = 5; // 5% UK followers
const absoluteUKThreshold = 10000; // 10,000 UK followers
const maxWeightedEngagement = 50; // Arbitrary max for weighted engagement
const maxWeightedGrowth = 50; // Arbitrary max for weighted growth
const bookSalesThresholds = [1000, 3000]; // Thresholds for book sales impact

// Define weights for each metric
const weights = {
    uk_percentage: 0.2,
    absolute_uk_followers: 0.2,
    engagement_rate: 0.2,
    growth_rate: 0.2,
    book_sales: 0.2 // Adjust this weight as needed
};

function calculateScore() {
    // Get input values
    const influencerName = document.getElementById("influencer_name").value.trim();
    const followerCount = parseFloat(document.getElementById("follower_count").value);
    const ukPercentage = parseFloat(document.getElementById("uk_percentage").value);
    const engagementRate = parseFloat(document.getElementById("engagement_rate").value);
    const growthRate = parseFloat(document.getElementById("growth_rate").value);
    const bookSales = parseFloat(document.getElementById("book_sales").value);

    // Simple validation
    if (!influencerName || isNaN(followerCount) || isNaN(ukPercentage) || isNaN(engagementRate) || isNaN(growthRate) || isNaN(bookSales)) {
        alert("Please enter valid information in all fields.");
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

    // Calculate book sales impact
    let bookSalesScore = 0;
    if (bookSales > bookSalesThresholds[1]) {
        bookSalesScore = 1; // Huge impact
    } else if (bookSales > bookSalesThresholds[0]) {
        bookSalesScore = 0.75; // Significant impact
    } // Less than or equal to 1000 results in no impact (score = 0)

    // Calculate total score
    const normalizedScore = (
        weights.uk_percentage * ukPercentageScore +
        weights.absolute_uk_followers * absoluteUKScore +
        weights.engagement_rate * engagementScore +
        weights.growth_rate * growthScore +
        weights.book_sales * bookSalesScore
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
       
::contentReference[oaicite:0]{index=0}
 
