import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

export enum PathNameFirebase {
  Product = "products",
  CategoryBanner = "categories/banner",
  CategoryLogo = "categories/logo",
  AboutImage = "about/images",
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function uploadFirebase(pathName: string, images: string[]) {
  try {
    return Promise.all(
      images.map((image, index) => {
        const storageRef = ref(storage, `${pathName}/image_${index}`);

        return uploadString(storageRef, image, "data_url", {
          contentType: "image/jpg",
        }).then(() => {
          return getDownloadURL(storageRef);
        });
      }),
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function reUploadFirebase(pathName: string, images: string[]) {
  try {
    return Promise.all(
      images.map((image, index) => {
        if (image.startsWith("https")) return image;

        const storageRef = ref(storage, `${pathName}/image_${index}`);

        return uploadString(storageRef, image, "data_url", {
          contentType: "image/jpg",
        }).then(() => {
          return getDownloadURL(storageRef);
        });
      }),
    );
  } catch (error) {
    return Promise.reject(error);
  }
}
