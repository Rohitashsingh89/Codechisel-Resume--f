export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  solution: {
    language: 'javascript' | 'typescript' | 'python' | 'cpp';
    code: string;
  };
};

export const problems: Problem[] = [
  {
    id: 'even-odd',
    title: 'Check Even or Odd',
    difficulty: 'Easy',
    tags: ['Basic Programming', 'Math'],
    description:
      'Given an integer n, print "Even" if n is divisible by 2, otherwise print "Odd".',
    solution: {
      language: 'javascript',
      code: `function evenOrOdd(n) {
  return n % 2 === 0 ? 'Even' : 'Odd';
}

// Example
console.log(evenOrOdd(4)); // Even
console.log(evenOrOdd(13)); // Odd`,
    },
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Arrays', 'HashMap'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    solution: {
      language: 'javascript',
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    },
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Number',
    difficulty: 'Medium',
    tags: ['DP', 'Math'],
    description:
      'Return the nth Fibonacci number using an iterative approach to achieve O(n) time and O(1) space.',
    solution: {
      language: 'javascript',
      code: `function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    },
  },
  {
    id: 'prime-check',
    title: 'Prime Checker',
    difficulty: 'Medium',
    tags: ['Math', 'Prime Numbers'],
    description:
      'Check if a number n is prime in O(sqrt(n)) by trial division and return true or false.',
    solution: {
      language: 'javascript',
      code: `function isPrime(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}`,
    },
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stacks', 'Strings'],
    description:
      'Given a string s containing brackets, determine if the input string is valid with proper nesting and order.',
    solution: {
      language: 'javascript',
      code: `function isValid(s) {
  const map = { ')': '(', ']': '[', '}': '{' };
  const st = [];
  for (const ch of s) {
    if (ch in map) {
      if (st.pop() !== map[ch]) return false;
    } else {
      st.push(ch);
    }
  }
  return st.length === 0;
}`,
    },
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    tags: ['Arrays', 'Binary Search'],
    description:
      'Search for a target value in a sorted array using binary search and return its index or -1.',
    solution: {
      language: 'javascript',
      code: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
    },
  },
];
