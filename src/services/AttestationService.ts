import axios, { AxiosInstance } from "axios";

interface AttestationMessage {
  message: string;
  attestation: string;
  eventNonce: string;
}

class AttestationService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://iris-api-sandbox.circle.com/v1/",
      headers: {
        accept: "application/json",
      },
    });
  }

  public async getMessages(
    transactionHash: string
  ): Promise<AttestationMessage> {
    try {
      const response = await this.client.get(`messages/4/${transactionHash}`);
      console.log(response);
      
      return response.data.messages[0];
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data.error;
      }
      return "An unexpected error occurred";
    }
  }
}

export default AttestationService;
