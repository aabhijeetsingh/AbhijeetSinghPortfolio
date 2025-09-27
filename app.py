# app.py
import os
from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory
from datetime import datetime
from flask_mail import Mail, Message
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'a_very_secret_key_for_dev')

# Configure Flask-Mail for the contact form
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

portfolio_data = {
    "name": "Abhijeet Singh",
    "title_roles": ["MCA (AI/ML) Student", "Full-Stack Python Developer"],
    "location": "Maihar, Madhya Pradesh, India",
    "about_me": {
        "experience": "MCA (AI/ML) student passionate about building practical solutions with technology.",
        "description": "I am an MCA (AI/ML) student passionate about building practical solutions with technology. I have experience in Python, Data Analysis, and web development, demonstrated by my Cryptocurrency trading project and a successful internship. I am looking for an opportunity to contribute to a team and grow my technical skills while making meaningful contributions to innovative projects.",
        "interests": ["Python", "Data Analysis", "Web Development", "AI/ML", "Teamwork", "Problem Solving", "Technology", "Innovation"]
    },
    "education": [
        {
            "degree": "Master of Computer Applications (AI/ML)",
            "institute": "Amity University Online",
            "location": "",
            "duration": "2024-2025",
            "percentage": "CGPA: 7.96"
        },
        {
            "degree": "Bachelor of Computer Applications (Honours)",
            "institute": "AKS University, Satna",
            "location": "",
            "duration": "2021-2024",
            "percentage": "CGPA: 5.7"
        },
        {
            "degree": "Higher Secondary Education",
            "institute": "Gyan Vihar Vidyapeeth (CBSE)",
            "location": "",
            "duration": "2020-2021",
            "percentage": "Percentage: 49.8%"
        }
    ],
    "skills": {
        "Programming Languages": [
            {"name": "Python", "icon": "fa-brands fa-python", "duration": "4+ years", "method": "Self-taught, Academic"},
            {"name": "SQL", "icon": "fa-solid fa-database", "duration": "2 years", "method": "Academic"},
            {"name": "HTML/CSS", "icon": "fa-brands fa-html5", "duration": "3 years", "method": "Projects"},
            {"name": "JavaScript", "icon": "fa-brands fa-js", "duration": "2 years", "method": "Projects"}
        ],
        "Technologies & Tools": [
            {"name": "GitHub", "icon": "fa-brands fa-github", "duration": "2 years", "method": "Projects"},
            {"name": "AWS", "icon": "fa-brands fa-aws", "duration": "1 year", "method": "Internship, Certification"},
            {"name": "DevOps", "icon": "fa-solid fa-gears", "duration": "1 year", "method": "Internship"},
            {"name": "Linux", "icon": "fa-brands fa-linux", "duration": "2 years", "method": "Academic, Projects"},
            {"name": "Jupyter", "icon": "fa-solid fa-book", "duration": "2 years", "method": "Academic, Projects"}
        ],
        "AI/ML & Data Science": [
            {"name": "Pandas", "icon": "fa-solid fa-table", "duration": "2 years", "method": "Academic, Projects"},
            {"name": "NumPy", "icon": "fa-solid fa-square-root-variable", "duration": "2 years", "method": "Academic, Projects"},
            {"name": "Scikit-learn", "icon": "fa-solid fa-brain", "duration": "1 year", "method": "Academic, Projects"},
            {"name": "TensorFlow", "icon": "fa-brands fa-tensorflow", "duration": "1 year", "method": "Academic"}
        ]
    },
    "experience": [
        {
            "role": "Student Intern",
            "company": "Rostris Infotec Ltd.",
            "duration": "Jan 2024 - Mar 2024",
            "location": "Pune, India",
            "responsibilities": [
                "Developed hands-on projects utilizing Linux, Python, DevOps, and AWS Cloud Technology.",
                "Completed a student project using Python, which increased the team's project completion speed by 25%.",
                "Encouraged team members to work together, improving the group's problem-solving ability by 30%.",
                "Organized workshops on new technologies, which increased student participation by 40%."
            ]
        }
    ],
    "projects": [
        {
            "title": "Cryptofix-Trading",
            "technologies": "HTML, CSS, JavaScript",
            "description": "Developed a responsive website to display live Cryptocurrency prices by integrating a third-party REST API. Used JavaScript to fetch and dynamically display the live data from the API. Designed a clean and user-friendly interface using HTML and CSS for a smooth user experience.",
            "link": "#"
        }
    ],
    "certifications": [
        {
            "title": "AWS Cloud Practitioner & DevOps",
            "platform": "Rostris Infotech, Pune",
            "issuer": "",
            "date": "Jan–Mar 2024",
            "cert_id": "A-24-3918"
        },
        {
            "title": "Certificate Course in Basic Mathematics",
            "platform": "Amity University Online",
            "issuer": "",
            "date": "Dec 2024",
            "cert_id": "Zw5adTGWVH"
        }
    ],
    "social_media": [
        {"name": "Instagram", "icon": "fa-brands fa-instagram", "url": "https://instagram.com/abhijeett___"},
        {"name": "LinkedIn", "icon": "fa-brands fa-linkedin-in", "url": "https://linkedin.com/in/abhijeet-singh-a66b5a215"},
        {"name": "Email", "icon": "fa-solid fa-envelope", "url": "mailto:abhijeetsingh20010@gmail.com"},
        {"name": "GitHub", "icon": "fa-brands fa-github", "url": "https://github.com/aabhijeetsingh"},
        {"name": "WhatsApp", "icon": "fa-brands fa-whatsapp", "url": "https://wa.me/917999809954"}
    ],
    "contact_email": "abhijeetsingh20010@gmail.com",
    "contact_phone": "+91 7999809954",
    "video_resume_url": "https://www.youtube.com/embed/sN9HgBJ7BRk?si=huumb0bWLDSkf2O5"
}

@app.route('/')
def index():
    current_year = datetime.now().year
    return render_template('index.html', data=portfolio_data, current_year=current_year)

@app.route('/download_cv')
def download_cv():
    return send_from_directory('.', 'Abhijeet_Singh_CV.pdf', as_attachment=True)

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')

        if not all([name, email, message]):
            flash('Please fill in all required fields (Name, Email, Message).', 'error')
            return redirect(url_for('index', _anchor='contact'))

        try:
            msg = Message(
                subject=f"New Portfolio Contact from {name}",
                recipients=[portfolio_data['contact_email']],
                body=f"Name: {name}\nEmail: {email}\nPhone: {phone if phone else 'N/A'}\n\nMessage:\n{message}"
            )
            mail.send(msg)
            flash('Your message has been sent successfully!', 'success')
        except Exception as e:
            flash(f'Failed to send message. Error: {e}', 'error')
        return redirect(url_for('index', _anchor='contact'))

if __name__ == '__main__':
    app.run(debug=True)