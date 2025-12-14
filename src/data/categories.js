import {
  Heart, Sprout, Rocket, Users, Trophy, TrendingDown, Sun,
  Handshake, BookOpen, Smile, Leaf, UserCheck,
  Mountain, Palette, FlaskConical, Brain, Plane, Eye, Crown, Clock
} from 'lucide-react';

export const categories = [
  // Original 12
  { name: 'Love', icon: Heart, desc: 'Romance & Relationships' },
  { name: 'Life', icon: Sprout, desc: 'Wisdom for Living' },
  { name: 'Motivation', icon: Rocket, desc: 'Inspiration' },
  { name: 'Family', icon: Users, desc: 'Bonds & Kinship' },
  { name: 'Success', icon: Trophy, desc: 'Achievement' },
  { name: 'Failure', icon: TrendingDown, desc: 'Learning Moments' },
  { name: 'Positivity', icon: Sun, desc: 'Good Vibes' },
  { name: 'Friendship', icon: Handshake, desc: 'Companionship' },
  { name: 'Wisdom', icon: BookOpen, desc: 'Deep Thoughts' },
  { name: 'Humor', icon: Smile, desc: 'Laughs' },
  { name: 'Self-Love', icon: UserCheck, desc: 'Acceptance' },
  { name: 'Growth', icon: Leaf, desc: 'Development' },

  // New 8
  { name: 'Nature', icon: Mountain, desc: 'Beauty of Earth' },
  { name: 'Art', icon: Palette, desc: 'Creativity & Expression' },
  { name: 'Science', icon: FlaskConical, desc: 'Discovery & Truth' },
  { name: 'Philosophy', icon: Brain, desc: 'Reason & Existence' },
  { name: 'Travel', icon: Plane, desc: 'Adventure & Exploration' },
  { name: 'Mindfulness', icon: Eye, desc: 'Awareness & Presence' },
  { name: 'Leadership', icon: Crown, desc: 'Guidance & Influence' },
  { name: 'Time', icon: Clock, desc: 'Moments & Memories' }
];

export const getCategoryIcon = (name) => {
  const cat = categories.find(c => c.name === name);
  return cat ? cat.icon : BookOpen;
};
