@echo off
mkdir swing-trading-website
cd swing-trading-website

:: Create main HTML files
echo. > index.html
echo. > introduction.html
echo. > risk-management.html
echo. > trader-wisdom.html
echo. > building-system.html
echo. > favicon.ico
echo. > robots.txt

:: Create strategies directory and files
mkdir strategies
cd strategies
echo. > index.html
echo. > core-strategies.html
echo. > lesser-known-strategies.html
cd ..

:: Create technical directory and files
mkdir technical
cd technical
echo. > index.html
echo. > indicators.html
echo. > chart-patterns.html
cd ..

:: Create resources directory and placeholder for ebook
mkdir resources
echo. > resources\swing-trading-ebook.pdf

:: Create CSS directory and files
mkdir css
cd css
echo. > style.css
echo. > reset.css
echo. > typography.css
echo. > layout.css
echo. > navigation.css
echo. > forms.css
echo. > responsive.css
cd ..

:: Create JS directory and files
mkdir js
cd js
echo. > navigation.js
echo. > toc.js
echo. > email-signup.js
cd ..

:: Create images directory and subdirectories
mkdir images
mkdir images\logos
mkdir images\icons
mkdir images\charts
mkdir images\patterns

echo Swing Trading Website structure created successfully!
pause
