import { Configuration, OpenAIApi } from "azure-openai"; 
const url="https://form-recognizer.openai.azure.com"
const deploymentName="gpt35turbo0301"
export const openAiApi = new OpenAIApi(
  new Configuration({
    
     // add azure info into configuration
     azure: {
        apiKey: process.env.REACT_APP_OPENAI_KEY || "My API key",
        endpoint: url,
        // deploymentName is optional, if you donot set it, you need to set it in the request parameter
        deploymentName: deploymentName,
     }
  }),
);