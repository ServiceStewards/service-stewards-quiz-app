exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { answers } = JSON.parse(event.body);

        const archetypes = [
            'Agape Giver', 'Sacred Listener', 'Principled Giver',
            'Mutual Partner', 'Virtue Builder', 'Practical Helper',
            'Compassionate Witness', 'Skeptical Servant'
        ];

        const questions = [
            { answers: [ { archetype: "Agape Giver" }, { archetype: "Principled Giver" }, { archetype: "Sacred Listener" }, { archetype: "Practical Helper" } ] },
            { answers: [ { archetype: "Skeptical Servant" }, { archetype: "Mutual Partner" }, { archetype: "Principled Giver" }, { archetype: "Compassionate Witness" } ] },
            { answers: [ { archetype: "Sacred Listener" }, { archetype: "Agape Giver" }, { archetype: "Skeptical Servant" }, { archetype: "Virtue Builder" } ] },
            { answers: [ { archetype: "Practical Helper" }, { archetype: "Virtue Builder" }, { archetype: "Agape Giver" }, { archetype: "Skeptical Servant" } ] },
            { answers: [ { archetype: "Compassionate Witness" }, { archetype: "Virtue Builder" }, { archetype: "Mutual Partner" }, { archetype: "Principled Giver" } ] },
            { answers: [ { archetype: "Mutual Partner" }, { archetype: "Sacred Listener" }, { archetype: "Skeptical Servant" }, { archetype: "Agape Giver" } ] },
            { answers: [ { archetype: "Principled Giver" }, { archetype: "Practical Helper" }, { archetype: "Sacred Listener" }, { archetype: "Compassionate Witness" } ] },
            { answers: [ { archetype: "Agape Giver" }, { archetype: "Virtue Builder" }, { archetype: "Practical Helper" }, { archetype: "Skeptical Servant" } ] },
            { answers: [ { archetype: "Compassionate Witness" }, { archetype: "Principled Giver" }, { archetype: "Skeptical Servant" }, { archetype: "Sacred Listener" } ] },
            { answers: [ { archetype: "Virtue Builder" }, { archetype: "Mutual Partner" }, { archetype: "Agape Giver" }, { archetype: "Practical Helper" } ] },
            { answers: [ { archetype: "Skeptical Servant" }, { archetype: "Virtue Builder" }, { archetype: "Mutual Partner" }, { archetype: "Agape Giver" } ] },
            { answers: [ { archetype: "Agape Giver" }, { archetype: "Compassionate Witness" }, { archetype: "Principled Giver" }, { archetype: "Virtue Builder" } ] },
            { answers: [ { archetype: "Sacred Listener" }, { archetype: "Skeptical Servant" }, { archetype: "Virtue Builder" }, { archetype: "Mutual Partner" } ] },
            { answers: [ { archetype: "Practical Helper" }, { archetype: "Skeptical Servant" }, { archetype: "Compassionate Witness" }, { archetype: "Principled Giver" } ] },
            { answers: [ { archetype: "Principled Giver" }, { archetype: "Agape Giver" }, { archetype: "Sacred Listener" }, { archetype: "Virtue Builder" } ] },
            { answers: [ { archetype: "Compassionate Witness" }, { archetype: "Practical Helper" }, { archetype: "Mutual Partner" }, { archetype: "Sacred Listener" } ] },
            { answers: [ { archetype: "Compassionate Witness" }, { archetype: "Principled Giver" }, { archetype: "Practical Helper" }, { archetype: "Mutual Partner" } ] },
            { answers: [ { archetype: "Sacred Listener" }, { archetype: "Mutual Partner" }, { archetype: "Compassionate Witness" }, { archetype: "Practical Helper" } ] },
            { answers: [ { archetype: "Virtue Builder" }, { archetype: "Sacred Listener" }, { archetype: "Principled Giver" }, { archetype: "Agape Giver" } ] },
            { answers: [ { archetype: "Mutual Partner" }, { archetype: "Practical Helper" }, { archetype: "Skeptical Servant" }, { archetype: "Compassionate Witness" } ] }
        ];

        // Count available appearances for each archetype
        const availableCounts = {};
        const selectedCounts = {};

        archetypes.forEach(a => {
            availableCounts[a] = 0;
            selectedCounts[a] = 0;
        });

        questions.forEach(question => {
            question.answers.forEach(answer => {
                if (availableCounts.hasOwnProperty(answer.archetype)) {
                    availableCounts[answer.archetype]++;
                }
            });
        });

        // Count user selections
        Object.values(answers).forEach(answer => {
            if (selectedCounts.hasOwnProperty(answer.archetype)) {
                selectedCounts[answer.archetype]++;
            }
        });

        // Calculate scores
        const scores = {};
        archetypes.forEach(archetype => {
            const available = availableCounts[archetype];
            const selected = selectedCounts[archetype];
            const percentage = available > 0 ? Math.round((selected / available) * 100) : 0;
            scores[archetype] = { selected, available, percentage };
        });

        // Find top archetype (with tie detection)
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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Scoring failed', detail: err.message })
        };
    }
};