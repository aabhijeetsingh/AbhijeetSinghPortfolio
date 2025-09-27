import os
import shutil
from datetime import datetime
from app import app, portfolio_data
from flask import render_template

# Create a directory for the static site
if os.path.exists('deploy'):
    shutil.rmtree('deploy')
os.makedirs('deploy')

# Render the main page
with app.test_request_context():
    # The url_for calls in the template need a request context to work
    # even if we are not in a request.
    current_year = datetime.now().year
    rendered_html = render_template('index.html', data=portfolio_data, current_year=current_year)

# Write the rendered HTML to the deploy directory
with open('deploy/index.html', 'w', encoding='utf-8') as f:
    f.write(rendered_html)

# Copy static assets to the deploy directory
static_assets = ['style.css', 'script.js', 'profile.jpg', 'Abhijeet_Singh_CV.pdf']
for asset in static_assets:
    if os.path.exists(asset):
        shutil.copy(asset, 'deploy')

print("Static site generated in 'deploy' directory.")
print("You can now upload the contents of the 'deploy' directory to your GitHub Pages repository.")
