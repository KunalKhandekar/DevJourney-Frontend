# DevJourney

DevJourney is a full featured blogging platform where I share and publish my development journey and technical content. The project is built with a scalable MERN architecture and includes secure authentication, blog creation tools, interactions, and an admin system for managing platform data.

## Live URLs
**Frontend**  
https://devjourney.sahilkhandekar.dev/

**Backend API**  
https://api.devjourney.sahilkhandekar.dev/api/v1

## Screenshots  
<p align="center">
  <img src="https://github.com/user-attachments/assets/95fbd7e5-427b-4498-9666-354b07e8c7ad" alt="Home" width="45%" />
  <img src="https://github.com/user-attachments/assets/278c9bc2-f2d9-4f8f-9d35-30474029a528" alt="Blog" width="45%" />
  <img src="https://github.com/user-attachments/assets/33f8be6f-114f-4954-becf-322e872de10b" alt="Dashboard" width="45%" />
  <img src="https://github.com/user-attachments/assets/eba302a3-0e63-416d-a99a-678cc10d0d89" alt="Write a blog" width="45%" />
  <img src="https://github.com/user-attachments/assets/1fe8fe0b-8106-46ea-b0dd-43e8949fe7ba"  alt="Preview blog" width="45%" />

</p>


## Tech Stack

### Frontend
- React with Vite  
- TypeScript  
- TailwindCSS  
- Tiptap rich text editor  
- React Router  
- Cloudinary upload integration  
- Resend integration for notifications  
- Error Boundaries

### Backend
- Node.js 
- Express  
- MongoDB with Mongoose  
- Authentication with Access and Refresh tokens  
- Strong validation and sanitization  
- Winston and Logtail for structured logging  
- Cloudinary image upload  
- Resend for email services  
- REST API with versioning  
- Admin level user and blog operations  

## Features

- User registration and login with secure token handling  
- Refresh token rotation for seamless sessions  
- Blog creation with image upload to Cloudinary  
- Blog editing and deletion  
- Rich text editor powered by Tiptap  
- Like and unlike system for blogs  
- Commenting system
- Slug based blog retrieva
- Dashboard with statistics and recent activity
- Admin capabilities for managing users, blogs, comments, and related data  
- Subscription system with email notifications  
- Structured logging and monitoring  
- Error boundaries for frontend stability  

## Project Structure

This project uses two separate repositories for better maintainability.

### Frontend Repository
Contains all UI components, pages, dashboard, authentication handlers, blog CRUD pages, and integration logic.

### Backend Repository
Contains all API routes, controllers, models, middleware, authentication logic, validations, loggers, and upload handlers.

## API Overview

- Authentication  
- User management  
- Blog CRUD  
- Like and unlike endpoints  
- Comment management  
- Dashboard statistics retrieval  
- Subscription endpoints  

## Deployment

- Frontend deployed with CloudFront and S3  
- Backend deployed on a secure server with reverse proxy and SSL  
- Image hosting handled by Cloudinary  
- Email services powered by Resend  

## Contact

If you want to connect or collaborate, you can reach out through:  
**https://sahilkhandekar.dev**
