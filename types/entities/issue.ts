import { Priority } from "../enums/priority";
import { Status } from "../enums/status";
import { IssueLabel } from "./issueLabel";
import { User } from "./user";
import { Link } from "./link";

export interface Issue {
  id: string; // PostgreSQL UUID (internal)
  publicId: string; // User-facing ID like "ISSUE-09" or "BEST-40"

  // Multi-tenant fields
  workspaceId: string; // Foreign key to Workspace (always required)
  teamId?: string; // Foreign key to Team (optional - null if workspace/project-level)
  projectId?: string; // Foreign key to Project (optional)
  milestoneId?: string; // Foreign key to Milestone (optional - only for project issues)

  priority: Priority;
  status: Status;
  title: string;
  description?: string; // Markdown content
  creatorId: string; // Foreign key to User who created the issue
  parentIssueId?: string; // UUID of parent Issue (when this is a sub-issue)
  parentCommentId?: string; // UUID of parent Comment (when created from a comment)
  labels?: IssueLabel[]; // Array of labels (populated via junction table)
  subscribers?: User[]; // Array of subscribed users (populated via junction table)
  favoritedBy?: User[]; // Array of users who favorited this issue (populated via junction table)
  links?: Link[]; // Array of links attached to this issue
  relatedIssues?: Issue[]; // Array of related issues (populated via junction table)
  dueDate?: Date;
  assigneeId?: string; // Foreign key to User who is assigned
  estimation?: number; // 1-6, only for issues in teams with estimation enabled
  createdAt: Date;
  updatedAt: Date;
}