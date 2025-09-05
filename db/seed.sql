-- Seed data for profile API

-- Insert profile data
INSERT OR REPLACE INTO profile (name, email, bio, github_url, linkedin_url, portfolio_url) 
VALUES (
    'John Doe',
    'john.doe@example.com',
    'Full Stack Developer with expertise in JavaScript, Python, and cloud technologies. Passionate about building scalable applications and solving complex problems.',
    'https://github.com/johndoe',
    'https://linkedin.com/in/johndoe',
    'https://johndoe-portfolio.dev'
);

-- Insert skills data
INSERT OR REPLACE INTO skills (name, proficiency) VALUES 
('JavaScript', 'Expert'),
('Python', 'Advanced'),
('React', 'Expert'),
('Node.js', 'Expert'),
('TypeScript', 'Advanced'),
('SQL', 'Advanced'),
('MongoDB', 'Intermediate'),
('Docker', 'Intermediate'),
('AWS', 'Advanced'),
('GraphQL', 'Intermediate'),
('Express', 'Expert'),
('Git', 'Advanced'),
('CI/CD', 'Intermediate'),
('REST API', 'Expert'),
('CSS/SCSS', 'Advanced');

-- Insert education data
INSERT OR REPLACE INTO education (institution, degree, field_of_study, start_date, end_date, description) 
VALUES 
(
    'University of Technology',
    'Bachelor of Science',
    'Computer Science',
    '2016-09-01',
    '2020-05-30',
    'Graduated with honors. Specialized in Software Engineering and Artificial Intelligence.'
),
(
    'Tech Bootcamp',
    'Certificate',
    'Full Stack Web Development',
    '2020-07-01',
    '2020-12-15',
    'Intensive 6-month program focused on modern web technologies and best practices.'
);

-- Insert work experience data
INSERT OR REPLACE INTO work_experience (company_name, role, start_date, end_date, description) 
VALUES 
(
    'TechCorp Inc.',
    'Senior Software Engineer',
    '2022-03-01',
    NULL,
    'Lead developer for the company''s core product. Improved system performance by 40% and implemented CI/CD pipeline. Mentored junior developers.'
),
(
    'WebSolutions LLC',
    'Full Stack Developer',
    '2020-01-15',
    '2022-02-28',
    'Developed and maintained multiple client projects. Worked with React, Node.js, and MongoDB. Implemented REST APIs and authentication systems.'
);

-- Insert projects data
INSERT OR REPLACE INTO projects (title, description, repository_url, demo_url, image_url, start_date, end_date) 
VALUES 
(
    'E-commerce Platform',
    'A full-featured e-commerce platform with product catalog, shopping cart, payment processing, and admin dashboard.',
    'https://github.com/johndoe/ecommerce-platform',
    'https://ecommerce-demo.johndoe-portfolio.dev',
    'https://johndoe-portfolio.dev/images/ecommerce.png',
    '2021-06-01',
    '2021-10-15'
),
(
    'Task Management API',
    'RESTful API for managing tasks, projects, and teams. Features include authentication, authorization, and real-time notifications.',
    'https://github.com/johndoe/task-api',
    'https://task-api-demo.johndoe-portfolio.dev',
    'https://johndoe-portfolio.dev/images/task-api.png',
    '2022-01-10',
    '2022-04-20'
),
(
    'Weather Dashboard',
    'Interactive weather dashboard using OpenWeatherMap API. Shows current weather, forecasts, and historical data.',
    'https://github.com/johndoe/weather-dashboard',
    'https://weather.johndoe-portfolio.dev',
    'https://johndoe-portfolio.dev/images/weather.png',
    '2021-02-15',
    '2021-03-30'
),
(
    'Portfolio Website',
    'Personal portfolio website showcasing projects and skills. Built with React and deployed on Vercel.',
    'https://github.com/johndoe/portfolio',
    'https://johndoe-portfolio.dev',
    'https://johndoe-portfolio.dev/images/portfolio.png',
    '2020-11-01',
    '2020-12-25'
);

-- Link projects with skills
-- E-commerce Platform skills
INSERT OR REPLACE INTO project_skills (project_id, skill_id) VALUES 
(1, (SELECT id FROM skills WHERE name = 'JavaScript')),
(1, (SELECT id FROM skills WHERE name = 'React')),
(1, (SELECT id FROM skills WHERE name = 'Node.js')),
(1, (SELECT id FROM skills WHERE name = 'Express')),
(1, (SELECT id FROM skills WHERE name = 'MongoDB')),
(1, (SELECT id FROM skills WHERE name = 'REST API'));

-- Task Management API skills
INSERT OR REPLACE INTO project_skills (project_id, skill_id) VALUES 
(2, (SELECT id FROM skills WHERE name = 'Node.js')),
(2, (SELECT id FROM skills WHERE name = 'Express')),
(2, (SELECT id FROM skills WHERE name = 'TypeScript')),
(2, (SELECT id FROM skills WHERE name = 'SQL')),
(2, (SELECT id FROM skills WHERE name = 'REST API')),
(2, (SELECT id FROM skills WHERE name = 'Docker'));

-- Weather Dashboard skills
INSERT OR REPLACE INTO project_skills (project_id, skill_id) VALUES 
(3, (SELECT id FROM skills WHERE name = 'JavaScript')),
(3, (SELECT id FROM skills WHERE name = 'React')),
(3, (SELECT id FROM skills WHERE name = 'CSS/SCSS'));

-- Portfolio Website skills
INSERT OR REPLACE INTO project_skills (project_id, skill_id) VALUES 
(4, (SELECT id FROM skills WHERE name = 'JavaScript')),
(4, (SELECT id FROM skills WHERE name = 'React')),
(4, (SELECT id FROM skills WHERE name = 'CSS/SCSS')),
(4, (SELECT id FROM skills WHERE name = 'TypeScript'));
