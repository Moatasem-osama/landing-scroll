# One-time: authenticate GitHub in a browser or with a token:
#   & "$env:ProgramFiles\GitHub CLI\gh.exe" auth login
#
# Then run this script from repo root (adjust REPO_NAME if the GitHub repo name differs).
$ErrorActionPreference = "Stop"
$gh = Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"
if (-not (Test-Path $gh)) {
  Write-Error "GitHub CLI not found at $gh. Install from https://cli.github.com/"
}
Push-Location $PSScriptRoot\..
& $gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Log in to GitHub first:" -ForegroundColor Yellow
  & $gh auth login
}
$repoName = "landing-scroll"
& $gh repo create $repoName --public --source=. --remote=origin --push
Write-Host "Done. Enable Pages: GitHub repo → Settings → Pages → Source: GitHub Actions" -ForegroundColor Green
$user = & $gh api user --jq .login 2>$null
if ($user) {
  Write-Host "Live URL (after Pages enable): https://$user.github.io/$repoName/" -ForegroundColor Cyan
}
Pop-Location
