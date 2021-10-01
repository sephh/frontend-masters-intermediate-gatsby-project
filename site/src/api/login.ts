import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  res.setHeader("Set-Cookie", "frontend-masters-auth=true; path=/;");
  res.json({ status: "ok" });
}