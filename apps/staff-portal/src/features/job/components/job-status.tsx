import { Container, Text } from "@resonance/ui";
import {
  JOB_STATUS_CONFIG,
  JobStatusColor,
  JobStatusValue,
} from "@resonance/ui/job-status";

// Tailwind's scanner needs literal class strings, so a color family from the
// shared config is looked up here rather than interpolated into a class name.
const BG_LIGHT_CLASS: Record<JobStatusColor, string> = {
  warning: "bg-warning-bg-light",
  purple: "bg-purple-bg-light",
  blue: "bg-blue-bg-light",
  "yinmn-blue": "bg-yinmn-blue-bg-light",
  success: "bg-success-bg-light",
  danger: "bg-danger-bg-light",
};

const TEXT_ICON_CLASS: Record<JobStatusColor, string> = {
  warning: "text-warning-text-icons",
  purple: "text-purple-text-icons",
  blue: "text-blue-text-icons",
  "yinmn-blue": "text-yinmn-blue-text-icons",
  success: "text-success-text-icons",
  danger: "text-danger-text-icons",
};

export const JobStatus = ({ status }: { status: string }) => {
  // API sends Title Case with spaces (e.g. "Under Review"), not the config's
  // lowercase-hyphenated keys, so normalize before the lookup rather than
  // crashing on the mismatch.
  const normalized = status
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") as JobStatusValue;
  const config = JOB_STATUS_CONFIG[normalized];

  if (!config) {
    return (
      <Container
        as="span"
        className="rounded-lg px-2 py-1 flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-muted"
      >
        <Text variant="buttonXS" className="text-secondary">
          {status}
        </Text>
      </Container>
    );
  }

  const { label, color, icon: Icon } = config;

  return (
    <Container
      as="span"
      className={`rounded-lg px-2 py-1 flex items-center gap-1.5 shrink-0 whitespace-nowrap ${BG_LIGHT_CLASS[color]}`}
    >
      <Icon className={TEXT_ICON_CLASS[color]} size={20} />
      <Text variant="buttonXS" className={TEXT_ICON_CLASS[color]}>
        {label}
      </Text>
    </Container>
  );
};
