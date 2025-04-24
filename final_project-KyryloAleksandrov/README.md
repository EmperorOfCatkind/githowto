Final project by Kyrylo Aleksandrov

This is the final project for QA Automation course.

Webpage being tested - https://new.fophelp.pro/ Due to some personal things I haven't got as much time as I wanted to work on it, but I've tried my best :)
I've focused primarily on incomes and expenses. You can see it in both UI and API tests - I primarily test whether new income or expense can be added.
Also, both API and UI tests check login process, with API doing it to grab a cookie header to utilize in the next tests.

For E2E UI testing I am using Playwright
For API testing I am using Mocha and Chai (with playwright browser to grab cookies)

To run API tests - npm run test:api
To run UI tests - npm run test:ui
To run API and UI together - npm run test:all

Mochawesome reports are generated automatically
To see Allure reports use:
npx allure generate allure-results - to generate
npx allure open allure-report - to open