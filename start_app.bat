@echo off
echo Starting PS IT Support Portal...

:: Add Node.js and NPM to PATH temporarily (based on our previous discovery)
set "PATH=C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Microsoft\VisualStudio\NodeJs;C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Microsoft\VisualStudio\NodeJs\node_modules\npm\bin;%PATH%"

:: Navigate to project directory
cd /d "%~dp0"

:: Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

:: Run the development server
echo.
echo Application is running!
echo Access it at: http://localhost:5173
echo.
echo Press Ctrl+C to stop.
echo.

call npm run dev -- --host
pause
