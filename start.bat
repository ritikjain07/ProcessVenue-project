@echo off
echo Starting Profile API Playground...

echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b %ERRORLEVEL%
)

echo Installing frontend dependencies...
cd ../frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b %ERRORLEVEL%
)

echo Starting backend server...
start cmd /k "cd ../backend && npm run dev"

echo Starting frontend server...
start cmd /k "cd . && npm run dev"

echo.
echo Profile API Playground is now running!
echo Backend API: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
