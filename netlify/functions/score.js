const archetypeMap = {
    0: ["Agape Giver", "Principled Giver", "Sacred Listener", "Practical Helper"],
    1: ["Skeptical Servant", "Mutual Partner", "Principled Giver", "Compassionate Witness"],
    2: ["Sacred Listener", "Agape Giver", "Skeptical Servant", "Virtue Builder"],
    3: ["Practical Helper", "Virtue Builder", "Agape Giver", "Skeptical Servant"],
    4: ["Compassionate Witness", "Virtue Builder", "Mutual Partner", "Principled Giver"],
    5: ["Mutual Partner", "Sacred Listener", "Skeptical Servant", "Agape Giver"],
    6: ["Principled Giver", "Practical Helper", "Sacred Listener", "Compassionate Witness"],
    7: ["Agape Giver", "Virtue Builder", "Practical Helper", "Skeptical Servant"],
    8: ["Compassionate Witness", "Principled Giver", "Skeptical Servant", "Sacred Listener"],
    9: ["Virtue Builder", "Mutual Partner", "Agape Giver", "Practical Helper"],
    10: ["Skeptical Servant", "Virtue Builder", "Mutual Partner", "Agape Giver"],
    11: ["Agape Giver", "Compassionate Witness", "Principled Giver", "Virtue Builder"],
    12: ["Sacred Listener", "Skeptical Servant", "Virtue Builder", "Mutual Partner"],
    13: ["Practical Helper", "Skeptical Servant", "Compassionate Witness", "Principled Giver"],
    14: ["Principled Giver", "Agape Giver", "Sacred Listener", "Virtue Builder"],
    15: ["Compassionate Witness", "Practical Helper", "Mutual Partner", "Sacred Listener"],
    16: ["Compassionate Witness", "Principled Giver", "Practical Helper", "Mutual Partner"],
    17: ["Sacred Listener", "Mutual Partner", "Compassionate Witness", "Practical Helper"],
    18: ["Virtue Builder", "Sacred Listener", "Principled Giver", "Agape Giver"],
    19: ["Mutual Partner", "Practical Helper", "Skeptical Servant", "Compassionate Witness"]
};

const archetypes = [
    'Agape Giver', 'Sacred Listener', 'Principled Giver',
    'Mutual Partner', 'Virtue Builder', 'Practical Helper',
    'Compassionate Witness', 'Skeptical Servant'
];

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { answers } = JSON.parse(event.body);

        const availableCounts = {};
        const selectedCounts = {};
        archetypes.forEach(a => { availableCounts[a] = 0; selectedCounts[a] = 0; });

        Object.values(archetypeMap).forEach(answerList => {
            answerList.forEach(archetype => { availableCounts[archetype]++; });
        });


        Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
            const archetype = archetypeMap[Number(questionIndex)][Number(answerIndex)];
            if (archetype && selectedCounts.hasOwnProperty(archetype)) {
                selectedCounts[archetype]++;
            }
        });


        const scores = {};
        archetypes.forEach(archetype => {
            const available = availableCounts[archetype];
            const selected = selectedCounts[archetype];
            const percentage = available > 0 ? Math.round((selected / available) * 100) : 0;
            scores[archetype] = { selected, available, percentage };
        });

        const sorted = Object.keys(scores).sort((a, b) => scores[b].percentage - scores[a].percentage);
        const topPercentage = scores[sorted[0]].percentage;
        const topArchetypes = sorted.filter(a => scores[a].percentage === topPercentage);

        const topResult = topArchetypes.length === 1
            ? { name: topArchetypes[0], ...scores[topArchetypes[0]], isTie: false }
            : { name: topArchetypes[0], tiedWith: topArchetypes.slice(1), ...scores[topArchetypes[0]], isTie: true };

        const secondResult = { name: sorted[1], ...scores[sorted[1]] };

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores, topResult, secondResult })
        };

    } catch (err) {
        console.log('ERROR:', err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Scoring failed', detail: err.message })
        };
    }
};