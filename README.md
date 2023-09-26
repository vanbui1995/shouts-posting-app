# "Shouts" Posting Application

A very simple app is written by MeteorJS + React + Tailwind to prove that MeteorJS is still working with the newest frontend techs and simple to build a real-time application

Demo link: https://chat-app-2023-vanbui.au.meteorapp.com

### How to run it locally

1. Make sure you are on NodeJS version 14 (recommended by MeteorJS)
2. Install meteor
    ```
    npm install meteor -g
    ```
3. Install dependencies & start locally
    ```
        meteor npm install
        meteor
    ```
4. Run unit test
    ```
        meteor npm run test
    ```
### Feature
- Loggin, Loggout, Register Account
- Add/Edit/Delete shoute

### Seeding User account
- I prepared 3 accounts in the database seeding, you can use existing accounts or create new one:
    - user1/123456
    - user2/123456
    - user3/123456

### Folder structure
    .
    src
    ├── ...
    └── server/main.tsx           # Backend entry point file (Root)
    └── server/tests/*            # Unit test files
    ├── imports                   # Contain all main pages, the root component of each page
    │   ├── ui/*                  # All frontend source code
    │   ├── api/collections/*     # Define all collection schema
    │   ├── api/methods/*         # Define all Meteor methodss (APIs)
    │   └── api/publications/*    # Define all Meteor publications (backend realtime)
    └── tailwind.config.cjs       # Tailwind config, I configured all colors/spacing of the guideline via this file
    

