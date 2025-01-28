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
    const influencerName = document.getElementById("influencer_name").value.trim();
    const url = document.getElementById("url").value.trim();
    const description = document.getElementById("description").value.trim();
    const idea = document.getElementById("idea").value.trim();
    const followerCount = parseFloat(document.getElementById("follower_count").value);
    const ukPercentage = parseFloat(document.getElementById("uk_percentage").value);
    const engagementRate = parseFloat(document.getElementById("engagement_rate").value);
    const growthRate = parseFloat(document.getElementById("growth_rate").value);

    // Simple validation
    if (!influencerName || isNaN(followerCount) || isNaN(ukPercentage) || isNaN(engagementRate) || isNaN(growthRate)) {
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

    // Generate plain text output
    const plainText = `
Influencer Scoring Tool Results:
--------------------------------
Influencer Name: ${influencerName}
URL: ${url}
Description: ${description}
Idea: ${idea}

Total Followers: ${followerCount}
UK Percentage: ${ukPercentage}%
Engagement Rate: ${engagementRate}%
Follower Growth Rate: ${growthRate}%

Absolute UK Followers: ${Math.round(absoluteUKFollowers)}
Calculated Score: ${finalScore} / 10
Rating: ${ratingDescription}
--------------------------------
    `.trim();

    // Display results in HTML
    document.getElementById("result").innerHTML = `
        <pre>${plainText}</pre>
        <button onclick="copyToClipboard()">Copy to Clipboard</button>
    `;
}

// Function to copy plain text to clipboard
function copyToClipboard() {
    const resultText = document.querySelector("#result pre").innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        alert("Results copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy text: " + err);
    });
}
