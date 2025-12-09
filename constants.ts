import { Feature, Step } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Upload Collection",
    description: "Drag and drop your Postman Collection JSON. We parse the structure instantly.",
    codeSnippet: "$ mcp-gen import ./api-collection.json\n> Parsing endpoints...\n> Found 12 routes."
  },
  {
    id: 2,
    title: "AI-Strict Validation",
    description: "Our engine checks for schema consistency, auth types, and parameter definitions.",
    codeSnippet: "> Validating schemas...\n> Warn: Missing 'User-Agent' in headers.\n> Fix applied automatically."
  },
  {
    id: 3,
    title: "Generate Code & Docker",
    description: "Production-ready Python FastMCP code and Dockerfiles generated in milliseconds.",
    codeSnippet: "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP(\"My API\")\n@mcp.tool()\ndef get_user(id: str): ..."
  },
  {
    id: 4,
    title: "Auto-Deploy",
    description: "Push directly to Cloud Run or your preferred container registry with one click.",
    codeSnippet: "$ docker build -t mcp-server .\n$ gcloud run deploy --source .\n> Service URL: https://mcp-x82.run.app"
  },
  {
    id: 5,
    title: "Dashboard Access",
    description: "Monitor logs, test tools, and manage your live MCP server immediately.",
    codeSnippet: "> Server Active.\n> Dashboard available at /dashboard\n> Listening on port 8080"
  }
];

export const FEATURES: Feature[] = [
  {
    id: 'deploy',
    title: "One-Click Deploy",
    description: "From JSON to a live URL in under 60 seconds.",
    icon: "Rocket"
  },
  {
    id: 'validate',
    title: "Strict Validator",
    description: "Ensures your API definition is LLM-ready before generation.",
    icon: "ShieldCheck"
  },
  {
    id: 'docs',
    title: "Auto Documentation",
    description: "Generates beautiful markdown docs for your new tools.",
    icon: "FileJson"
  },
  {
    id: 'monitor',
    title: "Real-time Dashboard",
    description: "Watch LLM interactions and tool calls live.",
    icon: "Activity"
  }
];

export const TECH_STACK = [
  "Python", "FastMCP", "Docker", "Cloud Run", "Jinja2", "TypeScript", "React", "Tailwind"
];
