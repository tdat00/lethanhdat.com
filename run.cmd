@echo off
setlocal
cd /d "%~dp0"

rem GitHub Pages builds with Ruby 3.3 (https://pages.github.com/versions/)
if exist "C:\Ruby33-x64\bin\ruby.exe" set "PATH=C:\Ruby33-x64\bin;%PATH%"

ruby -e "exit RUBY_VERSION.start_with?('3.3.')" >nul 2>&1
if errorlevel 1 (
  echo Ruby 3.3.x is required to match GitHub Pages. Install it with:
  echo   winget install RubyInstallerTeam.RubyWithDevKit.3.3
  exit /b 1
)

rem Parallel gem downloads stall on some networks, so install sequentially
call bundle check >nul 2>&1 || call bundle install --jobs 1 || exit /b 1
call bundle exec jekyll serve --incremental --drafts %*
