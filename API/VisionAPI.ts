import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const GOOGLE_CLOUD_VISION_API_KEY = '...';

export interface LabelAnnotation {
  description: string;
  score: number;
}

export const pickImage = async (): Promise<string | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    base64: true,
  });

  if (!result.canceled) {
    return result.assets[0].base64 || null;
  }
  return null;
};

export const analyzeImage = async (base64: string): Promise<LabelAnnotation[]> => {
  try {
    const body = {
      requests: [
        {
          image: { content: base64 },
          features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
        },
      ],
    };

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
      body,
      { headers: { 'Content-Type': 'application/json' } },
    );

    return response.data.responses[0].labelAnnotations || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
