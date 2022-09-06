
const optionList = document.getElementsByClassName('option-btn');
var contentSentence = document.getElementById('contentSentence');
const yearCounter = document.getElementById('yearCounter');
var repCounter = document.getElementById('repCounter');

var currentYear = 0;
var currentRep = 0;

const actions = [
    {
        name: 'Save a cat from a tree.',
        maxRep: 20,
        minRep: 0,
        successMsg: ['People hailed you a hero for saving the cat.', 'The cat purred in delight.', 'The cat yawned and slept in your arms.'],
        failMsg: ['No one noticed.', 'People wrongly shouted at you for "harming" the cat.', 'The cat scratched you after your save attempt.'],
        condition: "currentYear >= 7",
    },
    {
        name: 'Commit a robbery.',
        maxRep: -80,
        minRep: -5,
        successMsg: ['You got away with all the valuables.', 'You escaped the area with expensive electronics.', 'You grabbed an expensive art-piece and sold it on the black-market.'],
        failMsg: ['You got caught but narrowly escaped.', 'The police caught you in middle of the robbery, but you luckily got away.', 'A dog bit you while leaving the vicinity.'],
        condition: "currentYear >= 12",
    },
    {
        name: 'Punch a police officer.',
        maxRep: -40,
        minRep: 30,
        successMsg: ['You ran away from the officer before they could react.', 'The police officer punched you back.', 'A group of people started kicking you.'],
        failMsg: ['People cheered you on as a brawl ensued. You left unscathed.', 'A group of people protected you from the cop as the cop chased you.', 'The cop does nothing and continues eating their donut.'],
        condition: "currentYear >= 12",
    },
    {
        name: 'Walk an old lady down the road.',
        maxRep: 10,
        minRep: -2,
        successMsg: ['The lady smiled at you and said you reminded her of her grandchild.', 'The lady called you a good person.', 'The lady gave you a toffee as a thank you for helping her.'],
        failMsg: ['The lady punched you in the groin and called you a pervert.', 'The old lady punched you in the nose.', 'The old lady called you a kidnapper and ran away.'],
        condition: "null",
    },
    {
        name: 'Tip a waiter more than 20%.',
        maxRep: 15,
        minRep: 5,
        successMsg: ['The waiter thanked you profusely.', 'The waiter did a thank you bow as a token of appreciation.', 'The waiter humbly accepted.'],
        failMsg: ['The waiter glanced at you, then frowned.', 'The waiter told you that you need it more than them.', 'The waiter did not notice the extra tip.'],
        condition: "null",
    },
    {
        name: 'Make racist remarks to someone.',
        maxRep: -30,
        minRep: 10,
        successMsg: ['They were very offended and punched you in the stomach.', 'They called you racist and pelted stones at you.', 'They brought a group of their friends to beat you up.', 'You are ignored, but they are clearly hurt.'],
        failMsg: ['A group of racists invited you to join them for lunch.', 'A group of people near you laugh heartily.', 'People around you smile with glee at your racist remarks.'],
        condition: "null",
    },
    {
        name: 'Text an old friend.',
        maxRep: 20,
        minRep: 0,
        successMsg: ['You exchanged contact info and made plans to meet soon.', 'You had a fun conversation and agreed to keep in touch.', 'You had an insightful catch-up and were invited to their wedding.'],
        failMsg: ['They saw your message and did not reply.', 'They texted back that they did not want to talk with you.', 'They ghosted you.'],
        condition: "null",
    },
    {
        name: 'Listen to Baby Shark in public.',
        maxRep: -10,
        minRep: 5,
        successMsg: ['A group of tweens made fun of you as you walked by them.', 'Someone called you a idiot baby as they passed you.', 'A friend of yours passed by you and immediately un-followed you on Instagram.'],
        failMsg: ['All the toddlers around you started laughing and jumping in joy.', 'A group called the "Cocomelon Crew" thanked you for playing the delightful music.', 'A small 2 year old child ran up to you and hugged your leg.'],
        condition: "currentYear >= 4",
    },
    {
        name: 'Start singing your favorite song loudly in public.',
        maxRep: -15,
        minRep: 14,
        successMsg: ["You heard someone call you 'the worst singer they've ever heard.'"],
        failMsg: ['People start gathering around you and cheer.'],
        condition: "null",
    },
    {
        name: 'Take a peaceful walk in the park.',
        maxRep: 5,
        minRep: -1,
        successMsg: ["You have a very fulfilling walk."],
        failMsg: ['You trip over a rock.'],
        condition: "null",
    },
    {
        name: 'Take candy from a baby.',
        maxRep: -15,
        minRep: 10,
        successMsg: ["The baby started bawling after you took the candy."],
        failMsg: ['The mother of the baby thanks you for stopping the baby from eating the candy.'],
        condition: "currentYear >= 2",
    },
    {
        name: 'Compete in a marathon',
        maxRep: 20,
        minRep: -5,
        successMsg: ["You had a blast at the marathon."],
        failMsg: ['You come in dead last in the marathon.'],
        condition: "null",
    },
    {
        name: 'Kidnap a dog and sell it on the black market.',
        maxRep: -30,
        minRep: -5,
        successMsg: ["You kidnapped a very valuable dog and sold it for a lot."],
        failMsg: ['You accidentally stole a dog plushie instead of a real dog.'],
        condition: "null",
    },
    {
        name: 'Give your seat up on the bus to an old man.',
        maxRep: 10,
        minRep: -2,
        successMsg: ["The old man graciously accepts with a smile."],
        failMsg: ['The old man rudely declines and calls you ageist.'],
        condition: "currentYear >= 7 && currentYear <= 60",
    },
    {
        name: 'Meet a crime boss.',
        maxRep: -30,
        minRep: -5,
        successMsg: ["The crime boss talked to you about a possible future at their organization.", "The crime boss was pleased with your initiative in meeting him.", "The crime boss asked you to 'Expect a call from them' after the meet."],
        failMsg: ["The crime boss refused to meet with you.", "The crime boss called you a 'Pathetic wimp' and refused to even look at you.", "The crime lord showed up to the meeting, threatened you, then left."],
        condition: "currentRep <= -200 && currentYear >= 22",
    }
];

function incrementYear() {
    currentYear++;

    yearCounter.innerText = "Year: " + currentYear;
    yearActions = [];
    
    yearActions.push(selectAction(yearActions));
    yearActions.push(selectAction(yearActions));
    yearActions.push(selectAction(yearActions));
    yearActions.push(selectAction(yearActions));

    for (let index = 0; index < yearActions.length; index++) {
        var action = yearActions[index];
        
        optionList[index].innerText = action.name;
        action.maxRep > 0 ? optionList[index].style.backgroundColor = 'var(--positive)' : optionList[index].style.backgroundColor = 'var(--negative)';
        optionList[index].className = optionList[index].className.split(" ")[0];
        optionList[index].classList.add(actions.lastIndexOf(action));
    }
}

function selectAction(yearActions) {

    var randNum = Math.floor(Math.random() * actions.length);

    var selectedAction = actions[randNum];

    if (eval(selectedAction.condition) != true && eval(selectedAction.condition) != null) {
        selectedAction = selectAction(yearActions);
    }

    return yearActions.includes(selectedAction) ? selectAction(yearActions) : selectedAction;
}

for (let optionIndex = 0; optionIndex < optionList.length; optionIndex++) {
    let option = optionList[optionIndex];

    option.addEventListener('click', function() {

        if (currentYear == 0) {
            incrementYear();
            contentSentence.innerText = "Click the option you prefer."
            return;
        }

        let selectedOption = parseInt(option.className.split(" ")[1]);

        let effectiveReputation = getRandomNumber(actions[selectedOption].maxRep, actions[selectedOption].minRep);

        currentRep += effectiveReputation;
        repCounter.innerText = "Reputation: " + currentRep;

        if (effectiveReputation < 0) {
            repCounter.style.color = "var(--negative)";
            repCounter.innerText = repCounter.innerText + " (" + effectiveReputation + ")";
            setTimeout(function () {
                repCounter.style.color = "black";
                repCounter.innerText = "Reputation: " + currentRep;
            }, 700);
        }
        else {
            repCounter.style.color = "var(--positive)";
            repCounter.innerText = repCounter.innerText + " (+" + effectiveReputation + ")";
            setTimeout(function () {
                repCounter.style.color = "black";
                repCounter.innerText = "Reputation: " + currentRep;
            }, 700);
        }

        let repOutput = getClosestNumber(effectiveReputation, actions[selectedOption].maxRep, actions[selectedOption].minRep);

        if (repOutput == actions[selectedOption].maxRep) {
            contentSentence.innerText = actions[selectedOption].successMsg[Math.ceil(Math.random() * actions[selectedOption].successMsg.length) - 1];
        }
        else {
            contentSentence.innerText = actions[selectedOption].failMsg[Math.ceil(Math.random() * actions[selectedOption].failMsg.length) - 1];
        }

        incrementYear();
    });
}

function getClosestNumber(num, max, min) {
    const counts = [min, max];
    const output = counts.reduce((prev, curr) => Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);

    return output;
}

function getRandomNumber(max, min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
