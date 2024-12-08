// server/src/routes/auth-routes.ts

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare password with bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};