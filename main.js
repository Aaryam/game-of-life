
const optionList = document.getElementsByClassName('option-btn');
const contentSentence = document.getElementById('contentSentence');
const yearCounter = document.getElementById('yearCounter');
const repCounter = document.getElementById('repCounter');
const bankCounter = document.getElementById('bankCounter');
const jobTitle = document.getElementById('jobTitle');

var currentYear = 0;
var currentRep = 0;

var intelligence = getRandomNumber(10, 1);
var notoriety = getRandomNumber(5, 0);
var bank = 0;

var currentJob = {
    company: 'School',
    title: 'Student',
    salary: 0,
    turnover: '0 != 0',
    intelligenceAmount: 0,
};

const actions = [
    {
        name: 'Save a cat from a tree.',
        maxRep: 20,
        minRep: 0,
        successMsg: ['People hailed you a hero for saving the cat.', 'The cat purred in delight.', 'The cat yawned and slept in your arms.'],
        failMsg: ['No one noticed.', 'People wrongly shouted at you for "harming" the cat.', 'The cat scratched you after your save attempt.'],
        condition: "currentYear >= 7",
        successFunction: "",
    },
    {
        name: 'Commit a robbery.',
        maxRep: -80,
        minRep: -5,
        successMsg: ['You got away with all the valuables.', 'You escaped the area with expensive electronics.', 'You grabbed an expensive art-piece and sold it on the black-market.'],
        failMsg: ['You got caught but narrowly escaped.', 'The police caught you in middle of the robbery, but you luckily got away.', 'A dog bit you while leaving the vicinity.'],
        condition: "currentYear >= 12",
        successFunction: "intelligence += 5",
    },
    {
        name: 'Punch a police officer.',
        maxRep: -40,
        minRep: 30,
        successMsg: ['You ran away from the officer before they could react.', 'The police officer punched you back.', 'A group of people started kicking you.'],
        failMsg: ['People cheered you on as a brawl ensued. You left unscathed.', 'A group of people protected you from the cop as the cop chased you.', 'The cop does nothing and continues eating their donut.'],
        condition: "currentYear >= 12",
        successFunction: "",
    },
    {
        name: 'Walk an old lady down the road.',
        maxRep: 10,
        minRep: -2,
        successMsg: ['The lady smiled at you and said you reminded her of her grandchild.', 'The lady called you a good person.', 'The lady gave you a toffee as a thank you for helping her.'],
        failMsg: ['The lady punched you in the groin and called you a pervert.', 'The old lady punched you in the nose.', 'The old lady called you a kidnapper and ran away.'],
        condition: "null",
        successFunction: "",
    },
    {
        name: 'Tip a waiter more than 20%.',
        maxRep: 15,
        minRep: 5,
        successMsg: ['The waiter thanked you profusely.', 'The waiter did a thank you bow as a token of appreciation.', 'The waiter humbly accepted.'],
        failMsg: ['The waiter glanced at you, then frowned.', 'The waiter told you that you need it more than them.', 'The waiter did not notice the extra tip.'],
        condition: "bank >= 40",
        successFunction: "bank -= getRandomNumber(40, 20)",
    },
    {
        name: 'Make racist remarks to someone.',
        maxRep: -30,
        minRep: 10,
        successMsg: ['They were very offended and punched you in the stomach.', 'They called you racist and pelted stones at you.', 'They brought a group of their friends to beat you up.', 'You are ignored, but they are clearly hurt.'],
        failMsg: ['A group of racists invited you to join them for lunch.', 'A group of people near you laugh heartily.', 'People around you smile with glee at your racist remarks.'],
        condition: "null",
        successFunction: "",
    },
    {
        name: 'Text an old friend.',
        maxRep: 20,
        minRep: 0,
        successMsg: ['You exchanged contact info and made plans to meet soon.', 'You had a fun conversation and agreed to keep in touch.', 'You had an insightful catch-up and were invited to their wedding.'],
        failMsg: ['They saw your message and did not reply.', 'They texted back that they did not want to talk with you.', 'They ghosted you.'],
        condition: "null",
        successFunction: "",
    },
    {
        name: 'Listen to Baby Shark in public.',
        maxRep: -10,
        minRep: 5,
        successMsg: ['A group of tweens made fun of you as you walked by them.', 'Someone called you a idiot baby as they passed you.', 'A friend of yours passed by you and immediately un-followed you on Instagram.'],
        failMsg: ['All the toddlers around you started laughing and jumping in joy.', 'A group called the "Cocomelon Crew" thanked you for playing the delightful music.', 'A small 2 year old child ran up to you and hugged your leg.'],
        condition: "currentYear >= 4",
        successFunction: "intelligence -= 1",
    },
    {
        name: 'Start singing your favorite song loudly in public.',
        maxRep: -15,
        minRep: 14,
        successMsg: ["You heard someone call you 'the worst singer they've ever heard.'"],
        failMsg: ['People start gathering around you and cheer.'],
        condition: "null",
        successFunction: "",
    },
    {
        name: 'Take a peaceful walk in the park.',
        maxRep: 5,
        minRep: -1,
        successMsg: ["You have a very fulfilling walk."],
        failMsg: ['You trip over a rock.'],
        condition: "null",
        successFunction: "intelligence += 1",
    },
    {
        name: 'Take candy from a baby.',
        maxRep: -15,
        minRep: 10,
        successMsg: ["The baby started bawling after you took the candy."],
        failMsg: ['The mother of the baby thanks you for stopping the baby from eating the candy.'],
        condition: "currentYear >= 2",
        successFunction: "",
    },
    {
        name: 'Compete in a marathon',
        maxRep: 20,
        minRep: -5,
        successMsg: ["You had a blast at the marathon."],
        failMsg: ['You come in dead last in the marathon.'],
        condition: "null",
        successFunction: "",
    },
    {
        name: 'Kidnap a dog and sell it on the black market.',
        maxRep: -30,
        minRep: -5,
        successMsg: ["You kidnapped a very valuable dog and sold it for a lot."],
        failMsg: ['You accidentally stole a dog plushie instead of a real dog.'],
        condition: "null",
        successFunction: "",
    },
    {
        name: 'Give your seat up on the bus to an old man.',
        maxRep: 10,
        minRep: -2,
        successMsg: ["The old man graciously accepts with a smile."],
        failMsg: ['The old man rudely declines and calls you ageist.'],
        condition: "currentYear >= 7 && currentYear <= 60",
        successFunction: "",
    },
    {
        name: 'Meet a crime boss.',
        maxRep: -30,
        minRep: -5,
        successMsg: ["The crime boss hired you to be a hitman for the mafia."],
        failMsg: ["The crime boss refused to meet with you.", "The crime boss called you a 'Pathetic wimp' and refused to even look at you.", "The crime lord showed up to the meeting, threatened you, then left."],
        condition: "currentRep <= -200 && currentYear >= 22 && currentJob.title == 'Unemployed'",
        successFunction: "currentJob = {company: 'Mafia',title: 'Hitman',salary: 200000,turnover: 'getRandomNumber(0, 10) >= 7',intelligenceAmount: 0,}",
    },
    {
        name: 'Find a job.',
        maxRep: 50,
        minRep: -10,
        successMsg: ["You found a job!"],
        failMsg: ["You could not find a job."],
        condition: "(currentJob.company == 'School' || currentJob.company == 'Unemployed') && currentYear >= 18 && intelligence >= 10",
        successFunction: "currentJob = findJob();",
    },
    {
        name: 'Have an intellectual conversation.',
        maxRep: 5,
        minRep: -2,
        successMsg: ["You had an insightful conversation."],
        failMsg: ["You did not understand a thing that was said to you."],
        condition: "",
        successFunction: "intelligence += getRandomNumber(5, 1)",
    },
    {
        name: 'Kill a rival gang leader.',
        maxRep: -100,
        minRep: -20,
        successMsg: ["You killed the gang leader."],
        failMsg: ["You failed to kill the leader."],
        condition: "currentJob.company == 'Mafia'",
        successFunction: "notoriety += 10",
    },
    {
        name: 'Steal a car for the Mafia.',
        maxRep: -30,
        minRep: -20,
        successMsg: ["You stole a BMW for the Mafia", "You stole a Honda Civic for the Mafia.", "You stole a Porsche for the Mafia."],
        failMsg: ["You nearly got caught, but escaped."],
        condition: "currentJob.company == 'Mafia'",
        successFunction: "notoriety += 2",
    },
];

const jobList = [
    {
        company: 'Google',
        title: 'Programmer',
        salary: getRandomNumber(120000, 100000),
        turnover: 'getRandomNumber(0, 10) >= 8',
        intelligenceAmount: 100,
    },
    {
        company: 'Microsoft',
        title: 'Systems Engineer',
        salary: getRandomNumber(150000, 110000),
        turnover: 'getRandomNumber(0, 10) >= 9',
        intelligenceAmount: 100,
    },
    {
        company: 'Dell',
        title: 'Hardware Specialist',
        salary: getRandomNumber(95000, 90000),
        turnover: 'getRandomNumber(0, 10) >= 9',
        intelligenceAmount: 100,
    },
    {
        company: 'Harvard University',
        title: 'Professor',
        salary: getRandomNumber(90000, 80000),
        turnover: 'getRandomNumber(0, 10) >= 9',
        intelligenceAmount: 120,
    },
    {
        company: 'Modern Apes School',
        title: 'Physics Teacher',
        salary: getRandomNumber(45000, 40000),
        turnover: 'getRandomNumber(0, 10) >= 6',
        intelligenceAmount: 50,
    },
    {
        company: 'Condé Nast Traveller',
        title: 'Editor',
        salary: getRandomNumber(120000, 100000),
        turnover: 'getRandomNumber(0, 10) >= 7',
        intelligenceAmount: 60,
    },
    {
        company: 'Common Construction',
        title: 'Construction Worker',
        salary: getRandomNumber(40000, 30000),
        turnover: 'getRandomNumber(0, 10) >= 2',
        intelligenceAmount: 10,
    },
    {
        company: 'Bienvenue Architects',
        title: 'Architect',
        salary: getRandomNumber(100000, 90000),
        turnover: 'getRandomNumber(0, 10) >= 9',
        intelligenceAmount: 80,
    },
    {
        company: 'Starkstein & Proctor Law',
        title: 'Attorney',
        salary: getRandomNumber(120000, 90000),
        turnover: 'getRandomNumber(0, 10) >= 7',
        intelligenceAmount: 70,
    },
];

function findJob() {
    var randNum = Math.floor(Math.random() * jobList.length);

    var selectedJob = jobList[randNum];

    if (eval(selectedJob.intelligenceAmount) >= intelligence) {
        return findJob();
    }

    contentSentence.innerText = "You found a job at " + selectedJob.company + " as a " + selectedJob.title + ".";

    return selectedJob;
}

function incrementYear() {
    currentYear++;

    bank += currentJob.salary;

    if (bank >= 10000) {
        bank -= 10000;
    }
    else {
        bank = 0;
    }
    intelligence += 1;

    if (currentJob.title != 'Unemployed') {
        jobTitle.innerText = currentJob.title + " at " + currentJob.company;
    }

    if (eval(currentJob.turnover)) {
        currentJob = {
            company: 'Unemployed',
            title: 'Unemployed',
            salary: 0,
            turnover: '0 != 0',
            intelligenceAmount: 0,
        }

        jobTitle.innerText = 'Unemployed';
    }

    yearCounter.innerText = "Year: " + currentYear;
    bankCounter.innerText = "Bank: " + bank;
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
            eval(actions[selectedOption].successFunction);
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
