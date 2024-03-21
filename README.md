# DOOR DASH DINE

Door Dash Dine is a full-stack food order and delivery app built with the MERN stack. It provides a comprehensive platform for users to order food from nearby restaurants, administrators to manage the system, and delivery boys to fulfill orders efficiently.

## Technologies used

- React
- Tanstack/react-query
- Express
- NodeJS
- MongoDB
- firebase
- socket io
- vontage
- leaflet
- haversine-distance
- Matrial ui
- TailWind css
- StyledComponents
- Mongoose
- HookForm
- Cloudinary
- react-hot-toast(notification)
- Axios
- React Router
- Multer
- Bcrypt
- JWT
- Cookie Parser
- recharts
- react-error-boundary
- etc..

# Features

## User Panel

### View Nearby Restaurants

- Users can view nearby restaurants based on their current location.
  -They can also change their location to find restaurants in different areas.

### View Nearby Restaurants

- Users can view nearby restaurants based on their current location.
  -They can also change their location to find restaurants in different areas.

### Place Orders

- Users can place orders with precise delivery location selection on a map, using Leaflet integration.
- Orders are only available within a 30km radius.

### Track Order Status

- Users can track the status of their orders in real-time.
- They can view estimated delivery times for their orders.

### Leave Reviews and Ratings

- After successful orders, users can leave reviews and ratings for restaurants.

### Check Order Bill

- Users can view their order bills before confirming their orders.

### Search Functionality

- Users can search for specific restaurants or dishes using a search feature.

## Admin Panel

### Dashboard Overview

- Analytics Dashboard: View visual representations of data through charts, graphs.

- Generate Reports: Generate reports on order, revenue, orderpending etc.

### Order Management

- Order Status: Track the status of orders in real-time.
- Order Details View detailed information about each order, including customer details, items ordered, and delivery status.

### Restaurant Management

- Add Restaurants: Add new restaurants to the system, including details such as name, location, menu, etc.

- Delete Restaurants: Remove restaurants that are no longer active or relevant.
- Update Restaurant Information: Modify restaurant details, menu items, operating hours, etc.

### Delivery Boy Management

- View Delivery Boys: See a list of registered delivery boys along with their details.
- Salary Management: Monitor delivery boy salaries, incentives, and payments.

## Delivery Boys Panel

### View Available Orders

- Order Listing: View a list of available orders within a specified distance.
- Order Details: Access detailed information about each order, including customer details, delivery location, and order items.

### Accept Orders and Confirm Delivery

- Accept Orders: Accept orders from the available list and mark them as assigned for delivery.
- Confirm Delivery: Confirm successful delivery of orders to update their status .

### Order Confirmation with OTP

- Send OTP: Send a one-time password (OTP) to users for order confirmation and verification.
- Verify OTP: Receive and verify OTP entered by users to confirm order delivery and completion.

### Navigation Assistance

- Real-Time Directions: Receive directions delivery location efficiently.

## ScrollPagination

- Infinite Scroll: The application implements infinite scrolling, where additional data is fetched automatically as the user scrolls towards the bottom of the page.

- useInfiniteQuery: This hook provided by the react-query library simplifies data fetching for infinite scroll. It handles the logic for fetching the next page of data when needed.

## Authenication

- Firebase Authentication: Users can sign in to the application using their mobile numbers and receive OTP for verification.
- Mobile OTP Verification: Firebase sends a one-time password (OTP) to the user's mobile number for verification during the sign-in process.
- Forget Password OTP Verification: Users can request a password reset, and Firebase sends an OTP to their registered email or mobile number for verification.

## Installation

- Clone the repository from GitHub.
- Install Node.js and MongoDB on your system if you haven't already.

```bash
  npm install

```
