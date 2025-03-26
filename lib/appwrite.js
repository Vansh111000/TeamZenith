import { 
    Client,
    Account,
    ID, 
    Avatars ,
    Databases, 
    Query,
    } from "react-native-appwrite";
// import { Platform } from "react-native";

export const  appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.vsk.zenith",
  projectId: "67dfed930015cb006977",
  databaseId: "67dffc31003e03a00ad7",
  userCollectionId: "67dffc7600242ea69141",
  dataCollectionId: "67dffd04000940008a7e",
  storageId: "67e000b5003735103c4c",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async() => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const accounts = new Account(client);

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      // appwriteConfig.videoCollectionId,
      [Query.equal(userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}