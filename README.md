# Parklio
A Car Parking Management System named Parklio

# Description
This is a small project, which is about implementing a simple car parking managing system. The system consists of a server and a client application. The server is responsible for managing the parking spots and the clients are responsible for the communication with the server and the user interface. I use MERN Stack for this project.

# Technology

- Backend and Database: Node.js, Express.js, MongoDB
- Frontend: React.js, Tailwind CSS

# Main features

This project is a simple car parking management system. The main features are:

- Registering a new user (officer by default). Admin account is created manually.
- Login
- Adding a new vehicle to the system
- Allow vehicler's owner to register additional services (e.g. car wash, oil change, etc.)
- Allow officer to check out a vehicle
- Allow officer and admin to check the history of a vehicle, check the check in/ check out status of the whole system, have a glance at the statistics, income daily/monthly/yearly of the system.
- Allow user (including admin and officer) to change their details, like password, email, name, etc.
- Allow only admin to adjust the prices of the services.

# How to run
I have deployed both frontend and backend on other platforms, frontend on Vercel and backend on Render. You can access the app via this link: <https://parklio-iamlvv.vercel.app/>

- Test Account (This account is for Admin - full access, but Officer cannot access the feature management):

      - Email: hi@gmail.com
      - Password: 1234
- Or you can register a new account, but it will be an Officer account, so you cannot access the feature management.

However, if you want to run the app **locally**, you can follow these steps:

1. Clone the repo
2. Run `npm install` in the root directory, and in the "frontend" directory.
3. I will provide you with the .env file for the backend, you can put it in the root directory, and .env file for the frontend, you can put it in the "frontend" directory.
4. Run `cd backend` and then `npm start` to start the backend server. Then the server will run on port 5000. After that, you move out of the backend directory.
5. Run `cd frontend` and then `npm start` to start the frontend server.
6. Now you can access the app via <http://localhost:3000/>

# How to use this app
This app has 4 main pages (excluding the login page and the register page):

- **Homepage:** this is where you can register a new vehicle, or check out a vehicle.
    - Register a new vehicle: you can register a new vehicle by filling in the form. The form will be validated before sending to the server. If there is any error, it will be displayed in the form. If there is no error, the vehicle will be registered successfully, and you will receive a parking key in a popup notification.
    - You have to fill in all of the fields in the registration form, except for the "Additional Services" field. You can choose to register additional services or not. If you choose to register additional services, especially the oil changing service, you have to choose the type of oil. If you do not choose the type of oil, the system will automatically choose the first type of oil for you.
    - The plate number must be in the correct format, like `12A1234` or `12A12345`. The letter must be in uppercase.
    - **The parking key will be used to check out the vehicle, so please keep it carefully.**
    - If you want to check out a vehicle, you have to fill in the plate number and the parking key. If the plate number and the parking key are correct, the vehicle will be checked out successfully. And it will show up some information about the vehicle, like the total time it has been parked, the total price, etc.
- **Statistics**: this is where you can see the statistics of the system, like the total income, the total number of vehicles, check in/check out status. You can also search for a vehicle by its plate number. Statistics about the income will be displayed in charts.
- **User Profile**: this is where you can change your details, like password, email, phone number, etc.
- **Management**: this is where you can manage some features of the system, like the prices of the services, the list of the officers (later), etc. This page is only accessible by Admin.

# Cautions

- When you register a new vehicle successfully, the system will response a parking key in a popup notification. Please keep it carefully, because you will need it to check out the vehicle. You can copy it and paste it somewhere else. In case you do not remember the plate number, you can go to the page Statistics, it will show you all the vehicles that are currently in the system, go find the vehicle which is marked as "Haven't checked out yet", and you will see the plate number of that vehicle. Because this is just a simple project, it does not have features like using camera to scan the plate number, so you have to do it manually, both check in and check out.
- The backend server is deployed on Render using free version, **so it might take a while to start the server if it is inactive for a long time**. According to Render, it will be inactive after 15 mins not using it. Please be patient, or you can contact me for any problems. The last time I checked, it took about **10 - 30 seconds** to start the server. After that, it will run smoothly.
- The app is not fully responsive yet, so it is better to use it on a laptop or a desktop, especially using the screen provided by the company.
- The app is not fully tested yet, so there might be some bugs. If you find any, please let me know.
- Because of the size of the project, the app is not fully secured yet, for example, I only use 1 type of token instead of two (refresh and access token), so please do not use your real password or any sensitive information. I will try to improve the security of the app in the future.

# Sum up

Based on what I have learnt about SOLID and OOP, I tried to apply it to this project. However, I am not sure if I did it correctly or not (I may fail the OOP part, but I have tried to keep the code clean and follow SOLID rules). I will be very grateful if you can give me some feedbacks about this. Thank you very much for your time and consideration.
