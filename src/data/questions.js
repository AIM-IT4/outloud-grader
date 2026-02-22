export const questions = [
    {
        id: 1,
        topic: 'Probability',
        title: 'Biased Coin Variance',
        text: 'A biased coin with probability of heads p = 0.6 is flipped 5 times. You get $10 for every heads. What is the expected value and variance of your payout?',
        keywords: ['expected value', 'variance', 'binomial', 'binomial distribution', 'three', 'thirty', 'twelve', 'twelve dollars', 'n p', 'n p q', '0.24', '1.2'],
        expectedBaseFeedback: "A strong answer should mention the binomial distribution, expected value E[X] = n*p, and variance Var(X) = n*p*(1-p). The payout scales the variance by $10^2 = 100."
    },
    {
        id: 2,
        topic: 'Expected Value',
        title: 'Dice Re-roll Strategy',
        text: 'You roll a fair 6-sided die. You can choose to keep the roll, or pay $1 to reroll it once. What is your optimal strategy and the expected value of this game?',
        keywords: ['optimal', 'three point five', 'four', 'boundary', 'reroll', 'expected value', 'four point two five', '4.25'],
        expectedBaseFeedback: "You should calculate the base EV of a single roll (3.5). Since you pay $1 to reroll, you should only reroll if the current roll is less than the net EV of rerolling (3.5 - 1 = 2.5). So keep 3, 4, 5, 6. Reroll 1, 2."
    },
    {
        id: 3,
        topic: 'Logic',
        title: '100 Prisoners and a Lightbulb',
        text: '100 prisoners are in solitary confinement. The warden will bring one randomly chosen prisoner into a central room with a lightbulb each day. They can toggle it. How do they guarantee everyone has visited the room?',
        keywords: ['counter', 'base case', 'agreed', 'initial state', 'turned on', 'turned off', 'leader', 'ninety nine'],
        expectedBaseFeedback: "The classic solution requires designating one 'counter' prisoner. All others turn the light ON only once if they haven't before. The counter turns it OFF and keeps count until reaching 99."
    }
];
