Blog - Dat Le
===

1. Prerequisites
   * Ruby 3.3 with DevKit (the version GitHub Pages uses): `winget install RubyInstallerTeam.RubyWithDevKit.3.3`
   * Node.js (only for rebuilding tags, categories and dates)

2. How to run.
   ```
   > run.cmd
   ```
   Extra arguments are passed to `jekyll serve`, e.g. `run.cmd --port 4001`.

3. Rebuild tags, categories and dates:
   ```
   > node build-pages.mjs [--drafts]
   ```

4. Deploy to GitHub Pages:
   * commit all files in **/tag**, **/category** and **/date** folders.

5. Upgrade GitHub Pages gems: `bundle update github-pages`
