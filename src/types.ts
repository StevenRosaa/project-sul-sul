export type PieMenuAction = {
  label: string;
  onClick: () => void;
  /** * Optional: Specific variant for the action, 
   * useful for applying different colors or icons (e.g., Sims 3 interaction categories) 
   */
  variant?: "romantic" | "friendly" | "funny"; 
};