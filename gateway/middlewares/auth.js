import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

// Middleware phân quyền cho Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};

// Middleware phân quyền cho Staff
export const isStaff = (req, res, next) => {
  if (req.user.role !== 'staff') return res.status(403).json({ error: 'Staff access required' });
  next();
};

// Middleware phân quyền cho Renter
export const isRenter = (req, res, next) => {
  if (req.user.role !== 'renter') return res.status(403).json({ error: 'Renter access required' });
  next();
};
