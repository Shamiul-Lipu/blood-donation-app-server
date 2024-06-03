# Blood Donation Server Application

This application is a TypeScript-based CRUD (Create, Read, Update, Delete) application using Express, PostgreSQL and Prisma.

#### Hosted on Vercel

[https://blood-donation-app-server-kappa.vercel.app/]

### Prerequisites

Before running the application, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- PostgreSQL installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

1. Clone or download the repository from [https://github.com/Shamiul-Lipu/blood-donation-app-server].

-This git repo is private now.

`Clone a Repository:`
This command clones a repository from GitHub to your local machine.

```bash
   git clone https://github.com/Shamiul-Lipu/blood-donation-app-server
```

2. Navigate to the project directory in your terminal.

```bash
   cd blood-donation-app-server
```

3. Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`PORT`,`BCRYPT_SALT_ROUND`,`JWT_ACCESS_SECRET`,`JWT_ACCESS_EXPIRES_IN`,`JWT_REFRESH_TOKEN_SECRET`,`JWT_REFRESH_TOKEN_EXPIRES_IN`,`DATABASE_URL`

`URI:` Specifies the connection URI for your application.

Make sure to set other necessary environment variables required for your application to function properly.

Example .env file:

```bash
DATABASE_URL=postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample

# This example uses Prisma; you can replace it with your local PostgreSQL database or other online databases like Supabase or Railways.
```

### Running the Application

```bash
## Scripts
 `build`: Compiles TypeScript files.

 `prod`: Runs the production server.

 `dev`: Starts the development server with hot reloading.

 `test`: Placeholder for running tests.
```

#### Development Mode

Start Development Server:
To run the application in development mode (with live reload):

```bash
   npm run dev
```

> The development server will start at http://localhost:5000 or the server port your local machine.

#### Production Mode

`Build for Production:`

To build the application for production:

```bash
    npm run build
```

`Start Production Server:`

To run the application in production mode:

```bash
    npm run prod
```

#### Additional Information

**For linting:**

```bash
    npm run lint
```

#### Troubleshooting and FAQs

##### Troubleshooting

If you encounter any issues while running the application, try the following steps:

1. Make sure `SERVER and DATABASE is running`.
2. Check if all dependencies are installed by running `npm install`.

#### My Server is Hosted on Vercel

You can also access the API from the following link:
[https://blood-donation-app-server-kappa.vercel.app/]

##### API Documentation

The API endpoints and their usages are documented below:

|                                                | Authorization                | Method | Route                                         |
| :--------------------------------------------- | :--------------------------- | :----- | :-------------------------------------------- |
| User Registration                              |                              | POST   | `/auth/register`                              |
| User Login                                     |                              | POST   | `/auth/login`                                 |
| Change Password                                | `Authorization: <JWT_TOKEN>` | POST   | `/auth/change-passwor`                        |
| Refresh Token                                  |                              | POST   | `/auth/refresh-token`                         |
| User Profile                                   | `Authorization: <JWT_TOKEN>` | GET    | `/user/my-profile`                            |
| User Profile Update                            | `Authorization: <JWT_TOKEN>` | PUT    | `/user/my-profile`                            |
| Get Donor List Search and Filter               |                              | GET    | `/blood-donation/donor-list`                  |
| Get Donor Details                              | `Authorization: <JWT_TOKEN>` | GET    | `/blood-donation/donor-details/:id`           |
| Request A Donor (user) For Blood               | `Authorization: <JWT_TOKEN>` | POST   | `/blood-donation/donation-request`            |
| Get My Donation Request as Donor and Requested | `Authorization: <JWT_TOKEN>` | GET    | `/blood-donation/donation-request`            |
| Update Request Application Status              | `Authorization: <JWT_TOKEN>` | PUT    | `/blood-donation/donation-request/:requestId` |
| Get User List                                  | `Authorization: <JWT_TOKEN>` | GET    | `/admin/user-management`                      |
| Update User (user managements)                 | `Authorization: <JWT_TOKEN>` | PUT    | `/admin/user-management`                      |
