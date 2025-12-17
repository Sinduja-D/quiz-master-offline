const detectiveCases = [
{
id: 1,
title: "The Dead Plant",
level: "Beginner",
subject: "Biology",
story: "A plant kept inside a closed room died within a week even though it was watered daily.",
questions: [
{
q: "Which process helps plants make food?",
options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
answer: 1,
hint: "Uses sunlight"
},
{
q: "Which gas is needed for photosynthesis?",
options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
answer: 2,
hint: "Taken from air"
},
{
q: "Which part of plant absorbs sunlight?",
options: ["Roots", "Stem", "Leaves", "Flower"],
answer: 2,
hint: "Contains chlorophyll"
},
{
q: "What happens if light is absent?",
options: ["Food made", "Plant grows fast", "No photosynthesis", "More oxygen"],
answer: 2,
hint: "Energy source missing"
}
],
finalAnswer: "The plant died due to lack of sunlight, so photosynthesis could not occur."
}
];


export default detectiveCases;