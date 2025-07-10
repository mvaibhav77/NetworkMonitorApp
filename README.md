# 📡 Network Monitor App

A lightweight and elegant mobile application built with **React Native (Expo)** to **monitor real-time network changes** such as connection type (WiFi, Cellular, None) and network type (2G, 3G, 4G, 5G). The app helps users stay informed about their connectivity with session tracking, change history, and local notifications.

---

## 🚀 Features

- ✅ Real-time monitoring of network connection and type
- 📊 Detailed **session statistics** (duration, changes detected)
- 🔔 Local notifications on network changes (with custom sound + vibration) 
   [note:- Sound and Vibration not working in new version of Expo SDK]
- 🕓 **Persistent history log** with timestamps
- 🌙 Dark/Light mode support
- ⚡ Simple, responsive UI built with Tailwind and Lucide icons

---

## 🧠 Tech Stack

- **React Native** via [Expo SDK 53](https://docs.expo.dev)
- **Expo Router** for navigation
- **AsyncStorage** for local persistence
- **Expo Notifications** for local alerts
- **Expo Network** + **Expo Cellular** for network data
- **TailwindCSS** for styling via NativeWind
- **Lucide Icons** for UI visuals

---

## 📷 Screenshots
<img width="200" height="700" alt="image" src="https://github.com/user-attachments/assets/4c611682-a672-4a60-90c4-b26d3da9f8d4" />
<img width="200" height="700" alt="image" src="https://github.com/user-attachments/assets/b997fa23-52b7-4529-acb4-9e046ff87dbc" />
<img width="200" height="700" alt="image" src="https://github.com/user-attachments/assets/e7cb143a-12ac-4f33-b6aa-61721788aa7b" />
<img width="200" height="700" alt="image" src="https://github.com/user-attachments/assets/018bbd9d-f4cb-4891-80d4-859a2203a8f1" />

---

## 🔐 Permissions Used

* `READ_PHONE_STATE`
* `POST_NOTIFICATIONS`

---

## 📱 Tested On

* ✅ Android 14 (Physical Device)
* ✅ Expo Go + Dev Build (via EAS)
* ❌ iOS (not tested yet)

---

## 🙋‍♂️ Author

**Vaibhav Shukla**
🌐 [LinkedIn](https://linkedin.com/in/mvaibhav77)
💻 [GitHub](https://github.com/mvaibhav77)

---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/mvaibhav77/NetworkMonitorApp.git
cd NetworkMonitorApp
````

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Start the development server

```bash
npx expo start
```

