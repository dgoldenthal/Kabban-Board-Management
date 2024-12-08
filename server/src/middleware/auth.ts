// server/src/middleware/auth.ts

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
    req.user = { username: decoded.username };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};