import {
  Microscope,
  TestTube,
  Activity,
  Bone,
  Baby,
  Stethoscope,
  Layers,
  FlaskConical,
  LucideIcon,
} from "lucide-react";

interface DeptMeta {
  Icon: LucideIcon;
  color: string;
  bg: string;
}

// All icons use Mitosis Blue — consistent with logo's runner color
// Backgrounds use the 8% opacity brand blue tint
const BRAND_BLUE  = "#006BB6";
const BRAND_TINT  = "rgba(0,107,182,0.08)";

export const DEPT_ICON_MAP: Record<string, DeptMeta> = {
  "dept-001": { Icon: Activity,     color: BRAND_BLUE,  bg: BRAND_TINT  }, // Imaging & MRI (using Activity/Scan equivalent)
  "dept-002": { Icon: TestTube,     color: BRAND_BLUE,  bg: BRAND_TINT  }, // Pathology
  "dept-003": { Icon: Microscope,   color: BRAND_BLUE,  bg: BRAND_TINT  }, // Microbiology
  "dept-004": { Icon: FlaskConical, color: BRAND_BLUE,  bg: BRAND_TINT  }, // Clinical Pathology
  "dept-005": { Icon: Baby,         color: BRAND_BLUE,  bg: BRAND_TINT  }, // Pediatrics
  "dept-006": { Icon: Stethoscope,  color: BRAND_BLUE,  bg: BRAND_TINT  }, // Gastroenterology
  "dept-007": { Icon: Layers,       color: BRAND_BLUE,  bg: BRAND_TINT  }, // Dermatology
  "dept-008": { Icon: FlaskConical, color: BRAND_BLUE,  bg: BRAND_TINT  }, // Biochemistry
};

// Fallback for unknown departments
export const DEFAULT_DEPT_META: DeptMeta = {
  Icon: Stethoscope,
  color: "#0056B3",
  bg: "#eff6ff",
};

export function getDeptMeta(deptId: string): DeptMeta {
  return DEPT_ICON_MAP[deptId] ?? DEFAULT_DEPT_META;
}
