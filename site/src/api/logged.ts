import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const loggedIn = Boolean(req.cookies && req.cookies["frontend-masters-auth"]);

  res.json({
    loggedIn,
  });
}