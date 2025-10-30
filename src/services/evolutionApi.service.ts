import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import logger from '../utils/logger';

class EvolutionApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.evolutionApi.url,
      timeout: config.evolutionApi.timeout,
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.evolutionApi.apiKey,
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        logger.debug('Evolution API Request', {
          method: config.method,
          url: config.url,
          data: config.data,
        });
        return config;
      },
      (error) => {
        logger.error('Evolution API Request Error', { error: error.message });
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug('Evolution API Response', {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error) => {
        logger.error('Evolution API Response Error', {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  // Instance Management
  async listInstances(): Promise<any> {
    const response = await this.client.get('/instance/fetchInstances');
    return response.data;
  }

  async createInstance(data: any): Promise<any> {
    const response = await this.client.post('/instance/create', data);
    return response.data;
  }

  async getInstanceDetails(instanceName: string): Promise<any> {
    const response = await this.client.get(`/instance/connectionState/${instanceName}`);
    return response.data;
  }

  async deleteInstance(instanceName: string): Promise<any> {
    const response = await this.client.delete(`/instance/delete/${instanceName}`);
    return response.data;
  }

  async getInstanceStatus(instanceName: string): Promise<any> {
    const response = await this.client.get(`/instance/connectionState/${instanceName}`);
    return response.data;
  }

  async connectInstance(instanceName: string): Promise<any> {
    const response = await this.client.get(`/instance/connect/${instanceName}`);
    return response.data;
  }

  async disconnectInstance(instanceName: string): Promise<any> {
    const response = await this.client.delete(`/instance/logout/${instanceName}`);
    return response.data;
  }

  // Message Operations
  async sendTextMessage(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/message/sendText/${instanceName}`, data);
    return response.data;
  }

  async sendMediaMessage(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/message/sendMedia/${instanceName}`, data);
    return response.data;
  }

  async listMessages(instanceName: string, chatId: string): Promise<any> {
    const response = await this.client.get(`/chat/findMessages/${instanceName}`, {
      params: { chatId },
    });
    return response.data;
  }

  async sendListMessage(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/message/sendList/${instanceName}`, data);
    return response.data;
  }

  async sendButtonMessage(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/message/sendButtons/${instanceName}`, data);
    return response.data;
  }

  // Contact Management
  async listContacts(instanceName: string): Promise<any> {
    const response = await this.client.get(`/chat/findContacts/${instanceName}`);
    return response.data;
  }

  async getContactDetails(instanceName: string, contactId: string): Promise<any> {
    const response = await this.client.get(`/chat/findContacts/${instanceName}`, {
      params: { contactId },
    });
    return response.data;
  }

  async checkNumberOnWhatsApp(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/chat/whatsappNumbers/${instanceName}`, data);
    return response.data;
  }

  // Group Management
  async listGroups(instanceName: string): Promise<any> {
    const response = await this.client.get(`/group/fetchAllGroups/${instanceName}`);
    return response.data;
  }

  async getGroupDetails(instanceName: string, groupId: string): Promise<any> {
    const response = await this.client.get(`/group/findGroupInfos/${instanceName}`, {
      params: { groupJid: groupId },
    });
    return response.data;
  }

  async createGroup(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/group/create/${instanceName}`, data);
    return response.data;
  }

  async updateGroupParticipants(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/group/updateParticipant/${instanceName}`, data);
    return response.data;
  }

  // Webhook Management
  async getWebhook(instanceName: string): Promise<any> {
    const response = await this.client.get(`/webhook/find/${instanceName}`);
    return response.data;
  }

  async setWebhook(instanceName: string, data: any): Promise<any> {
    const response = await this.client.post(`/webhook/set/${instanceName}`, data);
    return response.data;
  }

  async deleteWebhook(instanceName: string): Promise<any> {
    const response = await this.client.delete(`/webhook/delete/${instanceName}`);
    return response.data;
  }

  // Chat Operations
  async listChats(instanceName: string): Promise<any> {
    const response = await this.client.get(`/chat/findChats/${instanceName}`);
    return response.data;
  }

  async getChatDetails(instanceName: string, chatId: string): Promise<any> {
    const response = await this.client.get(`/chat/findChats/${instanceName}`, {
      params: { chatId },
    });
    return response.data;
  }

  async deleteChat(instanceName: string, chatId: string): Promise<any> {
    const response = await this.client.delete(`/chat/deleteMessageForEveryone/${instanceName}`, {
      data: { chatId },
    });
    return response.data;
  }
}

export default new EvolutionApiService();
