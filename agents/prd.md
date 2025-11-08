# PRD Writing Instructions for AI Agents

## Purpose

This document provides instructions for writing high-quality Product Requirements Documents (PRDs) in markdown format. PRDs serve as the single source of truth for product development, communicating what to build, why it matters, and how success will be measured.

## Core Principles

1. **Clarity over cleverness**: Write clearly and directly. Avoid jargon unless necessary.
2. **User-centric**: Always start with user problems and needs, not solutions.
3. **Actionable**: Every requirement should be implementable by engineers.
4. **Measurable**: Success criteria must be quantifiable.
5. **Complete but concise**: Include all necessary information without fluff.

## Required Document Structure

Every PRD must include these sections in order:

### 1. Frontmatter (YAML)

```yaml
---
title: [Clear, descriptive title]
date: YYYY-MM-DD
tags: [prd, feature-name, category]
---
```

### 2. Overview (2-4 paragraphs)

- **Problem statement**: What user problem does this solve?
- **Context**: Why is this important now?
- **High-level solution**: One-sentence summary of the approach
- **Scope**: What's included and explicitly excluded

### 3. Objectives (3-7 bullet points)

- Start with action verbs (Enable, Improve, Reduce, etc.)
- Be specific and measurable
- Focus on outcomes, not features
- Example: "Reduce user onboarding time from 5 minutes to under 2 minutes"

### 4. User Stories & Personas

- List primary user personas affected
- Include 3-5 user stories in format: "As a [persona], I want [goal] so that [benefit]"
- Prioritize stories (Must Have, Should Have, Nice to Have)

### 5. Core Features

Break down into logical feature groups. For each feature:

- **Feature name** (as H3 heading)
- **Description**: What it does in 2-3 sentences
- **User value**: Why users care
- **Acceptance criteria**: 3-7 bullet points defining "done"
- **Edge cases**: Important scenarios to handle

### 6. Technical Requirements

- **Architecture considerations**: High-level technical approach
- **Performance requirements**: Load times, response times, capacity
- **Integration points**: APIs, third-party services, data sources
- **Security & privacy**: Authentication, data handling, compliance
- **Browser/platform support**: Compatibility requirements

### 7. Success Criteria

- **Primary metrics**: 3-5 key metrics with targets
- **Secondary metrics**: Supporting indicators
- **Timeline**: When to measure (e.g., "30 days post-launch")
- Format: "Metric name: [baseline] → [target]"

### 8. Non-Goals (Optional but Recommended)

- Explicitly state what's out of scope
- Prevents scope creep
- Example: "This PRD does not include mobile app support"

## Optional Sections (Include When Relevant)

### Design & UX Considerations
- Key user flows
- Wireframe references
- Design system components to use
- Accessibility requirements

### Dependencies
- Other features/products this depends on
- External services or APIs required
- Data migrations needed

### Risks & Mitigations
- Technical risks
- User adoption risks
- Timeline risks
- Mitigation strategies

### Future Considerations
- Planned enhancements (v2, v3)
- Scalability considerations
- Technical debt to address later

## Markdown Formatting Guidelines

### Headings
- Use H1 (#) only for the main title
- Use H2 (##) for major sections
- Use H3 (###) for subsections and features
- Use H4 (####) sparingly for nested details

### Lists
- Use bullet points (-) for unordered lists
- Use numbered lists (1.) for ordered sequences (e.g., user flows)
- Use checkboxes (- [ ]) for acceptance criteria or task lists

### Code & Technical Details
- Use inline code (`) for technical terms, file names, API endpoints
- Use code blocks (```) for:
  - API request/response examples
  - Configuration examples
  - SQL queries
  - Code snippets

### Emphasis
- Use **bold** for important terms and key concepts
- Use *italic* for emphasis or definitions
- Avoid overusing emphasis

### Tables
Use tables for:
- Feature comparison matrices
- Metric baselines and targets
- User persona attributes

### Links
- Link to external references, design files, or related PRDs
- Use descriptive link text, not raw URLs

## Writing Best Practices

### Language & Tone
- Write in present tense ("The system displays..." not "The system will display...")
- Use active voice ("Users can upload files" not "Files can be uploaded by users")
- Be specific: "Users can upload files up to 10MB" not "Users can upload files"

### User-Centric Language
- Focus on user actions and outcomes
- Avoid internal jargon (e.g., "backend service" → "system")
- Use "users" not "customers" unless specifically referring to paying customers

### Clarity
- One idea per paragraph
- Use short sentences (15-20 words average)
- Break up long sections with subheadings
- Use examples to illustrate complex concepts

### Completeness
- Every feature needs acceptance criteria
- Every requirement needs rationale
- Every metric needs a baseline and target
- Address edge cases explicitly

## Common Mistakes to Avoid

1. **Solution-first thinking**: Don't start with "Build a dashboard" - start with "Users need visibility into..."
2. **Vague requirements**: "Make it fast" → "Page load time under 2 seconds"
3. **Missing context**: Always explain the "why" behind requirements
4. **Over-specification**: Don't prescribe exact UI elements - describe behavior
5. **Under-specification**: "Handle errors gracefully" → "Display user-friendly error message with retry option"
6. **Ignoring edge cases**: Address empty states, error states, and boundary conditions
7. **Unmeasurable success**: "Improve user satisfaction" → "Increase NPS from 40 to 55"

## Example PRD Structure Template

```markdown
---
title: [Feature Name]
date: YYYY-MM-DD
tags: [prd, feature-name]
---

# [Feature Name]

## Overview

[Problem statement and context - 2-4 paragraphs]

## Objectives

- [Objective 1 - specific and measurable]
- [Objective 2]
- [Objective 3]

## User Stories & Personas

### Primary Personas
- [Persona 1]: [Description]
- [Persona 2]: [Description]

### User Stories
- **Must Have**: As a [persona], I want [goal] so that [benefit]
- **Should Have**: As a [persona], I want [goal] so that [benefit]
- **Nice to Have**: As a [persona], I want [goal] so that [benefit]

## Core Features

### Feature 1: [Name]

**Description**: [What it does]

**User Value**: [Why users care]

**Acceptance Criteria**:
- [ ] [Specific, testable criterion]
- [ ] [Another criterion]

**Edge Cases**:
- [Scenario 1]: [How to handle]
- [Scenario 2]: [How to handle]

### Feature 2: [Name]
[Same structure as above]

## Technical Requirements

### Architecture
[High-level technical approach]

### Performance
- [Requirement 1]
- [Requirement 2]

### Integration Points
- [API/service 1]
- [API/service 2]

### Security & Privacy
- [Requirement 1]
- [Requirement 2]

### Browser/Platform Support
- [Browser/platform requirements]

## Success Criteria

### Primary Metrics
- **Metric 1**: [Baseline] → [Target] (measured [when])
- **Metric 2**: [Baseline] → [Target] (measured [when])

### Secondary Metrics
- [Metric 1]
- [Metric 2]

## Non-Goals

- [Out of scope item 1]
- [Out of scope item 2]

## Future Considerations

- [Future enhancement 1]
- [Future enhancement 2]
```

## Quality Checklist

Before finalizing a PRD, verify:

- [ ] Frontmatter includes title, date, and tags
- [ ] Overview clearly states the problem and solution
- [ ] Objectives are specific and measurable
- [ ] User stories are included and prioritized
- [ ] Each feature has acceptance criteria
- [ ] Technical requirements are specified
- [ ] Success criteria include baselines and targets
- [ ] Non-goals are explicitly stated
- [ ] Markdown formatting is consistent
- [ ] No internal jargon or unclear terms
- [ ] Edge cases are addressed
- [ ] Links and references are included where relevant

## Additional Notes

- PRDs are living documents - update them as requirements evolve
- Keep PRDs focused on a single feature or cohesive set of features
- If a PRD exceeds 2000 words, consider splitting into multiple PRDs
- Include visual aids (diagrams, flowcharts) when they add clarity
- Reference related PRDs, design documents, or research when relevant

---

**Remember**: A great PRD enables engineers to build the right thing, helps stakeholders understand what's being built, and provides a clear framework for measuring success.

