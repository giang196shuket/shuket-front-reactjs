//src/constants.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
    apiKey: "AIzaSyBsthkBRC4xZl5l597Rye9xAVeZ8O4ca6k",
    authDomain: "push-notication-4c9af.firebaseapp.com",
    projectId: "push-notication-4c9af",
    storageBucket: "push-notication-4c9af.appspot.com",
    messagingSenderId: "35136074832",
    appId: "1:35136074832:web:49db74c51adccb03244d55"
  };
initializeApp(firebaseConfig);

export const  messaging  =  getMessaging();

// tự động đăng ký token
export const getMessagingToken  = () => {
  return getToken(messaging, { vapidKey: 'BMDqLvrThIPnXbEeY7CgEdccUektOqPLkNJ39yX-p2qiOak9Upcmy2vomDkeN0QlZuT2qDWHM6fiywFXZQWxMF8' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

    // Khóa máy chủ công cộng được cung cấp cho các dịch vụ đẩy.
    //  Khóa này được sử dụng để xác thực những người đăng ký đẩy để chỉ nhận tin nhắn đẩy từ các máy chủ gửi có khóa riêng tương ứng. 
    //  Nếu nó không được cung cấp, khóa VAPID mặc định sẽ được sử dụng.
    //   Lưu ý rằng một số dịch vụ đẩy (Dịch vụ đẩy của Chrome) yêu cầu khóa VAPID không mặc định. 
    //   Do đó, bạn nên tạo và nhập khóa VAPID cho dự án của mình bằng Định cấu hình thông tin xác thực web bằng FCM. 
    //   Xem Giao thức đẩy web để biết chi tiết về các dịch vụ đẩy web.
};


 