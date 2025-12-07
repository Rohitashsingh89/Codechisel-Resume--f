export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemItem = {
  id: string;
  index: number;
  title: string;
  difficulty: Difficulty;
};

export type Category = {
  id: string;
  title: string;
  count: number;
  problems?: ProblemItem[]; 
};

export type ProblemDetail = {
  id: string;
  title: string;
  description?: string;
  difficulty: Difficulty;
  topics: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  solutions?: {
    html?: string;
  };
  solutionHtml?: string;
};

export const headerData = {
  totalProblems: 150,
};

export const categories: Category[] = [
  {
    id: 'basic-programming',
    title: 'Basic Programming',
    count: 9,
    problems: [
      {
        id: 'p-1',
        index: 1,
        title: 'Teaching a Sibling to Tell Even from Odd',
        difficulty: 'Easy',
      },
      {
        id: 'p-2',
        index: 2,
        title: 'Solving the Prime Mystery in a Programming Contest',
        difficulty: 'Hard',
      },
      {
        id: 'p-3',
        index: 3,
        title: 'Detecting Leap Years While Building a Calendar App',
        difficulty: 'Easy',
      },
      {
        id: 'p-4',
        index: 4,
        title: 'Quickly Summing Natural Numbers for a Math Challenge',
        difficulty: 'Easy',
      },
      {
        id: 'p-5',
        index: 5,
        title: 'Automating Factorial Calculation for Combinatorics',
        difficulty: 'Easy',
      },
      {
        id: 'p-6',
        index: 6,
        title: 'Summing the Digits to Find the Digital Root',
        difficulty: 'Medium',
      },
      {
        id: 'p-7',
        index: 7,
        title: 'Removing Vowels to Find the Essence of a String',
        difficulty: 'Easy',
      },
      {
        id: 'p-8',
        index: 8,
        title: 'Reversing Strings Like a Coding Magician',
        difficulty: 'Easy',
      },
      {
        id: 'p-9',
        index: 9,
        title: 'Counting Character Frequencies to Reveal Patterns',
        difficulty: 'Easy',
      },
      {
        id: 'p-10',
        index: 10,
        title: 'Sorting Arrays to Organize the Chaos',
        difficulty: 'Easy',
      },
    ],
  },
  { id: 'number-theory', title: 'Number Theory', count: 39,
    problems: [
      {
        id: 'p-11',
        index: 11,
        title: 'Teaching a Sibling to Tell Even from Odd',
        difficulty: 'Easy',
      },
      {
        id: 'p-22',
        index: 22,
        title: 'Solving the Prime Mystery in a Programming Contest',
        difficulty: 'Hard',
      },
      {
        id: 'p-33',
        index: 33,
        title: 'Detecting Leap Years While Building a Calendar App',
        difficulty: 'Easy',
      },
      {
        id: 'p-44',
        index: 44,
        title: 'Quickly Summing Natural Numbers for a Math Challenge',
        difficulty: 'Easy',
      },
      {
        id: 'p-66',
        index: 66,
        title: 'Summing the Digits to Find the Digital Root',
        difficulty: 'Medium',
      },
    ],
   },
  { id: 'date-handling', title: 'Date Handling', count: 1 },
  { id: 'mathematics', title: 'Mathematics', count: 1 },
  { id: 'recursion', title: 'Recursion', count: 5 },
  { id: 'strings', title: 'Strings', count: 2 },
  { id: 'math', title: 'Math', count: 0 },
  { id: 'string-manipulation', title: 'String Manipulation', count: 9 },
  { id: 'arrays', title: 'Arrays', count: 10 },
  { id: 'sorting-algorithms', title: 'Sorting Algorithms', count: 1 },
];

export const problemDetails: Record<string, ProblemDetail> = {
  'p-1': {
    id: 'p-1',
    title: 'Teaching a Sibling to Tell Even from Odd',
    difficulty: 'Easy',
    topics: ['Basic Programming'],
    examples: [
      { input: 'number = 4', output: 'Even', explanation: '4 divides evenly by 2, so it is Even.' },
      { input: 'number = 13', output: 'Odd', explanation: '13 does not divide evenly by 2, so it is Odd.' },
      { input: 'number = 0', output: 'Even', explanation: '0 divides evenly by 2, so it is Even.' },
    ],
    solutions: {
      html: `
<pre><code>
// Even or Odd (HTML-friendly demo)
&lt;script&gt;
function evenOrOdd(n){ return n % 2 === 0 ? 'Even' : 'Odd'; }
console.log(evenOrOdd(4));  // Even
console.log(evenOrOdd(13)); // Odd
&lt;/script&gt;
</code></pre>
`
    },
  },
  'p-2': {
    id: 'p-2',
    title: 'Solving the Prime Mystery in a Programming Contest',
    difficulty: 'Hard',
    topics: ['Basic Programming', 'Number Theory'],
    examples: [
      { input: 'number = 4', output: 'Even', explanation: '4 divides evenly by 2, so it is Even.' },
      { input: 'number = 13', output: 'Odd', explanation: '13 does not divide evenly by 2, so it is Odd.' },
      { input: 'number = 0', output: 'Even', explanation: '0 divides evenly by 2, so it is Even.' },
    ],
  },
  'p-6': {
    id: 'p-6',
    title: 'Summing the Digits to Find the Digital Root',
    difficulty: 'Medium',
    topics: ['Basic Programming'],
    examples: [
      { input: 'number = 4', output: 'Even', explanation: '4 divides evenly by 2, so it is Even.' },
      { input: 'number = 13', output: 'Odd', explanation: '13 does not divide evenly by 2, so it is Odd.' },
      { input: 'number = 0', output: 'Even', explanation: '0 divides evenly by 2, so it is Even.' },
    ],
  },
};
