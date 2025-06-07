export const loginCallback = (req, res) => {
  // After successful login, redirect user to frontend
  res.redirect('http://localhost:5173');
};

export const getUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  // Don't send password to frontend
  const { password, ...safeUser } = req.user.toObject();
  res.json(safeUser);
};

export const logoutUser = (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
};
