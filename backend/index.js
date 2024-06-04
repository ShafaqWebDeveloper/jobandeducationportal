
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const port = 8001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const upload = multer({ dest: './uploads/' });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'maritime-portal'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const JWT_SECRET = 'your_jwt_secret_key';

function generateToken(user) {
    const token = jwt.sign({ email: user.uemail, role: user.urole }, JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    return token;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); 

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
      console.log('No token provided');
      return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              console.log('Token expired:', err.expiredAt);
              return res.status(403).json({ message: 'Token expired. Please log in again.' });
          }
          console.log('Token verification failed:', err);
          return res.sendStatus(403); 
      }

      
      req.user = user;
      next();
  });
}
app.get('/profile', authenticateToken, (req, res) => {
  console.log('Decoded user from token:', req.user);
  const { email, role } = req.user;
  const userProfile = {
      email: email,
      role: role
  };
  console.log('User profile to send:', userProfile);
  res.json(userProfile);
});



app.post('/', (req, res) => {
    const { uemail, upassword, urole } = req.body;
    if (!uemail || !upassword || !urole) {
        return res.status(400).send('Email, password, and role are required');
    }

    const query = 'SELECT * FROM users WHERE uemail = ?';
    db.query(query, [uemail], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Server error');
        }
        const user = results[0];
        const isMatch = bcrypt.compareSync(upassword, user.upassword);

        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        const token = generateToken(user);

        res.json({ token });
    });
});

app.post('/register', (req, res) => {
    const { uname, uemail, upassword, urole } = req.body;
    if (!uname || !uemail || !upassword || !urole) {
        return res.status(400).send('All fields are required');
    }

    const hashedPassword = bcrypt.hashSync(upassword, 10);

    const query = 'INSERT INTO users (uname, uemail, upassword, urole) VALUES (?, ?, ?, ?)';
    db.query(query, [uname, uemail, hashedPassword, urole], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered successfully');
    });
});

app.post('/post-job', authenticateToken, (req, res) => {
  const { jtitle, jdes, jcompany, jlocation } = req.body;
  const { role } = req.user;

  if (role !== 'Administrator') {
    return res.status(403).send('Only Admin can post job');
  }

  if (!jtitle || !jdes || !jcompany || !jlocation) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO jobs (jtitle, jdes, jcompany, jlocation) VALUES (?, ?, ?, ?)';
   db.query(query, [jtitle, jdes, jcompany, jlocation], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }
    
    res.status(201).send('Job inserted successfully');
  });
});

app.get('/jobs', (req, res) => {
    const query = `SELECT * FROM jobs`;
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    
      res.json(results);
    });
  });
app.get('/search-jobs', (req, res) => {
    const searchTerm = req.query.search || '';
    
    const query = `
      SELECT * FROM jobs
      WHERE jtitle LIKE ? OR jcompany LIKE ? OR jlocation LIKE ? OR jdes LIKE ?
    `;
    const searchValue = `%${searchTerm}%`;
    db.query(query, [searchValue, searchValue, searchValue, searchValue], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
 
      res.json(results);
    });
  });

  app.post('/jobapply', upload.single('resume'), (req, res) => {
    const { name, email, jobId } = req.body;
    const resume = req.file.path;
  
    const query = 'INSERT INTO jobapp (name, email, resume, jobId) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, resume, jobId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
      res.status(200).send('Application submitted successfully');
  
    
    });
  });
  app.get('/notify', (req, res) => {
    const query = 'SELECT name, email, jobId FROM jobapp ORDER BY id DESC LIMIT 1'; // Assuming you have an `id` column to order by
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        
        res.json(results);
        
    });
});
  app.get('/search-course', (req, res) => {
    const searchTerm = req.query.search || '';
    const query = `
      SELECT * FROM course
      WHERE cname LIKE ? OR cdes LIKE ? OR cduration LIKE ? OR cfee LIKE ?
    `;
    const searchValue = `%${searchTerm}%`;
  
    db.query(query, [searchValue, searchValue, searchValue, searchValue], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);

    });
  });
  

  app.post('/courseapply', (req, res) => {
    const { aname, aemail, apass, aphone, aaddress, acourseid } = req.body;

    const query = 'INSERT INTO courseapply (aname, aemail, apass, aphone, aaddress, acourseid) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [aname, aemail, apass, aphone, aaddress, acourseid], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Server error', details: err.message });
      }
      res.status(200).send('Application submitted successfully');
    });
});

app.post('/addprogress', (req, res) => {
const { pcname, completedunit , totalunit} = req.body;

const query = 'INSERT INTO progress (pcname, completedunit, totalunit) VALUES (?,?,?)';
db.query( query , [pcname, completedunit, totalunit], (err , result) => {

  if(err){
    console.error('Database query error:', err);
        return res.status(500).json({ error: 'Server error', details: err.message });
  }
  res.status(200).send('Application submitted successfully');
});
});

app.get('/progress', (req, res) => {
  let sql = 'SELECT * FROM progress';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/logout', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
