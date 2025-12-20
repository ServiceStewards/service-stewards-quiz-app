import React, { useState } from 'react';
import { ChevronRight, BarChart3, Lock } from 'lucide-react'; // Keep these UI icons
import { CHECKOUT_URLS } from './checkoutConfig';


// -------------------------------
// Thumbnail preview image URLs
// -------------------------------
const TOP_RESULT_PREVIEW_URL =
    "https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/1a0ba83c357ee376b530e778e06e21d8d82140ac/top-result-example.png";

const BREAKDOWN_PREVIEW_URL =
    "https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/1a0ba83c357ee376b530e778e06e21d8d82140ac/full-breakdown-example.png";
// (Replace with your actual breakdown-example raw URL when ready)

// -------------------------------


const ServiceStewardsQuiz = () => {
    // START: PROFILE DATA FOR CHECKOUT
    const profileData = {
        'Agape Giver': {
            label: 'Agape Giver',
            slug: 'agape-giver',
            shortTagline: 'Steady, unconditional care and presence'
        },
        'Compassionate Witness': {
            label: 'Compassionate Witness',
            slug: 'compassionate-witness',
            shortTagline: 'Gentle empathy and shared understanding'
        },
        'Mutual Partner': {
            label: 'Mutual Partner',
            slug: 'mutual-partner',
            shortTagline: 'Side-by-side, collaborative support'
        },
        'Practical Helper': {
            label: 'Practical Helper',
            slug: 'practical-helper',
            shortTagline: 'Tangible, real-world problem solving'
        },
        'Principled Giver': {
            label: 'Principled Giver',
            slug: 'principled-giver',
            shortTagline: 'Value-driven, consistent, responsible help'
        },
        'Sacred Listener': {
            label: 'Sacred Listener',
            slug: 'sacred-listener',
            shortTagline: 'Deep listening and emotional safety'
        },
        'Skeptical Servant': {
            label: 'Skeptical Servant',
            slug: 'skeptical-servant',
            shortTagline: 'Honest questions, clear-eyed discernment'
        },
        'Virtue Builder': {
            label: 'Virtue Builder',
            slug: 'virtue-builder',
            shortTagline: 'Encouraging growth, building inner strength'
        }
    };


    // END: PROFILE DATA FOR CHECKOUT

    // START: QUIZ DATA SETUP
    // All 20 questions with correct archetype mapping from the clean scoring matrix
    const questions = [

        {
            id: 1,
            question: "What usually moves you to help someone?",
            answers: [
                { text: "They have a need I can meet, and love means I show up.", archetype: "Agape Giver" },
                { text: "I believe it's simply the right thing to do.", archetype: "Principled Giver" },
                { text: "I feel drawn to be present and listen deeply.", archetype: "Sacred Listener" },
                { text: "I start thinking about how I could make a lasting difference.", archetype: "Practical Helper" }
            ]
        },
        {
            id: 2,
            question: "If someone criticized the way you helped—or imagine it might happen—how would you respond?",
            answers: [
                { text: "I check my motives—there might be truth in it.", archetype: "Skeptical Servant" },
                { text: "I welcome the conversation—we're both learning.", archetype: "Mutual Partner" },
                { text: "If I've done what I believe is right, I stand by it.", archetype: "Principled Giver" },
                { text: "I reflect quietly, but it won't stop me from caring.", archetype: "Compassionate Witness" }
            ]
        },
        {
            id: 3,
            question: "When you see someone struggling but don't know their story…",
            answers: [
                { text: "I listen first—people need to be seen before anything else.", archetype: "Sacred Listener" },
                { text: "I help. Their need matters more than their past.", archetype: "Agape Giver" },
                { text: "I ask whether helping now would truly empower or just soothe.", archetype: "Skeptical Servant" },
                { text: "I wonder how they might grow if I help the right way.", archetype: "Virtue Builder" }
            ]
        },
        {
            id: 4,
            question: "If your time or energy is limited, how do you decide who to help?",
            answers: [
                { text: "I try to help where I can make the biggest long-term difference.", archetype: "Practical Helper" },
                { text: "I support those who are also working to grow.", archetype: "Virtue Builder" },
                { text: "I focus on whoever needs help most urgently.", archetype: "Agape Giver" },
                { text: "I pause and make sure I'm not stepping in as a savior.", archetype: "Skeptical Servant" }
            ]
        },
        {
            id: 5,
            question: "What makes the help you give feel truly meaningful?",
            answers: [
                { text: "It's offered freely, without expecting anything back.", archetype: "Compassionate Witness" },
                { text: "It strengthens someone in the long run.", archetype: "Virtue Builder" },
                { text: "It respects both people—neither one is higher or lower.", archetype: "Mutual Partner" },
                { text: "It flows from strong values, no matter the outcome.", archetype: "Principled Giver" }
            ]
        },
        {
            id: 6,
            question: "How do you think about setting boundaries when helping others?",
            answers: [
                { text: "Boundaries protect both people and keep things clear.", archetype: "Mutual Partner" },
                { text: "If the need is real, I try not to let my discomfort stop me.", archetype: "Sacred Listener" },
                { text: "I don't set limits lightly—I've seen help go wrong without them.", archetype: "Skeptical Servant" },
                { text: "Limits matter—but love is still the heart of it.", archetype: "Agape Giver" }
            ]
        },
        {
            id: 7,
            question: "After you've helped someone, what matters most to you?",
            answers: [
                { text: "That I stayed true to my values.", archetype: "Principled Giver" },
                { text: "That my help made a real difference.", archetype: "Practical Helper" },
                { text: "That they felt seen and truly cared for.", archetype: "Sacred Listener" },
                { text: "That they didn't feel alone.", archetype: "Compassionate Witness" }
            ]
        },
        {
            id: 8,
            question: "How do you view systems that provide help (nonprofits, churches, aid programs)?",
            answers: [
                { text: "They're tools—not a replacement for compassion.", archetype: "Agape Giver" },
                { text: "They should empower people—not just offer support.", archetype: "Virtue Builder" },
                { text: "They can create change if they're well-run and informed by data.", archetype: "Practical Helper" },
                { text: "They're necessary—but they should always be questioned.", archetype: "Skeptical Servant" }
            ]
        },
        {
            id: 9,
            question: "Which of these most reflects your view of helping others?",
            answers: [
                { text: "I help when I can truly be present—not just fix things.", archetype: "Compassionate Witness" },
                { text: "I help because it's what goodness or God asks of me.", archetype: "Principled Giver" },
                { text: "I help when the motive and method both feel right.", archetype: "Skeptical Servant" },
                { text: "Helping begins by seeing, hearing, and understanding—then responding.", archetype: "Sacred Listener" }
            ]
        },
        {
            id: 10,
            question: "When does it feel like real service to you?",
            answers: [
                { text: "When the help doesn't hold someone back or build dependence.", archetype: "Virtue Builder" },
                { text: "When it's done without power games or pressure.", archetype: "Mutual Partner" },
                { text: "When someone's life—or day—is a little easier.", archetype: "Agape Giver" },
                { text: "When the outcome matches the effort.", archetype: "Practical Helper" }
            ]
        },
        {
            id: 11,
            question: "How do you feel if someone you help doesn't change or say thank you?",
            answers: [
                { text: "I ask myself if I helped too soon—or for the wrong reasons.", archetype: "Skeptical Servant" },
                { text: "I reflect on what I can learn and do better next time.", archetype: "Virtue Builder" },
                { text: "I wonder if I helped in a way that protected their dignity.", archetype: "Mutual Partner" },
                { text: "I remind myself that love isn't about the outcome.", archetype: "Agape Giver" }
            ]
        },
        {
            id: 12,
            question: "What's the most honest reason you help others?",
            answers: [
                { text: "Because people shouldn't have to earn the basics.", archetype: "Agape Giver" },
                { text: "Because presence is often more powerful than fixing.", archetype: "Compassionate Witness" },
                { text: "Because I was taught to do what's right.", archetype: "Principled Giver" },
                { text: "Because helping gives my life meaning.", archetype: "Virtue Builder" }
            ]
        },
        {
            id: 13,
            question: "What frustrates you most about how service is done today?",
            answers: [
                { text: "It's too focused on scaling and not enough on people.", archetype: "Sacred Listener" },
                { text: "It feels more like a performance than something real.", archetype: "Skeptical Servant" },
                { text: "It creates dependence instead of growth.", archetype: "Virtue Builder" },
                { text: "It forgets that service should be a two-way connection, not one side giving and the other just receiving.", archetype: "Mutual Partner" }
            ]
        },
        {
            id: 14,
            question: "How do you feel about being recognized or thanked for helping?",
            answers: [
                { text: "I value it when it reflects true impact.", archetype: "Practical Helper" },
                { text: "I avoid it if it shifts the focus to me.", archetype: "Skeptical Servant" },
                { text: "I don't expect it—it's not why I help.", archetype: "Compassionate Witness" },
                { text: "I appreciate it, but I don't need it.", archetype: "Principled Giver" }
            ]
        },
        {
            id: 15,
            question: "Before you agree to help someone, what matters most in your decision?",
            answers: [
                { text: "Whether it aligns with my values and boundaries.", archetype: "Principled Giver" },
                { text: "Whether the need is urgent or critical.", archetype: "Agape Giver" },
                { text: "Whether I have the emotional space to be present.", archetype: "Sacred Listener" },
                { text: "Whether my help could make a lasting impact.", archetype: "Virtue Builder" }
            ]
        },
        {
            id: 16,
            question: "When someone opens up about a hard experience, you usually...",
            answers: [
                { text: "Affirm their worth and make sure they don't feel alone.", archetype: "Compassionate Witness" },
                { text: "Focus on what kind of support would actually help.", archetype: "Practical Helper" },
                { text: "Try to build mutual trust and connection.", archetype: "Mutual Partner" },
                { text: "Quiet your mind and offer your full attention.", archetype: "Sacred Listener" }
            ]
        },
        {
            id: 17,
            question: "What would make you hesitate to help someone?",
            answers: [
                { text: "If it feels like no one's really seeing their pain.", archetype: "Compassionate Witness" },
                { text: "If the help doesn't align with my values or long-term convictions.", archetype: "Principled Giver" },
                { text: "If I'm unsure what they truly need.", archetype: "Practical Helper" },
                { text: "If I can't show up in a way that respects both of us.", archetype: "Mutual Partner" }
            ]
        },
        {
            id: 18,
            question: "What kind of service moment sticks with you the longest?",
            answers: [
                { text: "When someone allowed me to witness their story.", archetype: "Sacred Listener" },
                { text: "When both of us felt respected and seen.", archetype: "Mutual Partner" },
                { text: "When the person felt comforted during something hard.", archetype: "Compassionate Witness" },
                { text: "When the help created change that really lasted.", archetype: "Practical Helper" }
            ]
        },
        {
            id: 19,
            question: "What gives you joy when serving others?",
            answers: [
                { text: "Seeing someone's spirit or confidence grow.", archetype: "Virtue Builder" },
                { text: "Feeling like I truly connected with the person.", archetype: "Sacred Listener" },
                { text: "Knowing I stayed true to my values.", archetype: "Principled Giver" },
                { text: "Making someone's burden feel a little lighter.", archetype: "Agape Giver" }
            ]
        },
        {
            id: 20,
            question: "In group service, what role do you usually take?",
            answers: [
                { text: "I help others find their voice and contribute meaningfully.", archetype: "Mutual Partner" },
                { text: "I think about how to make the effort count long-term.", archetype: "Practical Helper" },
                { text: "I try to keep things human and thoughtful, even if it's organized.", archetype: "Skeptical Servant" },
                { text: "I quietly watch for people who might feel unseen or left out.", archetype: "Compassionate Witness" }
            ]
        }
    ];

    // The 8 Service Archetypes with their descriptions, colors, and icons
    const archetypes = {
        'Agape Giver': {
            description: 'Love-driven service without conditions',
            color: '#CC5B5B',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Agape-Giver-icon.svg',
            bgColor: 'rgba(204, 91, 91, 0.1)',
            borderColor: 'rgba(204, 91, 91, 0.3)'
        },
        'Sacred Listener': {
            description: 'Deep presence and attentive care',
            color: '#807272',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Sacred-Listener-icon.svg',
            bgColor: 'rgba(128, 114, 114, 0.1)',
            borderColor: 'rgba(128, 114, 114, 0.3)'
        },
        'Principled Giver': {
            description: 'Value-driven service rooted in conviction',
            color: '#D9822B',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Principled-Giver-icon.svg',
            bgColor: 'rgba(217, 130, 43, 0.1)',
            borderColor: 'rgba(217, 130, 43, 0.3)'
        },
        'Mutual Partner': {
            description: 'Reciprocal service that honors both giver and receiver',
            color: '#B26CA8',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Mutual-Partner-icon.svg',
            bgColor: 'rgba(178, 108, 168, 0.1)',
            borderColor: 'rgba(178, 108, 168, 0.3)'
        },
        'Virtue Builder': {
            description: 'Growth-oriented service that empowers others',
            color: '#65BFA0',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Virtue-Builder-icon.svg',
            bgColor: 'rgba(101, 191, 160, 0.1)',
            borderColor: 'rgba(101, 191, 160, 0.3)'
        },
        'Practical Helper': {
            description: 'Strategic service focused on lasting impact',
            color: '#D6AA1C',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Practical-Helper-icon.svg',
            bgColor: 'rgba(214, 170, 28, 0.1)',
            borderColor: 'rgba(214, 170, 28, 0.3)'
        },
        'Compassionate Witness': {
            description: 'Present-focused care that sees and affirms',
            color: '#5F8C99',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Compassionate-Witness-icon.svg',
            bgColor: 'rgba(95, 140, 153, 0.1)',
            borderColor: 'rgba(95, 140, 153, 0.3)'
        },
        'Skeptical Servant': {
            description: 'Thoughtful service that questions and reflects',
            color: '#7A5230',
            iconUrl: 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Skeptical-Servant-icon.svg',
            bgColor: 'rgba(122, 82, 48, 0.1)',
            borderColor: 'rgba(122, 82, 48, 0.3)'
        }
    };
    // END: QUIZ DATA SETUP

    // START: INITIALIZATION / SETUP CODE
    const useFixedTotals = false;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isPremium, setIsPremium] = useState(false);

    // Purchase button state
    const [selectedProfileForPurchase, setSelectedProfileForPurchase] = useState(null);
    const [purchaseError, setPurchaseError] = useState('');

    // NEW: Email capture and submission state
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // NEW: Optional group/class fields
    const [groupUse, setGroupUse] = useState(false);
    const [groupName, setGroupName] = useState('');

    // END: INITIALIZATION / SETUP CODE

    // START: USER INPUT HANDLING
    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        if (selectedAnswer !== '') {
            const newAnswers = {
                ...answers,
                [currentQuestion]: questions[currentQuestion].answers[selectedAnswer]
            };
            setAnswers(newAnswers);

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer('');
            } else {
                setShowEmailCapture(true);
            }
        }
    };

    const handleViewBreakdown = () => {
        // Show full results breakdown page
        setIsPremium(true);
    };
    // END: USER INPUT HANDLING

    // START: SCORE CALCULATION / SCORING LOGIC
    const calculateScores = () => {
        // Count how many times each archetype appears across all answer choices
        const availableCounts = {};
        const selectedCounts = {};

        // Initialize counts
        Object.keys(archetypes).forEach(archetype => {
            availableCounts[archetype] = 0;
            selectedCounts[archetype] = 0;
        });

        // Count available appearances for each archetype
        questions.forEach(question => {
            question.answers.forEach(answer => {
                if (availableCounts.hasOwnProperty(answer.archetype)) {
                    availableCounts[answer.archetype]++;
                }
            });
        });

        // Count user selections for each archetype
        Object.values(answers).forEach(answer => {
            if (selectedCounts.hasOwnProperty(answer.archetype)) {
                selectedCounts[answer.archetype]++;
            }
        });

        // Calculate normalized percentages and create complete score objects
        const scores = {};
        Object.keys(archetypes).forEach(archetype => {
            const available = availableCounts[archetype];
            const selected = selectedCounts[archetype];
            const totalForPercentage = useFixedTotals ? 10 : available;
            const percentage = totalForPercentage > 0 ? Math.round((selected / totalForPercentage) * 100) : 0;

            scores[archetype] = {
                selected: selected,
                available: available,
                percentage: percentage
            };
        });

        return scores;
    };

    const getTopArchetype = () => {
        const scores = calculateScores();
        const sortedArchetypes = Object.keys(scores).sort((a, b) => scores[b].percentage - scores[a].percentage);
        const topPercentage = scores[sortedArchetypes[0]].percentage;

        // Find all archetypes with the top percentage (handles ties)
        const topArchetypes = sortedArchetypes.filter(archetype => scores[archetype].percentage === topPercentage);

        if (topArchetypes.length === 1) {
            return {
                name: topArchetypes[0],
                ...scores[topArchetypes[0]],
                isTie: false
            };
        } else {
            return {
                name: topArchetypes[0],
                tiedWith: topArchetypes.slice(1),
                ...scores[topArchetypes[0]],
                isTie: true
            };
        }
    };

    const getSecondArchetype = () => {
        const scores = calculateScores();
        const sortedArchetypes = Object.keys(scores).sort((a, b) => scores[b].percentage - scores[a].percentage);
        return {
            name: sortedArchetypes[1],
            ...scores[sortedArchetypes[1]]
        };
    };
    // END: SCORE CALCULATION / SCORING LOGIC


    // START: SHARE IMAGE GENERATION
    const generateShareImage = async (topResult) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1080;
        canvas.height = 1920;

        // Icon mapping
        const iconUrls = {
            'Agape Giver': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Agape-Giver-icon.svg',
            'Compassionate Witness': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Compassionate-Witness-icon.svg',
            'Mutual Partner': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Mutual-Partner-icon.svg',
            'Practical Helper': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Practical-Helper-icon.svg',
            'Principled Giver': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Principled-Giver-icon.svg',
            'Sacred Listener': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Sacred-Listener-icon.svg',
            'Skeptical Servant': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Skeptical-Servant-icon.svg',
            'Virtue Builder': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Virtue-Builder-icon.svg'
        };

        const template = new Image();
        template.crossOrigin = 'anonymous';
        template.src = 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/top-result-download-template.png';

        // Check if this is a 2-way tie
        const is2WayTie = topResult.isTie && topResult.tiedWith && topResult.tiedWith.length === 1;

        template.onload = () => {
            // Draw the template
            ctx.drawImage(template, 0, 0, 1080, 1920);

            // Set up text styling
            ctx.textAlign = 'center';

            // Draw "MY SERVICE STYLE:" label
            ctx.fillStyle = '#000000';
            ctx.font = '500 52px Montserrat, Arial, sans-serif';
            ctx.fillText('MY SERVICE STYLE:', 540, 580);

            if (is2WayTie) {
                // TWO-WAY TIE: Draw two circles side by side
                const tiedArchetype = topResult.tiedWith[0];
                const circle1X = 400; // Left circle
                const circle2X = 680; // Right circle
                const circleY = 800;
                const circleRadius = 100; // Smaller circles

                // Draw first circle (left)
                ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(circle1X, circleY, circleRadius, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;
                ctx.strokeStyle = archetypes[topResult.name].color;
                ctx.lineWidth = 14;
                ctx.beginPath();
                ctx.arc(circle1X, circleY, circleRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Draw second circle (right)
                ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(circle2X, circleY, circleRadius, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;
                ctx.strokeStyle = archetypes[tiedArchetype].color;
                ctx.lineWidth = 14;
                ctx.beginPath();
                ctx.arc(circle2X, circleY, circleRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Load and draw both icons
                let iconsLoaded = 0;
                const drawText = () => {
                    iconsLoaded++;
                    if (iconsLoaded === 2) {
                        // Both icons loaded, now draw text
                        drawTiedText();
                    }
                };

                // First icon
                const icon1 = new Image();
                icon1.crossOrigin = 'anonymous';
                icon1.src = iconUrls[topResult.name];
                icon1.onload = () => {
                    const tempCanvas1 = document.createElement('canvas');
                    const tempCtx1 = tempCanvas1.getContext('2d');
                    tempCanvas1.width = 140;
                    tempCanvas1.height = 140;
                    tempCtx1.drawImage(icon1, 0, 0, 140, 140);
                    tempCtx1.globalCompositeOperation = 'source-in';
                    tempCtx1.fillStyle = archetypes[topResult.name].color;
                    tempCtx1.fillRect(0, 0, 140, 140);
                    ctx.drawImage(tempCanvas1, circle1X - 70, circleY - 70, 140, 140);
                    drawText();
                };
                icon1.onerror = drawText;

                // Second icon
                const icon2 = new Image();
                icon2.crossOrigin = 'anonymous';
                icon2.src = iconUrls[tiedArchetype];
                icon2.onload = () => {
                    const tempCanvas2 = document.createElement('canvas');
                    const tempCtx2 = tempCanvas2.getContext('2d');
                    tempCanvas2.width = 140;
                    tempCanvas2.height = 140;
                    tempCtx2.drawImage(icon2, 0, 0, 140, 140);
                    tempCtx2.globalCompositeOperation = 'source-in';
                    tempCtx2.fillStyle = archetypes[tiedArchetype].color;
                    tempCtx2.fillRect(0, 0, 140, 140);
                    ctx.drawImage(tempCanvas2, circle2X - 70, circleY - 70, 140, 140);
                    drawText();
                };
                icon2.onerror = drawText;

                const drawTiedText = () => {
                    // Draw the tied archetype names on 2-3 lines
                    ctx.font = 'bold 88px Montserrat, Arial, sans-serif';

                    // Split names to handle wrapping
                    const name1Words = topResult.name.split(' ');
                    const name2Words = tiedArchetype.split(' ');

                    let currentY = 1050;

                    // First archetype name - use first archetype's color
                    ctx.fillStyle = archetypes[topResult.name].color;
                    if (name1Words.length === 1) {
                        ctx.fillText(topResult.name, 540, currentY);
                        currentY += 100;
                    } else {
                        ctx.fillText(name1Words[0], 540, currentY);
                        currentY += 100;
                        ctx.fillText(name1Words[1], 540, currentY);
                        currentY += 100;
                    }

                    // "&" symbol - smaller, lighter, and thinner
                    currentY += 20; // Add space above the "&"
                    ctx.font = '300 60px Montserrat, Arial, sans-serif'; // Smaller size (60px instead of 88px)
                    ctx.fillStyle = '#6B7280'; // Medium gray
                    ctx.fillText('&', 540, currentY);
                    currentY += 130; // Keep same spacing as other lines for balance

                    // Reset font back to bold and full size for second archetype name
                    ctx.font = 'bold 88px Montserrat, Arial, sans-serif';

                    // Second archetype name - use second archetype's color
                    ctx.fillStyle = archetypes[tiedArchetype].color;
                    if (name2Words.length === 1) {
                        ctx.fillText(tiedArchetype, 540, currentY);
                        currentY += 100;
                    } else {
                        ctx.fillText(name2Words[0], 540, currentY);
                        currentY += 100;
                        ctx.fillText(name2Words[1], 540, currentY);
                        currentY += 100;
                    }

                    // Decorative line - blend both colors
                    const gradient = ctx.createLinearGradient(200, 0, 880, 0);
                    gradient.addColorStop(0, archetypes[topResult.name].color);
                    gradient.addColorStop(1, archetypes[tiedArchetype].color);
                    ctx.strokeStyle = gradient;

                    // Draw the tied message
                    ctx.font = '52px Montserrat, Arial, sans-serif';
                    ctx.fillStyle = '#374151';
                    ctx.fillText("My Top Service Styles (Tied Result)", 540, currentY + 130);

                    // Convert and download
                    canvas.toBlob((blob) => {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = `my-service-style-${topResult.name.replace(/\s+/g, '-').toLowerCase()}-and-${tiedArchetype.replace(/\s+/g, '-').toLowerCase()}.png`;
                        link.href = url;
                        link.click();
                        URL.revokeObjectURL(url);
                    });
                };

            } else {
                // SINGLE WINNER: Original single circle design
                ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;

                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(540, 800, 140, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;
                ctx.strokeStyle = archetypes[topResult.name].color;
                ctx.lineWidth = 16;
                ctx.beginPath();
                ctx.arc(540, 800, 140, 0, Math.PI * 2);
                ctx.stroke();

                const iconImg = new Image();
                iconImg.crossOrigin = 'anonymous';
                iconImg.src = iconUrls[topResult.name];

                iconImg.onload = () => {
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCanvas.width = 200;
                    tempCanvas.height = 200;

                    tempCtx.drawImage(iconImg, 0, 0, 200, 200);
                    tempCtx.globalCompositeOperation = 'source-in';
                    tempCtx.fillStyle = archetypes[topResult.name].color;
                    tempCtx.fillRect(0, 0, 200, 200);

                    ctx.drawImage(tempCanvas, 540 - 100, 800 - 100, 200, 200);

                    drawSingleText();
                };

                iconImg.onerror = () => {
                    console.error('Failed to load icon');
                    drawSingleText();
                };

                const drawSingleText = () => {
                    ctx.font = 'bold 88px Montserrat, Arial, sans-serif';
                    ctx.fillStyle = archetypes[topResult.name].color;

                    const archetypeName = topResult.name;
                    const maxNameWidth = 780;
                    const nameWords = archetypeName.split(' ');

                    const fullNameMetrics = ctx.measureText(archetypeName);

                    if (fullNameMetrics.width <= maxNameWidth || nameWords.length === 1) {
                        ctx.fillText(archetypeName, 540, 1120);
                    } else {
                        const line1 = nameWords[0];
                        const line2 = nameWords.slice(1).join(' ');
                        ctx.fillText(line1, 540, 1090);
                        ctx.fillText(line2, 540, 1190);
                    }

                    const lineY = (fullNameMetrics.width <= maxNameWidth || nameWords.length === 1) ? 1240 : 1320;
                    ctx.strokeStyle = archetypes[topResult.name].color;
                    ctx.lineWidth = 6;
                    ctx.beginPath();
                    ctx.moveTo(340, lineY);
                    ctx.lineTo(740, lineY);
                    ctx.stroke();

                    const descriptionStartY = (fullNameMetrics.width <= maxNameWidth || nameWords.length === 1) ? 1370 : 1450;
                    ctx.font = '52px Montserrat, Arial, sans-serif';
                    ctx.fillStyle = '#374151';

                    const description = archetypes[topResult.name].description;
                    const maxWidth = 880;
                    const words = description.split(' ');
                    let line = '';
                    let y = descriptionStartY;
                    const lineHeight = 75;

                    words.forEach((word, index) => {
                        const testLine = line + word + ' ';
                        const metrics = ctx.measureText(testLine);

                        if (metrics.width > maxWidth && index > 0) {
                            ctx.fillText(line, 540, y);
                            line = word + ' ';
                            y += lineHeight;
                        } else {
                            line = testLine;
                        }
                    });
                    ctx.fillText(line, 540, y);

                    canvas.toBlob((blob) => {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = `my-service-style-${topResult.name.replace(/\s+/g, '-').toLowerCase()}.png`;
                        link.href = url;
                        link.click();
                        URL.revokeObjectURL(url);
                    });
                };
            }
        };

        template.onerror = () => {
            alert('Failed to load template. Please try again.');
        };
    };
    // END: SHARE IMAGE GENERATION

    // START: FULL BREAKDOWN IMAGE GENERATION
    const generateFullBreakdownImage = async (topResult, allScores) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1080;
        canvas.height = 1920;

        // Icon mapping
        const iconUrls = {
            'Agape Giver': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Agape-Giver-icon.svg',
            'Compassionate Witness': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Compassionate-Witness-icon.svg',
            'Mutual Partner': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Mutual-Partner-icon.svg',
            'Practical Helper': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Practical-Helper-icon.svg',
            'Principled Giver': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Principled-Giver-icon.svg',
            'Sacred Listener': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Sacred-Listener-icon.svg',
            'Skeptical Servant': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Skeptical-Servant-icon.svg',
            'Virtue Builder': 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/Virtue-Builder-icon.svg'
        };

        const template = new Image();
        template.crossOrigin = 'anonymous';
        template.src = 'https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/top-result-download-template.png';

        // Check if 3+ way tie
        const isMultiTie = topResult.isTie && topResult.tiedWith && topResult.tiedWith.length >= 2;

        // Sort archetypes by percentage
        const sortedArchetypes = Object.entries(allScores).sort(([, a], [, b]) => b.percentage - a.percentage);

        // Determine which archetypes should be bold (top 1 only, or top 2 if 2-way tie, unless 3+ tie)
        const boldArchetypes = new Set();
        if (!isMultiTie) {
            boldArchetypes.add(sortedArchetypes[0][0]); // Top archetype
            if (topResult.isTie && topResult.tiedWith && topResult.tiedWith.length === 1) {
                boldArchetypes.add(topResult.tiedWith[0]); // Second archetype only if 2-way tie
            }
        }

        template.onload = async () => {
            // Draw the template
            ctx.drawImage(template, 0, 0, 1080, 1920);

            // Title
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000000';
            ctx.font = '600 56px Montserrat, Arial, sans-serif';
            ctx.fillText('MY SERVICE STYLE', 540, 540);
            ctx.fillText('BREAKDOWN', 540, 610);

            // Load all icons first
            const iconPromises = sortedArchetypes.map(([archetype]) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.src = iconUrls[archetype];
                    img.onload = () => resolve({ archetype, img });
                    img.onerror = () => resolve({ archetype, img: null });
                });
            });

            const loadedIcons = await Promise.all(iconPromises);
            const iconMap = {};
            loadedIcons.forEach(({ archetype, img }) => {
                iconMap[archetype] = img;
            });

            // Draw each archetype row
            let startY = 720;
            const rowHeight = 140;
            const iconSize = 50;
            const barStartX = 180;
            const barWidth = 720;
            const barHeight = 30;

            sortedArchetypes.forEach(([archetype, scoreData], index) => {
                const currentY = startY + (index * rowHeight);
                const isBold = boldArchetypes.has(archetype);

                // Draw icon
                const icon = iconMap[archetype];
                if (icon) {
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCanvas.width = iconSize;
                    tempCanvas.height = iconSize;
                    tempCtx.drawImage(icon, 0, 0, iconSize, iconSize);
                    tempCtx.globalCompositeOperation = 'source-in';
                    tempCtx.fillStyle = archetypes[archetype].color;
                    tempCtx.fillRect(0, 0, iconSize, iconSize);
                    ctx.drawImage(tempCanvas, 90, currentY - iconSize / 2, iconSize, iconSize);
                }

                // Draw archetype name (bold + colored if in top 1-2, otherwise gray)
                ctx.textAlign = 'left';
                ctx.fillStyle = isBold ? archetypes[archetype].color : '#374151';
                ctx.font = isBold ? 'bold 32px Montserrat, Arial, sans-serif' : '500 32px Montserrat, Arial, sans-serif';
                ctx.fillText(archetype, barStartX, currentY + 8);

                // Draw bar background
                ctx.fillStyle = '#E5E7EB';
                ctx.fillRect(barStartX, currentY + 20, barWidth, barHeight);

                // Draw colored bar (proportional to percentage)
                const filledWidth = (scoreData.percentage / 100) * barWidth;
                ctx.fillStyle = archetypes[archetype].color;
                ctx.fillRect(barStartX, currentY + 20, filledWidth, barHeight);
            });

            // Convert and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'my-full-service-style-breakdown.png';
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            });
        };

        template.onerror = () => {
            alert('Failed to load template. Please try again.');
        };
    };
    // END: FULL BREAKDOWN IMAGE GENERATION

    // NEW: Webhook submission handler
    const handleSubmitResults = async () => {
        // Validate email format
        if (!email || email.trim() === '') {
            setSubmitError('Please enter your email address.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setSubmitError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Get results data
            const topResult = getTopArchetype();
            const secondResult = getSecondArchetype();
            const allScores = calculateScores();

            // Determine tie scenario and build tied profiles string
            let tieScenario = 'single';
            let tiedTopProfiles = '';
            let topArchetype = topResult.name;

            if (topResult.isTie && topResult.tiedWith && topResult.tiedWith.length > 0) {
                // Multiple tied profiles
                if (topResult.tiedWith.length === 1) {
                    tieScenario = 'tie2';
                } else {
                    tieScenario = 'tie3plus';
                }

                // Create comma-separated string of ALL tied profiles (including the first one)
                const allTiedProfiles = [topResult.name, ...topResult.tiedWith];
                tiedTopProfiles = allTiedProfiles.join(', ');
                topArchetype = ''; // Clear topArchetype when there's a tie
            }

            // Build comprehensive payload
            const payload = {
                email: email.trim(),
                timestamp: new Date().toISOString(),
                topArchetype: topArchetype, // Empty if tied, otherwise the single top profile
                tied_top_profiles: tiedTopProfiles, // Empty if single, otherwise comma-separated string
                topProfileKey: topResult.name,
                topProfilePercentage: topResult.percentage,
                secondArchetype: secondResult.name, // Renamed for clarity
                secondProfileKey: secondResult.name,
                secondProfilePercentage: secondResult.percentage,
                tieScenario: tieScenario,
                tiedProfiles: topResult.tiedWith || [],
                selectedProfileKey: selectedProfileForPurchase || topResult.name,
                scores: allScores,
                allAnswers: answers,

                // Group/class metadata
                group_use: groupUse,
                group_name: groupUse ? groupName.trim() : ""
            };

            console.log('Sending payload to webhook:', payload);

            // Send to webhook with proper error handling
            const response = await fetch('https://hook.us2.make.com/dzsp7kdyad7654lyu4oddj8im08werj9', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error('Webhook failed with status:', response.status);
            } else {
                console.log('Webhook sent successfully');
            }

            // Always show results regardless of webhook status
            setShowResults(true);
            setIsSubmitting(false);

        } catch (error) {
            console.error('Error submitting results:', error);
            setIsSubmitting(false);
            // Show results anyway - the user deserves to see them even if webhook fails
            setShowResults(true);
        }
    };

    // START: EMAIL CAPTURE SCREEN
    if (showEmailCapture && !showResults) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <img
                            src="https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/SERVICE%20STEWARDS%20logo.png"
                            alt="Service Stewards Logo"
                            className="h-14 sm:h-36 w-auto"
                        />
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-4" style={{ color: '#4d4637' }}>
                                You're Finished
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Enter your email to see your top Service Style!
                            </p>
                        </div>

                        <div
                            className="max-w-md mx-auto p-6 rounded-lg border"
                            style={{ backgroundColor: '#f5f5f5', borderColor: '#e5e5e5' }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-400 text-lg bg-white text-black"
                                disabled={isSubmitting}
                            />

                            {/* OPTIONAL: Group/Class checkbox */}
                            <label className="flex items-center gap-2 mb-3 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={groupUse}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setGroupUse(checked);
                                        if (!checked) setGroupName('');
                                    }}
                                    disabled={isSubmitting}
                                />
                                I’m taking this quiz as part of a group session.
                            </label>

                            {/* OPTIONAL: Group/Company name (only show if checkbox is checked) */}
                            {groupUse && (
                                <input
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="Group name"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-400 text-lg bg-white text-black"
                                    disabled={isSubmitting}
                                />
                            )}
                            {/* Privacy Notice */}
                            <p className="text-xs text-gray-600 mb-4 text-center leading-relaxed">
                                By submitting your email, you agree to receive communications from Service Stewards and acknowledge our{' '}
                                <a
                                    href="https://www.servicestewards.com/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    Privacy Policy
                                </a>
                                {' '}and{' '}
                                <a
                                    href="https://www.servicestewards.com/terms-of-service"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    Terms of Service
                                </a>.
                            </p>
                            {submitError && (
                                <p className="text-red-600 text-sm mb-3">{submitError}</p>
                            )}
                            <button
                                onClick={handleSubmitResults}
                                disabled={!email || isSubmitting}
                                className="w-full px-6 py-4 rounded-lg font-semibold transition-all duration-200 text-white text-lg"
                                style={{
                                    backgroundColor: (!email || isSubmitting) ? '#D1D5DB' : '#cfa247',
                                    color: '#ffffff',
                                    cursor: (!email || isSubmitting) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'See My Results'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8 text-xs text-gray-500">
                    © 2025 Service Stewards. Service Style Assessment™. All rights reserved.
                </div>
            </div>
        );
    }

    // END: EMAIL CAPTURE SCREEN

    // START: RESULTS SECTION / RESULT DISPLAY LOGIC
    if (showResults) {
        const topResult = getTopArchetype();
        const secondResult = getSecondArchetype();
        const allScores = calculateScores();

        const topIconUrl = archetypes[topResult.name].iconUrl;
        const secondIconUrl = archetypes[secondResult.name].iconUrl;

        // FIRST RESULTS PAGE (Initial view)
        if (!isPremium) {
            // Check if tied for 3+ archetypes (topResult.tiedWith.length >= 2 means 2 others tied with the top = 3+ total)
            const isMultiTie = topResult.isTie && topResult.tiedWith && topResult.tiedWith.length >= 2;

            return (
                <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="text-center mb-8">
                                <div className="mb-4">
                                    <h1 className="text-3xl font-bold" style={{ color: '#4d4637' }}>
                                        Service Style Assessment
                                    </h1>
                                </div>

                                {/* Primary Archetype Result */}
                                <div
                                    className="rounded-lg p-6 mb-6"
                                    style={{
                                        // Use gold/tan for 3+ ties, archetype color for 1-2 results
                                        backgroundColor: isMultiTie ? '#D1A247' : archetypes[topResult.name].color,
                                        background: isMultiTie
                                            ? 'linear-gradient(135deg, #D1A247, #c9984a)'
                                            : `linear-gradient(135deg, ${archetypes[topResult.name].color}, ${archetypes[topResult.name].color}dd)`,
                                        color: 'white'
                                    }}
                                >
                                    {isMultiTie ? (
                                        // Special message for 3+ way ties
                                        <>
                                            <h2 className="text-2xl font-bold mb-4">Your Service Style Results</h2>
                                            <p className="text-lg opacity-95 leading-relaxed">
                                                Your results show a strong blend across several Service Styles.
                                                This can happen when strengths overlap or when the quiz is completed quickly.
                                            </p>
                                        </>
                                    ) : (
                                        // Normal display for 1-2 way ties or clear winner
                                        <>
                                            <div className="flex items-center justify-center mb-3">
                                                <img
                                                    src={topIconUrl}
                                                    alt={topResult.name}
                                                    className="w-10 h-10 mr-3"
                                                    style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' }}
                                                />
                                                <h2 className="text-2xl font-bold">
                                                    {topResult.name}
                                                    {topResult.isTie && topResult.tiedWith && (
                                                        <span> & {topResult.tiedWith.join(' & ')}</span>
                                                    )}
                                                </h2>
                                                {topResult.isTie && topResult.tiedWith && topResult.tiedWith.map((tiedArchetype) => (
                                                    <img
                                                        key={tiedArchetype}
                                                        src={archetypes[tiedArchetype].iconUrl}
                                                        alt={tiedArchetype}
                                                        className="w-10 h-10 ml-3"
                                                        style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' }}
                                                    />
                                                ))}
                                            </div>
                                            {topResult.isTie && (
                                                <p className="text-sm opacity-90 mb-2 text-center">You're tied for your top service style!</p>
                                            )}
                                            <p className="text-lg opacity-90 mb-4">{archetypes[topResult.name].description}</p>
                                        </>
                                    )}
                                </div>
                                {/* Sales messaging to encourage full breakdown */}
                                <div className="text-center mb-6">
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Want to see how your other scores compare — and discover ways to explore your profile more deeply? View your full results breakdown.
                                    </p>
                                </div>

                                {/* Download link + tiny preview - only show for 1-2 way ties */}
                                {!isMultiTie && (
                                    <>
                                        <div className="text-center mb-3">
                                            <button
                                                onClick={() => generateShareImage(topResult)}
                                                className="text-[#12C4A4] hover:text-[#0fa890] font-medium text-sm underline decoration-dotted underline-offset-4 inline-flex items-center gap-1 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download customized image & share your result (free)
                                            </button>
                                        </div>

                                        {/* tiny thumbnail preview */}
                                        <div className="text-center mb-4 opacity-80">
                                            <img
                                                src={TOP_RESULT_PREVIEW_URL}
                                                alt="Example top result summary"
                                                style={{
                                                    maxHeight: '80px',
                                                    width: 'auto',
                                                    height: '80px',
                                                    borderRadius: '4px',
                                                    margin: '0 auto',
                                                    display: 'block'
                                                }}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Results Breakdown Button */}
                                <div className="text-center">
                                    <button
                                        onClick={handleViewBreakdown}
                                        className="bg-[#12C4A4] hover:bg-[#0fa890] text-white px-8 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        See Full Results Breakdown
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8 text-xs text-gray-500">
                        © 2025 Service Stewards. Service Style Assessment™. All rights reserved.
                    </div>
                </div>
            );
        }


        // FULL BREAKDOWN PAGE (Premium view)
        if (isPremium) {
            // Check if tied for 3+ archetypes
            const isMultiTie = topResult.isTie && topResult.tiedWith && topResult.tiedWith.length >= 2;

            return (
                <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="text-center mb-8">
                                <div className="mb-4">
                                    <h1 className="text-3xl font-bold" style={{ color: '#4d4637' }}>
                                        Service Style Assessment
                                    </h1>
                                </div>

                                {/* Primary Archetype Result */}
                                {!(topResult.isTie && topResult.tiedWith && topResult.tiedWith.length === 1) && (
                                    <div
                                        className="rounded-lg p-6 mb-6"
                                        style={{
                                            backgroundColor: isMultiTie ? '#D1A247' : archetypes[topResult.name].color,
                                            background: isMultiTie
                                                ? 'linear-gradient(135deg, #D1A247, #c9984a)'
                                                : `linear-gradient(135deg, ${archetypes[topResult.name].color}, ${archetypes[topResult.name].color}dd)`,
                                            color: 'white'
                                        }}
                                    >
                                        {isMultiTie ? (
                                            // 3+ way tie - keep centered layout
                                            <>
                                                <h2 className="text-2xl font-bold mb-4 text-center">Your Service Style Results</h2>
                                                <p className="text-lg opacity-95 leading-relaxed text-center">
                                                    Your results show a strong blend across several Service Styles.
                                                    This can happen when strengths overlap or when the quiz is completed quickly.
                                                </p>
                                            </>
                                        ) : (
                                            // Single winner - use column layout
                                            <>
                                                <h2 className="text-3xl font-bold mb-4 text-center">{topResult.name}</h2>

                                                <div className="flex gap-6 items-start">
                                                    {/* Left column - Icon */}
                                                    <div className="w-14 sm:w-16 md:w-20 flex flex-col items-center justify-center gap-2 py-2">
                                                        <img
                                                            src={topIconUrl}
                                                            alt={topResult.name}
                                                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                                                            style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' }}
                                                        />
                                                    </div>

                                                    {/* Vertical dotted separator */}
                                                    <div className="border-l border-dotted border-white/40 self-stretch"></div>

                                                    {/* Right column - Text */}
                                                    <div className="w-3/4">
                                                        <p className="text-sm opacity-95 leading-relaxed text-left">
                                                            As a <strong>{topResult.name}</strong>, you {(() => {
                                                                const strengthsMap = {
                                                                    'Agape Giver': { main: 'show up when people are hurting with steady, dependable care', secondary: 'keep walking with people through challenges instead of stepping back' },
                                                                    'Compassionate Witness': { main: 'notice the emotions beneath the surface and respond with genuine empathy', secondary: 'help people feel understood and less alone in what they\'re carrying' },
                                                                    'Mutual Partner': { main: 'work side-by-side with people and treat their perspective as essential', secondary: 'create solutions together that strengthen trust and connection' },
                                                                    'Practical Helper': { main: 'spot what will make the biggest real-world difference right now', secondary: 'turn needs into practical steps that bring immediate stability' },
                                                                    'Principled Giver': { main: 'act from steady internal convictions even when situations feel unclear', secondary: 'offer help that aligns with fairness, responsibility, and long-term good' },
                                                                    'Sacred Listener': { main: 'create a safe space where people feel deeply seen and heard', secondary: 'listen without judgment or hurry, allowing people to find their own clarity' },
                                                                    'Skeptical Servant': { main: 'ask honest questions that reveal what\'s real beneath the surface', secondary: 'cut through confusion to understand the situation before taking action' },
                                                                    'Virtue Builder': { main: 'spot people\'s potential and encourage their growth with sincerity', secondary: 'help people rise to challenges by offering steady support and belief in them' }
                                                                };
                                                                return strengthsMap[topResult.name].main;
                                                            })()} and {(() => {
                                                                const strengthsMap = {
                                                                    'Agape Giver': { main: 'show up when people are hurting with steady, dependable care', secondary: 'keep walking with people through challenges instead of stepping back' },
                                                                    'Compassionate Witness': { main: 'notice the emotions beneath the surface and respond with genuine empathy', secondary: 'help people feel understood and less alone in what they\'re carrying' },
                                                                    'Mutual Partner': { main: 'work side-by-side with people and treat their perspective as essential', secondary: 'create solutions together that strengthen trust and connection' },
                                                                    'Practical Helper': { main: 'spot what will make the biggest real-world difference right now', secondary: 'turn needs into practical steps that bring immediate stability' },
                                                                    'Principled Giver': { main: 'act from steady internal convictions even when situations feel unclear', secondary: 'offer help that aligns with fairness, responsibility, and long-term good' },
                                                                    'Sacred Listener': { main: 'create a safe space where people feel deeply seen and heard', secondary: 'listen without judgment or hurry, allowing people to find their own clarity' },
                                                                    'Skeptical Servant': { main: 'ask honest questions that reveal what\'s real beneath the surface', secondary: 'cut through confusion to understand the situation before taking action' },
                                                                    'Virtue Builder': { main: 'spot people\'s potential and encourage their growth with sincerity', secondary: 'help people rise to challenges by offering steady support and belief in them' }
                                                                };
                                                                return strengthsMap[topResult.name].secondary;
                                                            })()}. This combination shapes how you naturally show up in service and how others experience your support. Your profile's Deep Dive Guide goes deeper into real-life situations (including challenges) — and how to use your strengths with confidence.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* 2-way tie - mini cards layout (outside the main colored box) */}
                                {topResult.isTie && topResult.tiedWith && topResult.tiedWith.length === 1 && (
                                    <div className="mb-6">
                                        {(() => {
                                            const strengthsMap = {
                                                'Agape Giver': { main: 'show up when people are hurting with steady, dependable care' },
                                                'Compassionate Witness': { main: 'notice the emotions beneath the surface and respond with genuine empathy' },
                                                'Mutual Partner': { main: 'work side-by-side with people and treat their perspective as essential' },
                                                'Practical Helper': { main: 'spot what will make the biggest real-world difference right now' },
                                                'Principled Giver': { main: 'act from steady internal convictions even when situations feel unclear' },
                                                'Sacred Listener': { main: 'create a safe space where people feel deeply seen and heard' },
                                                'Skeptical Servant': { main: "ask honest questions that reveal what's real beneath the surface" },
                                                'Virtue Builder': { main: "spot people's potential and encourage their growth with sincerity" }
                                            };

                                            const nameA = topResult.name;
                                            const nameB = topResult.tiedWith[0];
                                            const iconA = topIconUrl;
                                            const iconB = archetypes[nameB].iconUrl;

                                            return (
                                                <>
                                                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-600">
                                                        You are tied for your top profile!
                                                    </h2>

                                                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                                                        {/* Mini Card A */}
                                                        <div
                                                            className="flex-1 rounded-lg p-5 shadow-md"
                                                            style={{
                                                                backgroundColor: archetypes[nameA].color,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <div className="flex flex-col items-center text-center">
                                                                <div
                                                                    className="w-16 h-16 mb-3 flex-shrink-0"
                                                                    style={{
                                                                        WebkitMaskImage: `url(${iconA})`,
                                                                        WebkitMaskRepeat: 'no-repeat',
                                                                        WebkitMaskSize: 'contain',
                                                                        WebkitMaskPosition: 'center',
                                                                        maskImage: `url(${iconA})`,
                                                                        maskRepeat: 'no-repeat',
                                                                        maskSize: 'contain',
                                                                        maskPosition: 'center',
                                                                        backgroundColor: 'white'
                                                                    }}
                                                                />
                                                                <h3 className="text-xl font-bold mb-3">
                                                                    {nameA}
                                                                </h3>
                                                                <p className="text-base leading-relaxed opacity-95">
                                                                    You {strengthsMap[nameA].main}.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Mini Card B */}
                                                        <div
                                                            className="flex-1 rounded-lg p-5 shadow-md"
                                                            style={{
                                                                backgroundColor: archetypes[nameB].color,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <div className="flex flex-col items-center text-center">
                                                                <div
                                                                    className="w-16 h-16 mb-3 flex-shrink-0"
                                                                    style={{
                                                                        WebkitMaskImage: `url(${iconB})`,
                                                                        WebkitMaskRepeat: 'no-repeat',
                                                                        WebkitMaskSize: 'contain',
                                                                        WebkitMaskPosition: 'center',
                                                                        maskImage: `url(${iconB})`,
                                                                        maskRepeat: 'no-repeat',
                                                                        maskSize: 'contain',
                                                                        maskPosition: 'center',
                                                                        backgroundColor: 'white'
                                                                    }}
                                                                />
                                                                <h3 className="text-xl font-bold mb-3">
                                                                    {nameB}
                                                                </h3>
                                                                <p className="text-base leading-relaxed opacity-95">
                                                                    You also {strengthsMap[nameB].main}.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* Secondary Archetype - only show if no tie */}
                                {!topResult.isTie && (
                                    <div
                                        className="text-white rounded-lg p-4 mb-6"
                                        style={{
                                            backgroundColor: archetypes[secondResult.name].color,
                                            background: `linear-gradient(135deg, ${archetypes[secondResult.name].color}, ${archetypes[secondResult.name].color}dd)`
                                        }}
                                    >
                                        <h3 className="text-lg font-semibold mb-3 text-center">Your Secondary Service Style: {secondResult.name}</h3>

                                        <div className="flex items-center justify-center gap-3">
                                            <img
                                                src={secondIconUrl}
                                                alt={secondResult.name}
                                                className="w-10 h-10 flex-shrink-0"
                                                style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' }}
                                                onError={(e) => console.log('Icon failed to load:', secondIconUrl)}
                                            />
                                            <p className="text-base opacity-90">{archetypes[secondResult.name].description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* PURCHASE BUTTONS SECTION */}
                                {(() => {
                                    // Determine top profiles for purchase logic
                                    const topProfiles = [topResult.name];
                                    if (topResult.isTie && topResult.tiedWith) {
                                        topProfiles.push(...topResult.tiedWith);
                                    }

                                    const isSingleProfile = topProfiles.length === 1;
                                    const is2WayTie = topProfiles.length === 2;
                                    const is3PlusTie = topProfiles.length >= 3;

                                    // Determine which profile to use for checkout
                                    const effectiveSelectedProfile = isSingleProfile
                                        ? topProfiles[0]
                                        : selectedProfileForPurchase;

                                    // Final profile for checkout (no fallback - selection required for ties)
                                    const profileForCheckout = effectiveSelectedProfile;

                                    const handleDeepDiveOnlyPurchase = () => {
                                        setPurchaseError('');

                                        // Require profile selection for ties
                                        if (!isSingleProfile && !effectiveSelectedProfile) {
                                            setPurchaseError('Please choose one style to explore first.');
                                            return;
                                        }

                                        const checkoutUrl = CHECKOUT_URLS[profileForCheckout];

                                        if (!checkoutUrl || checkoutUrl === "PASTE_URL_HERE") {
                                            console.warn('Checkout URL not configured yet.');
                                            setPurchaseError('Checkout is not available yet. Please check back soon!');
                                            return;
                                        }

                                        // Redirect to checkout
                                        window.location.href = checkoutUrl;
                                    };

                                    return (
                                        <div className="mb-8">
                                            {/* Selector UI for 2-way or 3+ ties */}
                                            {(is2WayTie || is3PlusTie) && (
                                                <div className="mb-6">
                                                    <p className="text-gray-700 text-center mb-4">
                                                        <span className="font-medium">Choose the style you want your Deep Dive to focus on.</span>{' '}
                                                        <span className="text-gray-600 text-sm">(Pick the one that fits you best right now.)</span>
                                                    </p>

                                                    <div className="flex flex-col gap-2 max-w-3xl mx-auto">
                                                        {topProfiles.map((profileName) => {
                                                            const profile = profileData[profileName];
                                                            const isSelected = selectedProfileForPurchase === profileName;

                                                            return (
                                                                <label
                                                                    key={profileName}
                                                                    className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-gray-50"
                                                                    style={{
                                                                        borderColor: isSelected ? '#12C4A4' : '#E5E7EB',
                                                                        backgroundColor: isSelected ? '#F0FDF9' : 'white'
                                                                    }}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name="profileSelection"
                                                                        checked={isSelected}
                                                                        onChange={() => {
                                                                            setSelectedProfileForPurchase(profileName);
                                                                            setPurchaseError('');
                                                                        }}
                                                                        className="w-5 h-5 text-[#12C4A4] focus:ring-[#12C4A4] cursor-pointer flex-shrink-0"
                                                                    />
                                                                    <span className="ml-3 font-semibold text-gray-800">{profile.label}</span>
                                                                    <span className="ml-2 text-sm text-gray-600">— {profile.shortTagline}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>

                                                    {purchaseError && (
                                                        <p className="text-red-600 text-sm text-center mt-3">{purchaseError}</p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Text about button */}
                                            <div className="text-center mb-4 max-w-2xl mx-auto px-4">
                                                <p className="text-gray-600 font-medium">
                                                    Your Deep Dive Guide explains your top service profile's strengths, common struggles and practical ways to grow. Start enjoying service more!
                                                </p>
                                            </div>
                                            {/* Download reminder notice */}
                                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-2xl mx-auto">
                                                <p className="text-sm font-semibold text-yellow-800">
                                                    📸 Save Your Results Chart First! Download your free results image (or screenshot) below before purchasing. We cannot retrieve your detailed breakdown later.
                                                </p>
                                            </div>

                                            {/* Purchase Button */}
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={handleDeepDiveOnlyPurchase}
                                                    className="inline-flex flex-col items-center justify-center px-10 py-4 rounded-full font-semibold text-center transition-all duration-200 bg-[#12C4A4] text-white border-2 border-[#12C4A4] hover:bg-[#0fa28a] hover:border-[#0fa28a] shadow-sm hover:shadow-md min-w-[280px]"
                                                >
                                                    <span className="text-lg font-semibold leading-tight">
                                                        Get your Deep Dive Guide</span>
                                                    <span className="text-xl opacity-95 mt-1 font-medium">$14</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Subtle separator */}
                                <div className="flex justify-center mb-4">
                                    <div className="border-t border-dotted border-gray-300 w-32"></div>
                                </div>

                                {/* Important message about saving results */}
                                <div className="text-center mb-4 max-w-2xl mx-auto px-4">
                                    <p className="text-gray-700 text-med">
                                        Enjoy this free download image of your results chart—this page isn't saved and we can't recreate your breakdown results later.
                                    </p>
                                </div>

                                {/* Download link for complete breakdown */}
                                <div className="text-center mb-6">
                                    <button
                                        onClick={() => generateFullBreakdownImage(topResult, allScores)}
                                        className="text-[#12C4A4] hover:text-[#0fa890] font-medium text-sm underline decoration-dotted underline-offset-4 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Image of Your Results Chart (seen below) FREE
                                    </button>
                                </div>

                                {/* tiny preview for full breakdown */}
                                <div className="text-center mb-6 opacity-80">
                                    <img
                                        src={BREAKDOWN_PREVIEW_URL}
                                        alt="Example full breakdown summary"
                                        style={{
                                            maxHeight: '80px',
                                            width: 'auto',
                                            height: '80px',
                                            borderRadius: '4px',
                                            margin: '0 auto',
                                            display: 'block'
                                        }}
                                    />
                                </div>

                                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 mr-2" />
                                    Complete Service Style Breakdown
                                </h3>

                                <div className="grid gap-3">
                                    {Object.entries(allScores)
                                        .sort(([, a], [, b]) => b.percentage - a.percentage)
                                        .map(([archetype, scoreData]) => {
                                            const archetypeIconUrl = archetypes[archetype].iconUrl;
                                            return (
                                                <div
                                                    key={archetype}
                                                    className="flex items-center justify-between p-4 rounded-lg border"
                                                    style={{
                                                        backgroundColor: archetypes[archetype].bgColor,
                                                        borderColor: archetypes[archetype].borderColor
                                                    }}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <div className="flex items-center">
                                                                <img
                                                                    src={archetypeIconUrl}
                                                                    alt={archetype}
                                                                    className="w-5 h-5 mr-2"
                                                                />
                                                                <span className="font-medium text-gray-800">{archetype}</span>
                                                            </div>
                                                            <span className="text-lg font-semibold" style={{ color: '#4d4637' }}>{scoreData.percentage}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                                            <div
                                                                className="h-3 rounded-full transition-all duration-1000"
                                                                style={{
                                                                    width: `${scoreData.percentage}%`,
                                                                    backgroundColor: archetypes[archetype].color
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Understanding Your Service Profile</h4>
                                    <p className="text-gray-700">
                                        Want simple ideas for using your strengths in everyday life? Explore our Care Crew approach or follow us on Instagram at <a href="https://instagram.com/servicestewards_jen" target="_blank" rel="noopener noreferrer" className="text-[#12C4A4] hover:text-[#0fa890] font-medium underline">@servicestewards_jen</a> for weekly Service Stewards inspiration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8 text-xs text-gray-500">
                        © 2025 Service Stewards. Service Style Assessment™. All rights reserved.
                    </div>
                </div>
            );
        }
    }

    // END: RESULTS SECTION / RESULT DISPLAY LOGIC

    // START: LAYOUT / UI COMPONENTS
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="container mx-auto max-w-3xl px-4">
                {/* ADD LOGO HERE */}
                <div className="flex justify-center mb-4">
                    <img
                        src="https://raw.githubusercontent.com/ServiceStewards/service-stewards-quiz-assets/main/SERVICE%20STEWARDS%20logo.png"
                        alt="Service Stewards Logo"
                        className="h-14 sm:h-36 w-auto"
                    />
                </div>
                {/* END LOGO */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <h1 className="text-3xl font-bold" style={{ color: '#4d4637' }}>
                                Service Style Assessment
                            </h1>
                        </div>
                        <p className="text-gray-600 max-w-xl mx-auto px-6 leading-relaxed">
                            {currentQuestion < 3 ? (
                                <>
                                    Discover how you naturally serve others. 
                                    <br />
                                    Don't overthink—go with your gut.
                                    <br />
                                    There's no back button by design.
                                    <br />
                                    If you use your browser's back button, the quiz will restart.
                                </>
                            ) : (
                                "Warning: clicking 'back' in the browser will restart the quiz"
                            )}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">
                                Question {currentQuestion + 1} of {questions.length}
                            </span>
                            <span className="text-sm text-gray-500">
                                {Math.min(95, Math.round(((currentQuestion + 1) / questions.length) * 100))}% Complete
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                                    backgroundColor: '#D1A247'
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            {questions[currentQuestion].question}
                        </h2>

                        {/* Answer Options */}
                        <div className="space-y-3">
                            {questions[currentQuestion].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    className="w-full p-4 text-left rounded-lg border-2 transition-all duration-200"
                                    style={{
                                        borderColor: selectedAnswer === index ? '#D1A247' : '#E5E7EB',
                                        backgroundColor: selectedAnswer === index ? '#FEF3C7' : 'white',
                                        color: selectedAnswer === index ? '#92400E' : '#374151'
                                    }}
                                >
                                    <div className="flex items-start">
                                        <div
                                            className="w-4 h-4 rounded-full border-2 mr-3 mt-1 flex-shrink-0"
                                            style={{
                                                borderColor: selectedAnswer === index ? '#D1A247' : '#D1D5DB',
                                                backgroundColor: selectedAnswer === index ? '#D1A247' : 'transparent'
                                            }}
                                        >
                                            {selectedAnswer === index && (
                                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                            )}
                                        </div>
                                        <span className="font-medium text-sm leading-relaxed">{answer.text}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={selectedAnswer === ''}
                            className="flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white hover:shadow-lg"
                            style={{
                                backgroundColor: selectedAnswer !== '' ? '#D1A247' : '#D1D5DB',
                                color: selectedAnswer !== '' ? 'white' : '#6B7280',
                                cursor: selectedAnswer !== '' ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See My Service Style'}
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 text-xs text-gray-500">
                © 2025 Service Stewards. Service Style Assessment™. All rights reserved.
            </div>
        </div>
    );
    // END: LAYOUT / UI COMPONENTS
};

export default ServiceStewardsQuiz;