export type Thought = {
  id: string;
  text: string;
  state: 'kept' | 'unfinished';
  period: 'Today' | 'Earlier';
};

export type DemoExample = Readonly<{ id: string; rough: string; refined: string }>;

// Synthetic thoughts with observed production Refine outputs. The public
// demonstration rotates deterministically and never calls a model.
export const heroExamples: readonly DemoExample[] = [
  {
    id: 'followup',
    rough: 'before sending another draft ask whats still unclear maybe a quick conversation would help',
    refined: "Before sending another draft, ask what's still unclear. Maybe a quick conversation would help",
  },
  {
    id: 'engineering',
    rough: 'user loses everything if upload fails keep what they typed show clear error let them retry',
    refined: 'User loses everything if upload fails. Keep what they typed. Show clear error. Let them retry.',
  },
  {
    id: 'product-design',
    rough: 'people may miss the required fields show whats missing before they submit',
    refined: "People may miss the required fields. Show what's missing before they submit.",
  },
  {
    id: 'break',
    rough: 'maybe go for a walk after lunch leave the phone at home for a while',
    refined: 'Maybe go for a walk after lunch. Leave the phone at home for a while.',
  },
];

// Steps and retrieval continue the first thought from the hero.
export const demoExample = heroExamples[0];

// Fictional background work, not a user's ChatGPT project or model response.
export const workspaceExample = {
  project: 'Workshop',
  title: 'Reviewing the proposal',
  prompt: 'What should I check before sharing the next draft of this proposal?',
  reply: 'A useful final pass is to check these three things:',
  suggestions: [
    'Is the main idea clear from the start?',
    'Does the example make it easier to understand?',
    'Is the next step easy to find?',
  ],
  otherChats: ['A simpler introduction', 'Questions for the next meeting'],
} as const;

export const thoughts: Thought[] = [
  { id: 'proposal', text: `Follow-up thought\n${demoExample.refined}`, state: 'kept', period: 'Today' },
  { id: 'weekend', text: 'A slower weekend\nLeave an afternoon free. Take a walk, see where it goes.', state: 'kept', period: 'Today' },
  { id: 'engineering', text: `upload recovery\n${heroExamples[1].rough}`, state: 'unfinished', period: 'Today' },
  { id: 'product-design', text: `form feedback\n${heroExamples[2].rough}`, state: 'unfinished', period: 'Today' },
  { id: 'article', text: 'an idea to come back to\ntools that disappear after the job is done', state: 'unfinished', period: 'Earlier' },
];
