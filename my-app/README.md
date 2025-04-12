# 🖍️ Real-time Collaborative Whiteboard

A collaborative whiteboard web application that allows multiple users to draw in real-time, share rooms, and leave comments. This project is designed as a practical demonstration of Distributed Computing concepts such as message passing, synchronization, persistence, and the client-server model.

---

## ✨ Features

- 🖌️ **Real-time Drawing**  
  Multiple users can draw on the same whiteboard simultaneously with live updates.

- 📁 **Room-based Collaboration**  
  Users can create or join unique whiteboard rooms, each with its own drawing history.

- 💬 **Comment Section**  
  Users can leave comments within each room to communicate or provide feedback.

- 🔄 **Canvas Synchronization**  
  New users joining a room automatically receive the full whiteboard history in order.

- 💾 **Persistent Storage**  
  All drawing actions and comments are saved to a database for recovery and future reference.

- 🔒 **Session Isolation**  
  Separate drawing sessions for each room to ensure privacy and clarity.

- 🔁 **Real-time Sync on All Clients**  
  Whiteboard updates and comments are broadcast instantly to all connected users in the same room.

---