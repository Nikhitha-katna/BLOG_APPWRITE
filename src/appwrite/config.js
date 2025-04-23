import { Client, Databases, Storage, ID, Query, Account } from "appwrite";
import conf from '../conf/conf';

export class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  // Authentication Methods
  async createSession(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) {
        console.warn("No user session — user is not logged in");
        return null;
      }
      throw error;
    }
  }

  async deleteSession() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  }

  // Post Methods
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const documentId = ID.unique();
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
    } catch (error) {
      console.log("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error deleting post:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error getting post:", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error listing posts:", error);
      return false;
    }
  }

  // File Methods
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error uploading file:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error deleting file:", error);
      return false;
    }
  }

  getFileView(fileId) {
    try {
        return this.bucket.getFileView(conf.appwriteBucketId, fileId).toString();
    } catch (error) {
        console.error("Error fetching file view:", error);
        return null;
    }
}



}

const service = new Service();
export default service;
