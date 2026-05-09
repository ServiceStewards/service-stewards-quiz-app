const archetypeMap = {
    0:  [ "Agape Giver", "Principled Giver", "Sacred Listener", "Practical Helper" ],
    1:  [ "Skeptical Servant", "Mutual Partner", "Principled Giver", "Compassionate Witness" ],
    2:  [ "Sacred Listener", "Agape Giver", "Skeptical Servant", "Virtue Builder" ],
    3:  [ "Practical Helper", "Virtue Builder", "Agape Giver", "Skeptical Servant" ],
    4:  [ "Compassionate Witness", "Virtue Builder", "Mutual Partner", "Principled Giver" ],
    5:  [ "Mutual Partner", "Sacred Listener", "Skeptical Servant", "Agape Giver" ],
    6:  [ "Principled Giver", "Practical Helper", "Sacred Listener", "Compassionate Witness" ],
    7:  [ "Agape Giver", "Virtue Builder", "Practical Helper", "Skeptical Servant" ],
    8:  [ "Compassionate Witness", "Principled Giver", "Skeptical Servant", "Sacred Listener" ],
    9:  [ "Virtue Builder", "Mutual Partner", "Agape Giver", "Practical Helper" ],
    10: [ "Skeptical Servant", "Virtue Builder", "Mutual Partner", "Agape Giver" ],
    11: [ "Agape Giver", "Compassionate Witness", "Principled Giver", "Virtue Builder" ],
    12: [ "Sacred Listener", "Skeptical Servant", "Virtue Builder", "Mutual Partner" ],
    13: [ "Practical Helper", "Skeptical Servant", "Compassionate Witness", "Principled Giver" ],
    14: [ "Principled Giver", "Agape Giver", "Sacred Listener", "Virtue Builder" ],
    15: [ "Compassionate Witness", "Practical Helper", "Mutual Partner", "Sacred Listener" ],
    16: [ "Compassionate Witness", "Principled Giver", "Practical Helper", "Mutual Partner" ],
    17: [ "Sacred Listener", "Mutual Partner", "Compassionate Witness", "Practical Helper" ],
    18: [ "Virtue Builder", "Sacred Listener", "Principled Giver", "Agape Giver" ],
    19: [ "Mutual Partner", "Practical Helper", "Skeptical Servant", "Compassionate Witness" ]
};

const answerTextMap = {
    0:  [ "They have a need I can meet, and love means I show up.", "I believe it's simply the right thing to do.", "I feel drawn to be present and listen deeply.", "I start thinking about how I could make a lasting difference." ],
    1:  [ "I check my motives—there might be truth in it.", "I welcome the conversation—we're both learning.", "If I've done what I believe is right, I stand by it.", "I reflect quietly, but it won't stop me from caring." ],
    2:  [ "I listen first—people need to be seen before anything else.", "I help. Their need matters more than their past.", "I ask whether helping now would truly empower or just soothe.", "I wonder how they might grow if I help the right way." ],
    3:  [ "I try to help where I can make the biggest long-term difference.", "I support those who are also working to grow.", "I focus on whoever needs help most urgently.", "I pause and make sure I'm not stepping in as a savior." ],
    4:  [ "It's offered freely, without expecting anything back.", "It strengthens someone in the long run.", "It respects both people—neither one is higher or lower.", "It flows from strong values, no matter the outcome." ],
    5:  [ "Boundaries protect both people and keep things clear.", "If the need is real, I try not to let my discomfort stop me.", "I don't set limits lightly—I've seen help go wrong without them.", "Limits matter—but love is still the heart of it." ],
    6:  [ "That I stayed true to my values.", "That my help made a real difference.", "That they felt seen and truly cared for.", "That they didn't feel alone." ],
    7:  [ "They're tools—not a replacement for compassion.", "They should empower people—not just offer support.", "They can create change if they're well-run and informed by data.", "They're necessary—but they should always be questioned." ],
    8:  [ "I help when I can truly be present—not just fix things.", "I help because it's what goodness or God asks of me.", "I help when the motive and method both feel right.", "Helping begins by seeing, hearing, and understanding—then responding." ],
    9:  [ "When the help doesn't hold someone back or build dependence.", "When it's done without power games or pressure.", "When someone's life—or day—is a little easier.", "When the outcome matches the effort." ],
    10: [ "I ask myself if I helped too soon—or for the wrong reasons.", "I reflect on what I can learn and do better next time.", "I wonder if I helped in a way that protected their dignity.", "I remind myself that love isn't about the outcome." ],
    11: [ "Because people shouldn't have to earn the basics.", "Because presence is often more powerful than fixing.", "Because I was taught to do what's right.", "Because helping gives my life meaning." ],
    12: [ "It's too focused on scaling and not enough on people.", "It feels more like a performance than something real.", "It creates dependence instead of growth.", "It forgets that service should be a two-way connection, not one side giving and the other just receiving." ],
    13: [ "I value it when it reflects true impact.", "I avoid it if it shifts the focus to me.", "I don't expect it—it's not why I help.", "I appreciate it, but I don't need it." ],
    14: [ "Whether it aligns with my values and boundaries.", "Whether the need is urgent or critical.", "Whether I have the emotional space to be present.", "Whether my help could make a lasting impact." ],
    15: [ "Affirm their worth and make sure they don't feel alone.", "Focus on what kind of support would actually help.", "Try to build mutual trust and connection.", "Quiet your mind and offer your full attention." ],
    16: [ "If it feels like no one's really seeing their pain.", "If the help doesn't align with my values or long-term convictions.", "If I'm unsure what they truly need.", "If I can't show up in a way that respects both of us." ],
    17: [ "When someone allowed me to witness their story.", "When both of us felt respected and seen.", "When the person felt comforted during something hard.", "When the help created change that really lasted." ],
    18: [ "Seeing someone's spirit or confidence grow.", "Feeling like I truly connected with the person.", "Knowing I stayed true to my values.", "Making someone's burden feel a little lighter." ],
    19: [ "I help others find their voice and contribute meaningfully.", "I think about how to make the effort count long-term.", "I try to keep things human and thoughtful, even if it's organized.", "I quietly watch for people who might feel unseen or left out." ]
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

        // Build readable answers and count selections
        const readableAnswers = {};
        Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
            const qNum = Number(questionIndex);
            const aNum = Number(answerIndex);
            const archetype = archetypeMap[qNum][aNum];
            const text = answerTextMap[qNum][aNum];
            readableAnswers[questionIndex] = { text, archetype };
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
            body: JSON.stringify({ scores, topResult, secondResult, readableAnswers })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Scoring failed', detail: err.message })
        };
    }
};