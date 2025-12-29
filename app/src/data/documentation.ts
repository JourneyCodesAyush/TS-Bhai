interface DocSection {
  title: string;
  description: string;
  examples: string[];
}

export const documentation: DocSection[] = [
  {
    title: "Variables",
    description: `Variables can be declared using bhai ye hai. Playground supports basic assignments only.`,
    examples: [
      `bhai ye hai a = 10;
bhai ye hai b = 5;

a = a + 3;
b = b - 2;
a = a * b;
b = b / 3;

bol bhai a, b;  // Prints the updated values`,
    ],
  },
  {
    title: "Types",
    description: `Numbers and Strings like other well known languages. Null values are denoted by nalla, and boolean values are sahi (true) and galat (false).
    Variables are initialized to 'nalla' implicitly. (Defining variables to 'nalla' explicitly will throw error in PlayGround)`,
    examples: [
      `bhai ye hai string = "hello bhai";
bhai ye hai number = 14.0;
bhai ye hai boolean_value_true = sahi;
bhai ye hai boolean_value_false = galat;
bhai ye hai null_value = nalla;`,
    ],
  },
  {
    title: "Built-ins",
    description: `Use bol bhai to print anything to the console. Supports printing multiple variables at once.`,
    examples: [
      `bhai ye hai a = 10;
bhai ye hai b = 20;

// Single variable
bol bhai a;

// Multiple variables
bol bhai "Values are:", a, b;`,
    ],
  },
  {
    title: "Conditionals",
    description: `JavaBhaiLang supports if-else-if-else ladder using agar bhai, nahi to bhai, and warna bhai.`,
    examples: [
      `bhai ye hai score = 75;

agar bhai (score >= 90) {
    bol bhai "Topper bhai!";
} nahi to bhai (score >= 60) {
    bol bhai "Pass hogaya bhai!";
} warna bhai {
    bol bhai "Thoda padh le bhai.";
}`,
    ],
  },
  {
    title: "Loops",
    description: `Statements inside jab tak bhai are executed until the condition evaluates to sahi. Loop terminates when condition becomes galat.`,
    examples: [
      `bhai ye hai a = 0;
jab tak bhai (a < 10) {
      a = a + 1;
      agar bhai (a == 5) {
            bol bhai "andar se bol bhai 5";
      }
      agar bhai (a == 6) {
            bol bhai "andar se bol bhai 6";
      }
      bol bhai a;
}
bol bhai "done";`,
    ],
  },
  {
    title: "Break & Continue",
    description: `Use agla dekh bhai to continue a loop and bas kar bhai to break a loop.`,
    examples: [
      `bhai ye hai counter = 0;

jab tak bhai (counter < 10) {
      counter = counter + 1;

      agar bhai (counter == 3) {
            bol bhai "Skipping 3, counter:", counter;
            agla dekh bhai;
      }

      agar bhai (counter == 7) {
            bol bhai "Stop at 7, counter:", counter;
            bas kar bhai;
      }

      bol bhai counter;
}

bol bhai "Loop finished!";`,
    ],
  },
];
