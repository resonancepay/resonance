// Mirrors staff-portal/admin-portal's CHECKLIST_OPTIONS — same catalog, so
// the slug IDs the job checklist returns (e.g. "clean-lobby-glass") resolve
// to the same human-readable labels across all three apps.
export const CHECKLIST_OPTIONS = [
  { id: "clean-lobby-glass", label: "Clean lobby glass" },
  { id: "vacuum-hallway-carpet", label: "Vacuum hallway carpet" },
  { id: "polish-lift-interior", label: "Polish lift interior" },
  { id: "dust-artificial-flowers", label: "Dust all artificial flowers" },
  {
    id: "clean-coffee-stain-reception-couch",
    label: "Clean coffee stain on reception couch",
  },
  { id: "clean-underneath-tables", label: "Clean underneath the tables" },
  { id: "clear-office-pantry", label: "Clear out the office pantry" },
  { id: "clean-kitchen-cabinets", label: "Clean kitchen cabinets" },
  { id: "dust-artworks", label: "Dust the artworks" },
  { id: "dust-chandeliers", label: "Dust the chandeliers" },
  { id: "polish-leather-chairs", label: "Polish the leather chairs" },
];

export const checklistLabelFor = (item: string) =>
  CHECKLIST_OPTIONS.find((option) => option.id === item)?.label ?? item;
